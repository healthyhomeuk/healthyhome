import 'react-native';
import React from 'react';
import Settings from '../src/views/Settings';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<Settings/>);
});
