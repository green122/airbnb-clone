import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { Rental } from '../src/components';
import Provider from './StoryProvider';
import { IRental } from './types/models';

const stories = storiesOf('Demo Storybook', module);

stories.addDecorator((story: any) => <Provider story={story()} />);

const testData = {
  images: {
    picture_url: "https://via.placeholder.com/200x100.png"
  },
  name: 'My title',
}
const testData2 = {
  images: {
    picture_url: "https://via.placeholder.com/200x100.png"
  },
  name: 'My title !!!!!!!!!!!!!!!!!!!!!!!',
}
stories.add('Rental component', () => (
  <Rental data={testData as IRental} onClick={console.log}/>  
));

stories.add('Rental component 1111', () => (
  <Rental data={testData2 as IRental} onClick={console.log}/>  
));
