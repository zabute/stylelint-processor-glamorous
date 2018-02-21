import path from 'path';
import stylelint from 'stylelint';
import React from 'react';
import ReactDOM from 'react-dom/server';
import Factory from './fixtures/Factory';

describe('Factory', () => {
  let warnings;

  beforeAll((done) => {
    stylelint
      .lint({
        files: [path.join(__dirname, '/fixtures/Factory.js')],
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
    ReactDOM.renderToString(<Factory />);
  });

  it('should have warnings', () => {
    expect(warnings.length).toBeGreaterThan(0);
  });

  it('should have 4 warnings', () => {
    expect(warnings.length).toEqual(4);
  });

  it('should have a selector warning on line 15 column 5', () => {
    const selectorWarnings = warnings.filter(
      warning => warning.rule === 'selector-pseudo-class-no-unknown',
    );

    expect(selectorWarnings).toHaveLength(1);
    expect(selectorWarnings[0].line).toEqual(15);
    expect(selectorWarnings[0].column).toEqual(5);
  });

  it('should have a prop warning on line 15 column 5', () => {
    const propWarnings = warnings.filter(
      warning => warning.rule === 'property-no-unknown',
    );

    expect(propWarnings).toHaveLength(1);
    expect(propWarnings[0].line).toEqual(20);
    expect(propWarnings[0].column).toEqual(5);
  });

  it('should have a hex case warning on line 21', () => {
    const hexCaseWarnings = warnings.filter(
      warning => warning.rule === 'color-hex-case',
    );

    expect(hexCaseWarnings).toHaveLength(1);
    expect(hexCaseWarnings[0].line).toEqual(21);
  });

  it('should have a font family warning on line 30 column 23', () => {
    const fontFamilyWarnings = warnings.filter(
      warning => warning.rule === 'font-family-no-duplicate-names',
    );

    expect(fontFamilyWarnings).toHaveLength(1);
    expect(fontFamilyWarnings[0].line).toEqual(30);
    expect(fontFamilyWarnings[0].column).toEqual(23);
  });
});
