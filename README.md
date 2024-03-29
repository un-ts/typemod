# typemod

[![GitHub Actions](https://github.com/rx-ts/typemod/workflows/CI/badge.svg)](https://github.com/rx-ts/typemod/actions/workflows/ci.yml)
[![Codecov](https://img.shields.io/codecov/c/github/rx-ts/typemod.svg)](https://codecov.io/gh/rx-ts/typemod)
[![Codacy Grade](https://img.shields.io/codacy/grade/27907e42d2e743c6a45317166d534110)](https://www.codacy.com/gh/rx-ts/typemod)
[![type-coverage](https://img.shields.io/badge/dynamic/json.svg?label=type-coverage&prefix=%E2%89%A5&suffix=%&query=$.typeCoverage.atLeast&uri=https%3A%2F%2Fraw.githubusercontent.com%2Frx-ts%2Ftypemod%2Fmain%2Fpackage.json)](https://github.com/plantain-00/type-coverage)
[![npm](https://img.shields.io/npm/v/typemod.svg)](https://www.npmjs.com/package/typemod)
[![GitHub Release](https://img.shields.io/github/release/rx-ts/typemod)](https://github.com/rx-ts/typemod/releases)

[![David Peer](https://img.shields.io/david/peer/rx-ts/typemod.svg)](https://david-dm.org/rx-ts/typemod?type=peer)
[![David](https://img.shields.io/david/rx-ts/typemod.svg)](https://david-dm.org/rx-ts/typemod)
[![David Dev](https://img.shields.io/david/dev/rx-ts/typemod.svg)](https://david-dm.org/rx-ts/typemod?type=dev)

[![Conventional Commits](https://img.shields.io/badge/conventional%20commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Code Style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![changesets](https://img.shields.io/badge/maintained%20with-changesets-176de3.svg)](https://github.com/atlassian/changesets)

A simple library boilerplate.

## TOC <!-- omit in toc -->

- [Usage](#usage)
  - [Peer](#peer)
  - [Install](#install)
  - [CLI](#cli)
- [Changelog](#changelog)
- [License](#license)

## Usage

### Peer

You need to install [`jscodeshift`](https://github.com/facebook/jscodeshift) first.

### Install

```sh
# npm
npm i -D typemod

# pnpm
pnpm add -D typemod

# yarn
yarn add -D typemod
```

### CLI

```sh
jscodeshift -t node_modules/typemod/lib/override.js src
```

## Changelog

Detailed changes for each release are documented in [CHANGELOG.md](./CHANGELOG.md).

## License

[MIT][] © [JounQin][]@[1stG.me][]

[1stg.me]: https://www.1stg.me
[jounqin]: https://GitHub.com/JounQin
[mit]: http://opensource.org/licenses/MIT
