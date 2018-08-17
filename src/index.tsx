import Chip from '@material-ui/core/Chip';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { StyleRulesCallback, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import Delete from '@material-ui/icons/Delete';
import classNames from 'classnames';
import { merge } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { branch, compose, lifecycle, defaultProps, renderNothing, withHandlers, withProps, withStateHandlers } from 'recompose';
import Checkbox from '@material-ui/core/Checkbox';

const styles: StyleRulesCallback = (theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  rootChip: {

  },
  blurb: {
    marginBottom: theme.spacing.unit,
  },
  chip: {
    marginRight: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  menu: {

  },
  menuItem: {

  },
});

export const ChipTags: React.SFC<any> = compose(
  withStyles(styles),
  withStateHandlers(props => ({
    menuAnchorElement: null,
    menuOpen: false,
    tags: props.tags,
  }), {
      handleRootChipClicked: (state, props) => (e) => {
        return {
          menuOpen: true,
          menuAnchorElement: e.target,
        };
      },
      handleMenuClosed: (state) => () => {
        return {
          menuOpen: false,
          menuAnchorElement: null,
        };
      },
      handleTagClicked: (state, props) => (tag, checked) => {
        const modifiedTagIndex = state.tags.findIndex(t => t.id === tag.id);
        const modifiedTag = state.tags.find(t => t.id === tag.id);

        state.tags.splice(modifiedTagIndex, 1, {
          ...tag,
          checked: checked === undefined ? !tag.checked : !!checked,
        });

        return {
          tags: [...state.tags],
        };
      },
    }),
)(
  ({
    classes,
    handleRootChipClicked,
    tags,
    blurb,
    menuOpen,
    handleMenuClosed,
    handleTagClicked,
  }) => (
      <div className={classes.root}>
        <div className={classes.blurb}>
          {blurb && <Typography className={classes.blurb} variant='caption'>{blurb}</Typography>}
        </div>
        <div className={classes.chips}>
          <Chip
            className={classNames(classes.chip, classes.rootChip)}
            onClick={handleRootChipClicked}
            label={'Add tag'}
            deleteIcon={<AddCircleOutline />}
            onDelete={handleRootChipClicked}
            clickable
          />

          {tags && tags.filter(tag => tag.checked).map(
            (tag: any) =>
              (<Chip
                key={tag.id}
                className={classes.chip}
                label={tag.title}
                onDelete={() => handleTagClicked(tag, false)}
                clickable
              />),
          )
          }
        </div>
        {menuOpen &&
          <Menu className={classes.menu} open={menuOpen} onClose={handleMenuClosed}>
            {tags && tags.map(
              (tag: any) =>
                <MenuItem
                  key={tag.id}
                  className={classes.menuItem}
                  onClick={() => handleTagClicked(tag)}
                >
                  <Checkbox
                    checked={!!tag.checked}
                    onClick={() => handleTagClicked(tag)}
                  />
                  <ListItemText primary={tag.title} />
                </MenuItem>,
            )}
          </Menu>
        }
      </div>
    ),
);

// TODO create typescript interface for props
ChipTags.propTypes = {
  Chip: PropTypes.func,
  rootChipProps: PropTypes.object,
  tags: PropTypes.arrayOf(PropTypes.shape(({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    checked: PropTypes.bool,
  }))),
};

ChipTags.defaultProps = {

};
