# material-ui-tags

[](View a demo).

Opinionated `material-ui` React components for handling user interactions with tags (sometimes known as labels). Some background - I found myself combining several `@material-ui/core` along with `recompose` HOCs to create tagging components across different projects. This package is intends to make these components reusable.

## Usage

```javascript

import { Tags } from 'material-ui-tags'

const App () =>
  <div>
    <Tags
      tags=[{
        id: 'feature'
        title: 'Feature',
        description: 'A new feature'
      }, {
        id: 'bug'
        title: 'Bug',
        description: 'This is a bug'
      }],
    />
  </div>

```
