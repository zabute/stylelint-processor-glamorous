/* eslint-disable
  import/no-unresolved,
  import/extensions,
  import/no-extraneous-dependencies */

import styled from 'whatever';

export const Component = styled('div')({
  // unknown prop
  colors: 'red',
});

export const Component2 = styled.div({
  // unknown pseudo class selector
  ':hovering': {
    color: 'red',
  },
});
