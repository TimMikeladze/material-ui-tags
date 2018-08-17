import React from 'react';

import { storiesOf } from '@storybook/react';

import { ChipTags } from '../src';

const tags = [
  {
    id: 'feature',
    title: 'Feature',
    description: 'A new feature',
    checked: true,
  },
  {
    id: 'bug',
    title: 'Bug',
    description: 'This is a bug',
  },
  {
    id: 'question',
    title: 'Question',
    description: 'This is a question',
  },
  {
    id: 'breaking-change',
    title: 'Breaking change',
    description: 'A breaking change',
    checked: true,
  },
];

storiesOf('ChipTags', module)
  .add('example', () => <ChipTags
    tags={tags}
  />)
  .add('tag creation disabled', () => <ChipTags
    tags={tags}
    disableCreate
  />)
  .add('with blurb', () => <ChipTags
    tags={tags}
    blurb='Please add a tag.'
  />);
