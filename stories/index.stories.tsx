import React from 'react';

import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
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
  .add('default', () => <ChipTags />)
  .add('custom label', () => <ChipTags
    rootChipProps={{
      label: 'Add label',
    }}
  />)
  .add('blurb', () => <ChipTags
    blurb='Please add a tag.'
  />)
  .add('tags', () => <ChipTags
    tags={tags}
  />);
