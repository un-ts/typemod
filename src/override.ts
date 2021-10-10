import fs from 'fs'

import type { TsResolverOptions } from 'eslint-import-resolver-typescript'
import { resolve } from 'eslint-import-resolver-typescript'
import type { ClassDeclaration, Collection, File, Transform } from 'jscodeshift'

const transform: Transform = (
  fileInfo,
  { j, report },
  options: TsResolverOptions | null = null,
  // eslint-disable-next-line sonarjs/cognitive-complexity
) => {
  const { ClassDeclaration, ClassProperty, ClassMethod, ImportDeclaration } = j

  const root = j(fileInfo.source) as Collection<File>

  const imports = root.find(ImportDeclaration)
  const classes = root.find(ClassDeclaration)

  const superClasses = classes.filter(path => !path.node.superClass)
  const subClasses = classes.filter(path => !!path.node.superClass)

  for (const path of subClasses.paths()) {
    const superClass = path.node.superClass!
    if (
      !(path.scope as { isGlobal: boolean }).isGlobal ||
      superClass.type !== 'Identifier'
    ) {
      report(`unsupported class node: ${String(superClass)}`)
      continue
    }

    const superCls = superClass.name

    let superClassNodes = superClasses
      .filter(path => path.node.id!.name === superCls)
      .nodes()

    if (superClassNodes.length === 0) {
      // it could be imported
      const matched = imports
        .nodes()
        .find(node =>
          node.specifiers?.some(
            specifier => specifier.local?.name === superCls,
          ),
        )

      if (matched) {
        const resolved = resolve(
          matched.source.value as string,
          fileInfo.path,
          options,
        )
        if (!resolved.found) {
          report(`unable to resolve super class: ${superCls}`)
          continue
        }

        if (!resolved.path) {
          report('Node core modules are not supported')
          continue
        }

        const superRoot = j(
          fs.readFileSync(resolved.path, 'utf8'),
        ) as Collection<File>

        superClassNodes = superRoot
          .find(ClassDeclaration)
          .filter(path => !path.node.superClass)
          .filter(path => path.node.id!.name === superCls)
          .nodes()
      }

      if (superClassNodes.length === 0) {
        report(`super class not found: ${superCls}`)
        continue
      }
    }

    if (superClassNodes.length > 1) {
      report(`ambiguous super class: ${superCls}`)
      continue
    }

    const superClassBody = superClassNodes[0].body.body

    const subCollection = j(path) as Collection<ClassDeclaration>

    const subPaths = [
      ...subCollection.find(ClassProperty).paths(),
      ...subCollection.find(ClassMethod).paths(),
    ]

    for (const subPath of subPaths) {
      const { key } = subPath.node

      if (key.type !== 'Identifier') {
        continue
      }

      const hasSuperKey = superClassBody.some(
        node =>
          (node.type === 'ClassProperty' || node.type === 'ClassMethod') &&
          node.key.type === 'Identifier' &&
          node.key.name === key.name,
      )

      if (
        !hasSuperKey ||
        'override' in subPath.node ||
        key.name.startsWith('override ')
      ) {
        continue
      }

      Object.assign(key, {
        name: 'override ' + key.name,
        override: true,
      })
    }
  }

  return root.toSource()
}

export const parser = 'ts'

export default transform
