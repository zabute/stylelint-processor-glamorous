import path from 'path';
import stylelint from 'stylelint';
import React from 'react';
import ReactDOM from 'react-dom/server';
import CssProp from './fixtures/CssProp';

describe('CssProp', () => {
  let warnings;

  beforeAll((done) => {
    stylelint
      .lint({
        files: [path.join(__dirname, '/fixtures/CssProp.js')],
      })
      .then(({ results: stylelintResults }) => {
        warnings = stylelintResults[0].warnings;
        done();
      })
      .catch((error) => {
        console.log(error); // eslint-disable-line
        done();
      });
  });

  it('should render without crashing', () => {
    ReactDOM.renderToString(<CssProp />);
  });

  it('should have warnings', () => {
    expect(warnings.length).toBeGreaterThan(0);
  });

  it('should have 2 warnings', () => {
    expect(warnings.length).toEqual(2);
  });

  it('should have a prop override warning on line 18 column 9', () => {
    const propOverrideWarnings = warnings.filter(
      warning =>
        warning.rule === 'declaration-block-no-shorthand-property-overrides',
    );
    expect(propOverrideWarnings).toHaveLength(1);
    expect(propOverrideWarnings[0].line).toEqual(18);
    expect(propOverrideWarnings[0].column).toEqual(9);
  });

  it('should have a prop warning on line 20 column 11', () => {
    const propWarnings = warnings.filter(
      warning => warning.rule === 'property-no-unknown',
    );

    expect(propWarnings).toHaveLength(1);
    expect(propWarnings[0].line).toEqual(20);
    expect(propWarnings[0].column).toEqual(11);
  });
});
