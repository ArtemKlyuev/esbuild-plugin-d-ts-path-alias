# esbuild-plugin-d-ts-path-alias

ESBuild plugin for compiling typescript declarations along with path aliases transformation.

## Table of contents

- [Problem](#problem)
- [Config](#config)
  - [tsconfigPath](#tsconfigpath)
  - [outputPath](#outputpath)
  - [debug](#debug)
- [Usage](#usage)

## Problem

When you write code and use path aliases, paths are not transformed when you compile declaration files.

```ts
// source file index.ts

import { foo } from '@utils/foo';
import type { Foo } from '@utils/foo';
```

```ts
// compiled declaration file index.d.ts

import type { Foo } from '@utils/foo';
```

This plugin will help you solve this problem when you compile declaration files the paths are converted to relative.

## Config

The plugin can optionally accept a config.

### tsconfigPath

Custom path to `tsconfig.json`. If specified, it will be used as the highest priority path to `tsconfig`.

| Type     | Required | Default |
| -------- | -------- | ------- |
| `string` | no       | —       |

### outputPath

Custom path to output declaration files. If specified, it will be used as the highest priority path to compiled files, specifying this argument ignores `declarationDir` and `outDir` in `tsconfig.json`.

| Type     | Required | Default |
| -------- | -------- | ------- |
| `string` | no       | —       |

### debug

Should plugin output debug logs.

| Type      | Required | Default |
| --------- | -------- | ------- |
| `boolean` | no       | `false` |

## Usage

You can manipulate the location of the output files by setting one of the following settings (in order of priority):

1. [`outputPath`](#outputpath) in plugin config
2. `declarationDir` in `tsconfig.json`
3. `outDir` in `tsconfig.json`
4. if none of these options are specified, then the `outdir` or `outfile` property from the `esbuild` config will be used

Default usage

```ts
import { build } from 'esbuild';
import { dTSPathAliasPlugin } from 'esbuild-plugin-d-ts-path-alias';

build({
  bundle: true,
  target: 'es2019',
  format: 'esm',
  entryPoints: ['./src/index.ts'],
  outfile: './build/out.js',
  plugins: [dTSPathAliasPlugin()],
});
```

With config

```ts
import { build } from 'esbuild';
import { dTSPathAliasPlugin } from 'esbuild-plugin-d-ts-path-alias';

build({
  bundle: true,
  target: 'es2019',
  format: 'esm',
  entryPoints: ['./src/index.ts'],
  outfile: './build/out.js',
  plugins: [
    dTSPathAliasPlugin({
      tsconfigPath: './config/tsconfig.esbuild.json',
      outputPath: './build/declaration',
      debug: true,
    }),
  ],
});
```
