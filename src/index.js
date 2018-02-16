import { parse as babylon } from 'babylon';
import extract from './extract';
import ignoredRules from './ignoredRules';

const parse = (input) => {
  const options = {
    sourceType: 'module',
    plugins: [
      'jsx',
      'flow',
      'objectRestSpread',
      'typescript',
      'decorators',
      'classProperties',
      'exportExtensions',
      'asyncGenerators',
      'functionBind',
      'functionSent',
      'dynamicImport',
    ],
  };

  return babylon(input, options);
};

const sourceMaps = {};

export default () => ({
  code: (input, path) => {
    const { css, sourceMap } = extract(parse(input));
    sourceMaps[path] = sourceMap;

    return css;
  },

  result: (result, path) =>
    Object.assign({}, result, {
      warnings: result.warnings
        .filter(warning => !ignoredRules.includes(warning.rule))
        .map(warning =>
          Object.assign({}, warning, {
            line: sourceMaps[path].get(warning.line).line,
            column: sourceMaps[path].get(warning.line).column + warning.column,
          }),
        ),
    }),
});
