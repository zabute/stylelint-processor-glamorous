export const mustNotBeLinted = {
  paddingTop: '4p',
  color: '#FFFFFFF',
};

export const noErrors =
  // @css
  {
    display: 'inline-block',
    paddingTop: '4px',
    color: '#fff',
    ':hover': {
      background: '#000',
      '@media (minWidth: 700px)': {
        color: 'red',
      },
    },
  };

export const withErrors =
  // @css
  {
    display: 'inline-block',
    paddingTop: '4p', // unknwon unit
    color: '#f40dfaa444', // invalid hex
    padding: '6px 12px', // shorthand property override
    ':hover': {
      background: '#000',
      '@media (minWidth: 700px)': { colors: 'red' }, // unknwon prop "colors"
    },
  };
