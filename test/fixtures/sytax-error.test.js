import stylelint from 'stylelint';

describe('js-syntax-error', () => {
  it('should pass', async () => {
    await stylelint.lint({
      code: ']',
    });
  });
});
