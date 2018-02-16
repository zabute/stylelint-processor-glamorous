import path from 'path';
import stylelint from 'stylelint';

describe('pojo', () => {
  let warnings;

  beforeAll((done) => {
    stylelint
      .lint({
        files: [path.join(__dirname, '/fixtures/pojo.js')],
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

  it('should have 5 warnings', () => {
    expect(warnings.length).toEqual(4);
  });

  it('should have one unit-no-unknown warning on line 24 column 18', () => {
    const unitWarnings = warnings.filter(
      warning => warning.rule === 'unit-no-unknown',
    );

    expect(unitWarnings.length).toEqual(1);
    expect(unitWarnings[0].line).toEqual(24);
    expect(unitWarnings[0].column).toEqual(18);
  });

  it('should have one color-no-invalid-hex warning on line 25 column 12', () => {
    const hexWarnings = warnings.filter(
      warning => warning.rule === 'color-no-invalid-hex',
    );

    expect(hexWarnings.length).toEqual(1);
    expect(hexWarnings[0].line).toEqual(25);
    expect(hexWarnings[0].column).toEqual(12);
  });

  it('should have one no-shorthand-property-overrides warning on line 26 column 5', () => {
    const overrideWarnings = warnings.filter(
      warning =>
        warning.rule === 'declaration-block-no-shorthand-property-overrides',
    );

    expect(overrideWarnings.length).toEqual(1);
    expect(overrideWarnings[0].line).toEqual(26);
    expect(overrideWarnings[0].column).toEqual(5);
  });

  it('should have one property-no-unknown warning on line 29 column 37', () => {
    const propWarnings = warnings.filter(
      warning => warning.rule === 'property-no-unknown',
    );

    expect(propWarnings.length).toEqual(1);
    expect(propWarnings[0].line).toEqual(29);
    expect(propWarnings[0].column).toEqual(37);
  });
});
