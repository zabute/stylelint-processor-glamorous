import React from 'react';
import glm from 'glamorous';

const minWidth = 700;

const Component1 = glm.a(
  {
    // stylelint-disable-next-line
    unknownProperty: '1.8em', // must not trigger any warnings
    display: 'inline-block',
    [`@media (minWidth: ${minWidth}px)`]: {
      color: 'red',
    },
    // unkown pseudo class selector
    ':focused': {
      backgroundColor: 'red',
    },
  },
  ({ primary }) => ({
    unknownProperty: '1.8em', // unknown prop
    color: primary ? '#fff' : '#DA233C',
  }),
);

const Component2 = glm(Component1, {
  displayName: 'Component2',
  forwardProps: ['shouldRender'],
  rootEl: 'div',
})(props => ({
  fontFamily: 'Arial, Arial, sans-serif', // duplicate font-family names
  fontSize: props.big ? 36 : 24,
}));

const Component3 = glm.div({
  padding: '8px 12px',
});

export default () => (
  <div>
    <Component1 />
    <Component2 />
    <Component3 />
  </div>
);
