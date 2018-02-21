import * as t from '@babel/types';
import traverse from '@babel/traverse';
import gen from '@babel/generator';
import postcss from 'postcss';
import postcssJs from 'postcss-js';
import json5 from 'json5';
import id from 'shortid';
import {
  hasLeadingComment,
  isCssAttribute,
  isAnnotatedExpression,
  extractDeclarations,
  extractValues,
} from './helpers';

let sourceMap;

export default (ast) => {
  sourceMap = new Map();
  let glamorousImport;
  let rules = [];

  traverse(ast, {
    enter(path) {
      if (isCssAttribute(path) || isAnnotatedExpression(path)) {
        rules = rules.concat([path]);
      }

      if (path.isImportDeclaration()) {
        if (path.node.source.value === 'glamorous') {
          glamorousImport = path
            .get('specifiers')
            .filter(specifier => specifier.isImportDefaultSpecifier())[0];
        }
      }

      if (path.isCallExpression() && glamorousImport) {
        const importName = glamorousImport.node.local.name;
        const { object, callee } = path.node.callee;

        if (
          (object && object.name === importName) ||
          (callee && callee.name === importName)
        ) {
          path.get('arguments').forEach((arg) => {
            if (arg.isObjectExpression()) {
              rules = rules.concat([arg]);
            } else if (arg.isFunction()) {
              if (arg.get('body').isObjectExpression()) {
                rules = rules.concat(arg.get('body'));
              } else {
                const rule = Object.assign(
                  {},
                  t.objectExpression(extractDeclarations(arg.get('body'))),
                  { loc: path.node.loc },
                );
                path.replaceWith(rule);
                rules = rules.concat(path);
              }
            }
          });
        }
      }
    },
  });

  let styles = [];

  rules.forEach((rule) => {
    sourceMap.set(sourceMap.size + 1, rule.node.loc.start);
    processRule(rule);

    const cssString = getCssString(rule.node);
    styles = styles.concat([
      `.${id.generate()}{${cssString && '\n'}${cssString}}`,
    ]);
  });

  return { css: styles.join('\n'), sourceMap };
};

const processRule = (path) => {
  if (path.get('properties')) {
    path.get('properties').forEach((prop) => {
      if (
        prop.isObjectProperty() &&
        !hasLeadingComment(prop, /^\s*stylelint-disable-next-line\s*$/)
      ) {
        sourceMap.set(sourceMap.size + 1, prop.node.key.loc.start);

        if (
          !prop.get('key').isIdentifier() &&
          !prop.get('key').isStringLiteral()
        ) {
          prop.replaceWith(
            t.objectProperty(
              t.stringLiteral(`.${id.generate()}`),
              prop.node.value,
            ),
          );
        } else if (prop.node.key.value) {
          // hyphenate strings like minWidth and @fontFace
          prop
            .get('key')
            .replaceWith(
              t.stringLiteral(
                prop.node.key.value.replace(/([A-Z])/, '-$1').toLowerCase(),
              ),
            );

          if (!prop.get('value').isObjectExpression()) {
            prop.get('value').replaceWith(t.objectExpression([]));
          }
        }

        if (prop.get('value').isObjectExpression()) {
          processRule(prop.get('value'));
        } else if (
          !prop.get('value').isNumericLiteral() &&
          !prop.get('value').isStringLiteral()
        ) {
          const values = extractValues(prop.get('value'));

          if (
            prop.get('value').isConditionalExpression() &&
            values.length > 0
          ) {
            // Create multiple declarations for conditional expressions.
            // Example: { color: prop.primary ? 'red' : 'blue' }
            //  will be replaced with { color: 'red', color: 'blue'}
            const declarations = values.map((value, index) => {
              const key = Object.assign(
                {},
                // Attach a random id to the prop so it becomes valid js.
                t.stringLiteral(`${prop.node.key.name}$${id.generate()}`),
                { loc: prop.node.loc },
              );

              if (index > 0) {
                sourceMap.set(sourceMap.size + 1, prop.node.key.loc.start);
              }
              return t.objectProperty(key, value);
            });

            prop.replaceWithMultiple(declarations);
          } else {
            prop.get('value').replaceWith(t.stringLiteral('placeholderValue'));
          }
        }
      } else {
        prop.node.leadingComments = []; // eslint-disable-line
        prop.remove();
      }
    });
  }
};

const getCssString = (node) => {
  try {
    const extractedCss = postcss().process(json5.parse(gen(node).code), {
      parser: postcssJs,
    }).css;

    return (
      extractedCss &&
      // Collapse closing braces to the end of the last declaration in the block. Makes
      // generating the source map a lot easier: simply map every object property to a line in the css.
      extractedCss
        .replace(/\n\s*(?=\s*})/g, '')
        // Remove Indentations
        .replace(/\n\s*/g, '\n')
        // Remove random id if present
        .replace(/(\$.*)(?=.*:)/g, '')
    );
  } catch (e) {
    e.message = `Parsing Failed. Make sure you're not using unsupported syntax. ${
      e.message
    }`;

    throw e;
  }
};
