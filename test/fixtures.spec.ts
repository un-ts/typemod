import fs from 'fs'
import path from 'path'

import type { Transform } from 'jscodeshift'
import jscodeshift from 'jscodeshift'

describe('fixtures', () => {
  const fixturesPath = path.resolve(__dirname, 'fixtures')

  for (const fixturePath of fs.readdirSync(fixturesPath)) {
    if (fixturePath.startsWith('_')) {
      continue
    }

    const fixture = fixturePath.replace(/\.ts$/, '')
    it(`${fixture} should just work`, async () => {
      const { default: transform, parser } = (await import(
        `typemod/${fixture}`
      )) as {
        default: Transform
        parser: 'ts' | 'tsx'
      }

      if (!['ts', 'tsx'].includes(parser)) {
        throw new Error(`${fixture} must have a ts or tsx parser`)
      }

      const j = jscodeshift.withParser(parser)

      const filePath = path.resolve(fixturesPath, fixturePath)

      expect(
        transform(
          {
            path: filePath,
            source: await fs.promises.readFile(filePath, 'utf8'),
          },
          {
            j,
            jscodeshift: j,
            stats: console.log,
            report: console.log,
          },
          {},
        ),
      ).toMatchSnapshot()
    })
  }
})
