export const hasLeadingComment = (path, pattern) =>
  path.node.leadingComments &&
  path.node.leadingComments.filter(comment => pattern.test(comment.value))[0];

export const isTopLevelExpression = path =>
  path.isObjectExpression() && !path.findParent(p => p.isObjectExpression());

export const isCssAttribute = path =>
  isTopLevelExpression(path) &&
  path.findParent(
    p => p.isJSXAttribute() && p.node.name && p.node.name.name === 'css',
  );

export const isAnnotatedExpression = path =>
  path.isObjectExpression() && hasLeadingComment(path, /^\s*@css\s*$/);

export const extractDeclarations = (path) => {
  let declarations = [];

  path.traverse({
    ObjectExpression(p) {
      if (!p.findParent(parent => parent.isObjectProperty())) {
        p.node.properties.forEach((prop) => {
          declarations = declarations.concat([prop]);
        });
      }
    },
  });

  return declarations;
};
