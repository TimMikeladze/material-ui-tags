# material-ui-tags

[![CircleCI](https://circleci.com/gh/TimMikeladze/material-ui-tags.svg?style=svg)](https://circleci.com/gh/TimMikeladze/material-ui-tags)

[View a  Storybook demo](http://mikeladze.io/material-ui-tags/?selectedKind=ChipTags&selectedStory=example&full=0&addons=1&stories=1&panelRight=0)

![demo](static/demo.gif)


Opinionated React components built on top of `@material-ui/core` for handling tags (sometimes known as labels).

Background - I found myself combining several `@material-ui/core` components along with `recompose` HOCs in order to build a tagging component which quickly became non-trivial to implement and needed to be reusable across projects. This package aims to resolve that need.

## Usage

```javascript

import { ChipTags } from 'material-ui-tags'

const App = () =>
  <div>
    <ChipTags
      tags={[
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
      ]}
    />
  </div>
```
