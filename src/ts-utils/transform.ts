import * as ts from 'typescript';

type VisitorCreator = (ctx: ts.TransformationContext) => ts.Visitor;

const visitorCreator: VisitorCreator = (ctx) => {
  const visitor: ts.Visitor = (node) => {
    if (ts.isImportDeclaration(node) && !node.importClause) {
      // If it has no import class (e.g import 'foo.css'), rm the node
      return;
    }

    return ts.visitEachChild(node, visitor, ctx);
  };

  return visitor;
};

// export const removeNonTsImports = <T extends ts.Node>(): ts.TransformerFactory<T> => {
//   return (ctx: ts.TransformationContext): ts.Transformer<T> => {
//     return (sourceFile: T) => ts.visitNode(sourceFile, visitorCreator(ctx));
//   };
// };

export const removeNonTsImports = <T extends ts.Node>(
  ctx: ts.TransformationContext
): ts.Transformer<T> => {
  return (sourceFile: T) => ts.visitNode(sourceFile, visitorCreator(ctx));
};
