import * as ts from 'typescript';

type VisitorCreator = (ctx: ts.TransformationContext) => ts.Visitor;

const visitorCreator: VisitorCreator = (ctx) => {
  const visitor: ts.Visitor = (node) => {
    if (ts.isImportDeclaration(node) && !node.importClause) {
      // If it has no import class (e.g import 'foo'), rm the node
      return;
    }

    return ts.visitEachChild(node, visitor, ctx);
  };

  return visitor;
};

export const transform = <T extends ts.Node>(): ts.TransformerFactory<T> => {
  return (ctx: ts.TransformationContext): ts.Transformer<T> => {
    return (sourceFile: T) => ts.visitNode(sourceFile, visitorCreator(ctx));
  };
};
