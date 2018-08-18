import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
// import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { StyleRulesCallback, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Add from '@material-ui/icons/Add';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import Search from '@material-ui/icons/Search';
import classNames from 'classnames';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { compose, withStateHandlers } from 'recompose';
import score from 'string-score';

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
    display: 'flex',
    flexDirection: 'column',
  },
  list: {

  },
  menuItem: {

  },
  formControl: {
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit,
  },
  create: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  createValue: {
    fontWeight: 600,
  },
});

export const ChipTags: React.SFC<any> = compose(
  withStyles(styles),
  withStateHandlers((props) => ({
    menuAnchorElement: null,
    menuOpen: false,
    tags: props.tags,
    searchValue: '',
  }), {
      handleRootChipClicked: (state, props) => (e) => {
        return {
          menuOpen: true,
          menuAnchorElement: e.target,
        };
      },
      handleMenuClosed: (state) => () => {
        return {
          searchValue: '',
          menuOpen: false,
          menuAnchorElement: null,
        };
      },
      // TODO different ways of sorting tags instead of using the ordering of the provided tags array
      handleTagClicked: (state, props) => (tag, checked) => {
        const modifiedTagIndex = state.tags.findIndex((t) => t.id === tag.id);

        state.tags.splice(modifiedTagIndex, 1, {
          ...tag,
          checked: checked === undefined ? !tag.checked : !!checked,
        });

        return {
          tags: [...state.tags],
        };
      },
      handleSearchValueChanged: (state, props) => (e) => {
        return {
          searchValue: e.target.value,
        };
      },
      handleCreate: (state, props) => () => {
        const tag = {
          id: 'foo',
          title: state.searchValue,
          checked: true,
        };

        return {
          searchValue: '',
          tags: [tag, ...state.tags],
        };
      },
    }),
)(
  ({
    classes,
    handleRootChipClicked,
    tags,
    blurb,
    blurbPosition,
    menuOpen,
    handleMenuClosed,
    handleTagClicked,
    handleSearchValueChanged,
    searchValue,
    minStringScore,
    handleCreate,
    disableCreate,
    menuAnchorElement,
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

          {tags && tags
            .filter((tag) => tag.checked)
            .map(
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
          <Menu anchorEl={menuAnchorElement} open={menuOpen} onClose={handleMenuClosed} disableAutoFocusItem>
            <div className={classes.menu}>
              <FormControl className={classes.formControl}>
                <InputLabel className={classes.inputLabel} htmlFor='search'>Enter a tag</InputLabel>
                <Input
                  className={classes.input}
                  id='search'
                  value={searchValue}
                  onChange={handleSearchValueChanged}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton>
                        <Search />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              {!disableCreate && !isEmpty(searchValue) &&
                <MenuItem
                  className={classes.menuItem}
                  onClick={handleCreate}
                >
                  <IconButton>
                    <Add />
                  </IconButton>
                  <ListItemText
                    primary={
                      <div className={classes.create}>
                        Create "<div className={classes.createValue}>{searchValue}</div>"
                      </div>}
                  />
                </MenuItem>
              }
              <div className={classes.list}>
                {tags && tags
                  .filter((tag) => {
                    return isEmpty(searchValue) ||
                      score(tag.title, searchValue) > minStringScore;
                  })
                  .map(
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
              </div>
            </div>
          </Menu>
        }
      </div>
    ),
);

// TODO create typescript interface for props
ChipTags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.shape(({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    checked: PropTypes.bool,
  }))),
  minStringScore: PropTypes.number,
  disableCreate: PropTypes.bool,
  // TODO Add remaining blurb positions
  blurbPosition: PropTypes.oneOf(['top']),
};

ChipTags.defaultProps = {
  minStringScore: 0.5,
  blurbPosition: 'top',
};
