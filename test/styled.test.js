import path from 'path';
import stylelint from 'stylelint';

describe('Factory', () => {
  let warnings;

  beforeAll((done) => {
    stylelint
      .lint({
        files: [path.join(__dirname, '/fixtures/styled.js')],
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

  it('should have warnings', () => {
    expect(warnings.length).toBeGreaterThan(0);
  });

  it('should have 2 warnings', () => {
    expect(warnings.length).toEqual(2);
  });

  it('should have an unknown prop warning on line 10 column 3', () => {
    const propWarnings = warnings.filter(
      warning => warning.rule === 'property-no-unknown',
    );

    expect(propWarnings.length).toEqual(1);
    expect(propWarnings[0].line).toEqual(10);
    expect(propWarnings[0].column).toEqual(3);
  });

  it('should have a pseudo class selector warning on line 15 column 3', () => {
    const propWarnings = warnings.filter(
      warning => warning.rule === 'selector-pseudo-class-no-unknown',
    );

    expect(propWarnings.length).toEqual(1);
    expect(propWarnings[0].line).toEqual(15);
    expect(propWarnings[0].column).toEqual(3);
  });
});
