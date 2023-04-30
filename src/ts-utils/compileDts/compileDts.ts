import * as ts from 'typescript';
import tsTransformPaths from 'typescript-transform-paths';

import { removeNonTsImports } from '../removeNonTsImports';

export const compileDts = (files: string[], compilerOptions: ts.CompilerOptions): ts.EmitResult => {
  const host = ts.createCompilerHost(compilerOptions);
  host.writeFile = (fileName, contents) => {
    ts.sys.writeFile(fileName, contents);
  };

  const program = ts.createProgram(files, compilerOptions, host);

  const transformer = tsTransformPaths(program);

  const emitResult = program.emit(undefined, undefined, undefined, undefined, {
    afterDeclarations: [removeNonTsImports, transformer],
  });

  return emitResult;
};
