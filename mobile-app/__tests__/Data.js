import 'react-native';
import React from 'react';
import Data from '../src/views/Data';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
    renderer.create(<Data />);
  });