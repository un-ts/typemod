import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  collectCoverage: true,
  moduleNameMapper: {
    '^typemod/(.*)': '<rootDir>/src/$1',
  },
}

export default config
