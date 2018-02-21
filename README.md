# stylelint-processor-glamorous
> Lint [glamorous](https://github.com/paypal/glamorous) and related css-in-js with [stylelint](https://github.com/stylelint/stylelint)

[![Build Status](https://travis-ci.org/zabute/stylelint-processor-glamorous.svg?branch=master)](https://travis-ci.org/zabute/stylelint-processor-glamorous)

## Installation

```sh
$ yarn add stylelint stylelint-processor-glamorous stylelint-config-standard --dev
```

 > You don't have to use the standard config. You can use ```styleilint-config-recommended``` or use your own cusotm config.
Certain rules that enforce formatting are [ignored](/src/ignoredRules.js).


Add ```.stylelintrc``` to the root of your project.
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
    const Component = glamorous.div({ ... });
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
  
  The  ```@css```  comment tells the processor that its a style object. Make sure you put it right before the opening brace.  

<hr/>

  LICENSE: [MIT](/LICENSE)