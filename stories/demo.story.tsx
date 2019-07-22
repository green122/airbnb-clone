import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { Rental } from '../src/components';
import Provider from './StoryProvider';

const stories = storiesOf('Demo Storybook', module);

stories.addDecorator((story: any) => <Provider story={story()} />);

stories.add('Rental component', () => (
  <Rental image="https://via.placeholder.com/200x100.png" title="My title" subtitle="My subtitle" onClick={console.log}/>  
));
