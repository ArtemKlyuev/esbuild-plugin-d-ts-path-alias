import ts from 'typescript';

type VisitorCreator = (ctx: ts.TransformationContext) => ts.Visitor;

const visitorCreator: VisitorCreator = (ctx) => {
  const visitor: ts.Visitor = (node) => {
    if (ts.isImportDeclaration(node) && !node.importClause) {
      // If it has no import class (e.g import 'foo.css'), remove the node
      return undefined;
    }

    return ts.visitEachChild(node, visitor, ctx);
  };

  return visitor;
};

export const removeNonTsImports = <T extends ts.Node>(
  ctx: ts.TransformationContext,
): ts.Transformer<T> => {
  const visitor = visitorCreator(ctx);
  return (sourceFile) => ts.visitNode(sourceFile, visitor) as T;
};
