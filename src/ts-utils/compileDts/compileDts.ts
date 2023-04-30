import ts from 'typescript';
import tsTransformPaths from 'typescript-transform-paths';

import { removeNonTsImports } from '../removeNonTsImports';

// FIXME: workaround for compatible imports in esbuild and jest
const getTransform = () => {
  if (typeof tsTransformPaths === 'function') {
    return tsTransformPaths;
  }

  // @ts-expect-error 'typescript-transform-paths' is commonjs module
  return tsTransformPaths.default;
};

const transform = getTransform();

export const compileDts = (files: string[], compilerOptions: ts.CompilerOptions): ts.EmitResult => {
  const host = ts.createCompilerHost(compilerOptions);
  host.writeFile = (fileName, contents) => {
    ts.sys.writeFile(fileName, contents);
  };

  const program = ts.createProgram(files, compilerOptions, host);

  const transformer = transform(program);

  const emitResult = program.emit(undefined, undefined, undefined, undefined, {
    afterDeclarations: [removeNonTsImports, transformer],
  });

  return emitResult;
};
