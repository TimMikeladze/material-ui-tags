import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
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
import { compose, withHandlers, withState } from 'recompose';
import shortId from 'shortid';
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
    marginTop: theme.spacing.unit,
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
  withState('menuAnchorElement', 'setMenuAnchorElement', null),
  withState('menuOpen', 'setMenuOpen', false),
  withState('tags', 'setTags', (props) => props.tags),
  withState('searchValue', 'setSearchValue', ''),
  withHandlers({
    handleRootChipClicked: (props) => (e) => {
      props.setMenuOpen(true);
      props.setMenuAnchorElement(e.target);
    },
    handleMenuClosed: (props) => () => {
      props.setMenuOpen(false);
      props.setMenuAnchorElement(null);
      props.setSearchValue('');
    },
    handleTagClicked: (props) => (tag, checked) => {
      const modifiedTagIndex = props.tags.findIndex((t) => t.id === tag.id);

      const tags = [...props.tags];

      tags.splice(modifiedTagIndex, 1, {
        ...tag,
        checked: checked === undefined ? !tag.checked : !!checked,
      });

      if (props.onToggleTag) {
        props.onToggleTag({
          id: tag.id,
          checked: checked === undefined ? !tag.checked : !!checked,
        });
      }

      props.setTags(tags);
    },
    handleSearchValueChanged: (props) => (e) => {
      props.setSearchValue(e.target.value);
    },
    handleCreate: (props) => async () => {
      let tag = {
        title: props.searchValue,
        checked: true,
      };

      let createdTag;

      if (props.onCreateTag) {
        createdTag = await props.onCreateTag(tag);
      }

      tag = createdTag || { id: shortId.generate(), ...tag };

      props.setSearchValue('');
      props.setTags([tag, ...props.tags]);
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
    className,
    disableAdd,
  }) => (
      <div className={classNames(className, classes.root)}>
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
          <Menu
            disableAutoFocusItem
            MenuListProps={{
              disablePadding: true,
            }}
            anchorEl={menuAnchorElement}
            open={menuOpen}
            onClose={handleMenuClosed}
          >
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
