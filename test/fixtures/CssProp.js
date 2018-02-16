import React from 'react';
import { Div } from 'glamorous';

const styles = {
  color: 'red',
};

const App = props => (
  <div>
    <Div
      fontSize={{
        someProps: props.someValue, // must not trigger any warnings
      }}
      css={{
        ...styles,
        display: 'flex',
        paddingTop: 6,
        padding: '8px 12px', // shorthand prop override
        ':hover': {
          flexDirectionn: 'row', // prop error
          color: props.color,
          backgroundColor: props.big ? '#fff' : '#000x',
        },
      }}
    >
      {props.content}
    </Div>
  </div>
);

export default App;
