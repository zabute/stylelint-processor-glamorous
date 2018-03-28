# stylelint-processor-glamorous
> Lint [glamorous](https://github.com/paypal/glamorous) and related css-in-js with [stylelint](https://github.com/stylelint/stylelint)

[![Build Status](https://travis-ci.org/zabute/stylelint-processor-glamorous.svg?branch=master)](https://travis-ci.org/zabute/stylelint-processor-glamorous)

## Installation

```sh
$ yarn add stylelint stylelint-config-standard stylelint-processor-glamorous --dev
```

 > You can use `styleiint-config-recomended` or your own custom config. Certain rules that enforce formatting rules will be [ignored](/src/ignoredRules.js).


### Add ```.stylelintrc``` to the root of your project:
```json
{
  "processors": ["stylelint-processor-glamorous"],
  "extends": "stylelint-config-standard"
}
```

That's it. You can now run stylelint from the command line.

```sh
$ yarn stylelint 'src/**/*.js'
```

<hr/>

## What gets linted
- Glamorous component factories
  ```js
    import glamorous from 'glamorous'; // choose any name for the defaut export

    const Component = glamorous.div({ ... });
    const OtherComponent = glamorous('div')({ ... })
  ```

- CSS attributes

  ```jsx
    <Div css={{ ... }}/>
  ```  

- Annotated object literals.
  ```js
  export const styles = 
    // @css
    {
      ...
    }
  ```
  
  The  `@css`  comment tells the processor that its a style object. Make sure you put it right before the opening brace.

<hr/>

## Integrating with other css-in-js libraries
  You can use `@css` to lint any object. Hoverver, if you stick to the `styled` pattern, you won't need to add annotations to your code.

  ```js
    import styled from 'my-fav-cssinjs-lib';

    const Component = styled.div({ ... })
    const OtherComponent = styled('div')({ ... })  
  ```

<hr/>  

## Contributing
Contributions of any kind are always welcome.

<hr/>

LICENSE: [MIT](/LICENSE)