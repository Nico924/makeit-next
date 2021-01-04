import * as React from 'react';
import classNames from 'classnames/bind';
import TextItem from 'components/items/TextItem';
import find from 'lodash/find';

import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import List from 'react-virtualized/dist/commonjs/List';

import config from 'config/general';
import { FaCheck } from 'react-icons/fa';
import styleIdentifiers from './suggestions.scss';

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {
  items: object[];
  multiple: boolean;
  // infoInput: Array<string> | string,
  filter: boolean;
  className: string;
  small: boolean;
  value: {} | object[] | string[] | null;
  placeholder: string;
  externalCursor: number;
  externalActive: boolean;
  filterChange: Function;
  toggleClick: Function;
  selectValue: Function;
  closeOnSelect: boolean;
  itemRendering: Function;
  forcedOpen: boolean;
  children: React.Element<any>;
  // styling
  // first wrapper
  itemsContentWrapperClassName: string;
  itemsContentWrapperStyle: {};
  // items + filter wrapper
  itemsClassName: string;
  itemsStyle: {};
  // items wrapper
  itemsWrapperClassName: string;
  itemsWrapperStyle: {};
  // item
  itemClassName: string;
  itemStyle: {};
  // check className
  checkWrapperClassName: string;
  // active className
  activeClassName?: string;
  addItem: boolean;
  addItemLabel: string;
  addItemAction: Function;
  disabledItems: any[];
  darkMode?: boolean;
}

export type SuggestionsProps = StateProps & DispatchProps & OwnProps;

interface SuggestionsState {
  dropdownActive: boolean;
  cursor: number;
  filter: string;
}

export default class Suggestions extends React.Component<SuggestionsProps, SuggestionsState> {
  constructor(props: SuggestionsProps) {
    super(props);

    this.specialKeys = ['ArrowUp', 'ArrowDown', 'Enter', 'Tab'];

    this.state = {
      cursor: props.externalCursor || -1,
      dropdownActive: props.externalActive || false,
    };

    this.listRef = React.createRef();
  }

  componentDidMount(): void {
    document.addEventListener('mouseup', this.handleClickOutside);
    document.addEventListener('keydown', this.handleKeyPress);
    // this.SortItem()
  }

  componentDidUpdate(prevProps: SuggestionsProps, prevState): void {
    const { dropdownActive, cursor } = this.state;

    // Handle outside cursor & outside toggle
    this.checkCursor(prevProps);
    // Check if parent has communicated as state change
    this.checkActive();
    // Update scroll position
    if (
      dropdownActive &&
      this.hoverElement &&
      !this.isInScrollView(this.hoverElement, this.itemWrapper) &&
      prevState.cursor !== cursor
    ) {
      this.itemWrapper.scrollTop = this.hoverElement.offsetTop;
    }
  }

  componentWillUnmount(): void {
    document.removeEventListener('mouseup', this.handleClickOutside);
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  // change list
  onFilterChange = (e: {}): void => {
    const filter = e.currentTarget.value;

    const { filterChange } = this.props;

    if (filterChange) {
      filterChange(filter);
    }
  };

  /**
   * Set the wrapper ref
   */
  setWrapperRef = (node: HTMLElement): void => {
    if (node) this.wrapperRef = node;
  };

  /**
   * Alert if clicked on outside of element
   */
  handleClickOutside = (event: {}): void => {
    const { dropdownActive } = this.state;
    if (dropdownActive && this.wrapperRef && event && !this.wrapperRef.contains(event.target)) {
      this.handleClick(false);
    }
  };

  // Check if parent has communicated as state change
  checkActive = (): void => {
    const { dropdownActive } = this.state;
    const { externalActive } = this.props;

    if (externalActive !== undefined && dropdownActive !== externalActive) {
      this.toggleActive(externalActive);
    }
  };

  // Update cursor from external component
  checkCursor = (prevProps: SuggestionsProps): void => {
    const { externalCursor } = this.props;
    if (externalCursor && prevProps.externalCursor !== externalCursor) {
      this.setState({
        cursor: externalCursor,
      });
    }
  };

  compare = (value: {} | string, item: {}): boolean => {
    if (!item || value === undefined) return false;

    if (JSON.stringify(item) === JSON.stringify(value)) return true;
    if (value === item) return true;

    if (item[config.idKey] && item[config.idKey] === value) return true;
    if (item.value && item.value === value) return true;

    if (value.value && item.value && item.value === value.value) return true;
    if (value[config.idKey] && item[config.idKey] && item[config.idKey] === value[config.idKey])
      return true;

    return false;
  };

  checkItem = item => {
    const { multiple, checkFunction, value } = this.props;

    if (Array.isArray(value) || multiple) {
      return find(value, it => {
        if (checkFunction) return checkFunction(it, item);
        return this.compare(it, item);
      });
    }

    if (value === undefined) return false;

    if (checkFunction) return checkFunction(value, item);

    return this.compare(value, item);
  };

  isInScrollView = (elem: HTMLElement, parent: HTMLElement): number => {
    const parentViewTop = parent.scrollTop;
    const parentViewBottom = parentViewTop + parent.offsetHeight;

    const elemTop = elem.offsetTop;
    const elemBottom = elemTop + elem.offsetHeight;

    return elemBottom <= parentViewBottom && elemTop >= parentViewTop;
  };

  handleKeyPress = (event: {}): void => {
    const { filter, dropdownActive } = this.state;
    const { multiple, items } = this.props;
    let { cursor } = this.state;
    const orderedItems = items;

    if (!dropdownActive) return;

    if (filter != null && this.specialKeys.indexOf(event.key) < 0) {
      this.setState({ cursor: -1 });
    }
    if (this.specialKeys.indexOf(event.key) >= 0) event.preventDefault();

    if (event.key === 'ArrowUp') {
      cursor -= 1;
      if (cursor < -1) {
        cursor = orderedItems.length - 1;
      }
      this.setState({
        cursor,
      });
    }
    if (event.key === 'ArrowDown') {
      // new index
      cursor += 1;
      if (cursor >= orderedItems.length) {
        cursor = -1;
      }
      this.setState({
        cursor,
      });
    }
    if (event.key === 'Tab') {
      // force close on tab
      this.handleClick(false);
    }
    if (!multiple) {
      if (event.key === 'Enter' && cursor > -1) {
        this.selectSuggestion(orderedItems[cursor]);
      }
      // should not happen
      else if (event.key === 'Enter' && cursor === -1) {
        this.handleClick(false);
      }
    } else if (multiple) {
      if (event.key === 'Enter' && cursor > -1) {
        this.selectSuggestion(orderedItems[cursor]);
      } else if (event.key === 'Enter' && cursor === -1) {
        this.handleClick(false);
      }
    }
    if (this.listRef && this.listRef.current) {
      // Use of timeout so that the input.onChange has the time to be triggered
      setTimeout(() => {
        this.listRef.current.forceUpdateGrid();
      });
    }
  };

  handleHoverRef = (element: HTMLElement, key: number): void => {
    const { cursor } = this.state;
    if (cursor === key && element) {
      this.hoverElement = element;
    }
  };

  handleClick = (forcedValue: boolean): void => {
    const { toggleClick } = this.props;

    if (toggleClick) {
      // This will cause toggleActive to be executed
      toggleClick(forcedValue);
    } else {
      this.toggleActive(forcedValue);
    }
  };

  selectSuggestion = (item: {}): void => {
    const { selectValue, closeOnSelect } = this.props;
    if (this.checkDisabled(item)) return;

    if (selectValue) selectValue(item);

    if (closeOnSelect) this.handleClick(false);

    if (this.listRef && this.listRef.current) {
      // Use of timeout so that the input.onChange has the time to be triggered
      setTimeout(() => {
        this.listRef.current.forceUpdateGrid();
      });
    }
  };

  toggleActive = (forcedValue: boolean): void => {
    const { dropdownActive } = this.state;
    const self = this;
    if (forcedValue !== undefined) {
      if (dropdownActive !== forcedValue) {
        this.setState({ dropdownActive: forcedValue });
      }
      if (forcedValue && self.filterInput) {
        // Need timeout because there is a first focus from the parent
        setTimeout(() => {
          self.filterInput.focus();
        });
      }
      return;
    }
    if (dropdownActive) {
      this.setState({ dropdownActive: false });
    } else {
      this.setState({ dropdownActive: true });
      if (this.filterInput) {
        // Need timeout because there is a first focus from the parent
        setTimeout(() => {
          self.filterInput.focus();
        });
      }
    }
  };

  filterFocus = (): void => {
    const { dropdownActive } = this.state;

    if (!dropdownActive) {
      this.handleClick(true);
    }
  };

  /* add new item */
  manageAddItem = (): void => {
    const { addItemAction } = this.props;

    this.handleClick();

    if (addItemAction) addItemAction();
  };

  checkDisabled = item => {
    const { disabledItems } = this.props;

    if (!disabledItems) return false;

    const itemDisabled = disabledItems.find(element => {
      const compare = this.compare(element, item);

      return compare;
    });

    return itemDisabled;
  };

  renderItem = ({ index, key, style }) => {
    const {
      items,
      itemClassName,

      disableClassName,
      activeClassName,
      itemRendering,
      noCheck,
      checkWrapperClassName,
      itemStyle,
      lg,
    } = this.props;

    const { cursor } = this.state;

    const item = items[index];

    const isActive = this.checkItem(item);

    return (
      <div
        className={styles(
          'item',
          itemClassName,
          !noCheck && 'with-icon',
          isActive && 'active',
          isActive && activeClassName,
          cursor === index && 'cursor-hover',
          this.checkDisabled(item) && (disableClassName || 'disabled'),
        )}
        style={{
          ...style,
          ...itemStyle,
        }}
        ref={element => {
          // style come from react virtualized
          if (!style) this.handleHoverRef(element, key);
        }}
        key={key}
        onClick={() => this.selectSuggestion(item)}
      >
        {itemRendering ? (
          itemRendering({ ...item, active: isActive })
        ) : (
          <TextItem isHtml tag="none" item={(item.label && item.label[lg]) || item} />
        )}
        {!noCheck && isActive && (
          <div className={styles('check-wrapper', checkWrapperClassName)}>
            <FaCheck />
          </div>
        )}
      </div>
    );
  };

  render(): JSX {
    const { cursor, dropdownActive } = this.state;

    const {
      placeholder,
      small,
      forcedOpen,
      className,
      children,
      filter,
      items,
      right,
      // customization
      itemsClassName,
      itemsStyle,
      itemsContentWrapperClassName,
      itemsContentWrapperStyle,
      itemsWrapperClassName,
      itemsWrapperStyle,
      activeClassName,
      filterClassName,
      addItem,
      addItemLabel,
      darkMode,
      virtualized,
      selectAll,
      selectAllValues,
      decal,
    } = this.props;

    const useVirtualized = virtualized || items.length > 100;

    return (
      <div
        className={styles(
          'Suggestions',
          decal && 'decal',
          dropdownActive && 'active',
          dropdownActive && activeClassName,
          className,
        )}
        ref={this.setWrapperRef}
      >
        <div
          className={styles('children-wrapper')}
          onMouseDown={(): void => this.handleClick(forcedOpen)}
        >
          {children}
        </div>
        <div
          className={styles(
            'items-content-wrapper',
            itemsContentWrapperClassName,
            right && 'right',
            filter && 'with-filter',
          )}
          style={itemsContentWrapperStyle}
        >
          <div className={styles('items', itemsClassName, small && 'small')} style={itemsStyle}>
            {filter ? (
              <input
                ref={(filterInput): void => {
                  if (filterInput) this.filterInput = filterInput;
                }}
                className={styles('filter', filterClassName, darkMode && 'dark')}
                name="filter_input"
                placeholder={placeholder || 'filtrer...'}
                autoComplete="off"
                onFocus={this.filterFocus}
                onChange={(e): void => this.onFilterChange(e)}
              />
            ) : (
              false
            )}
            {useVirtualized && (
              <AutoSizer disableHeight>
                {({ width }) => (
                  <List
                    scrollToIndex={cursor}
                    ref={this.listRef}
                    className={styles('items-wrapper', itemsWrapperClassName)}
                    height={small ? 37 * 6 : 47 * 5}
                    rowCount={items.length}
                    rowHeight={small ? 37 : 47}
                    rowRenderer={this.renderItem}
                    width={width}
                  />
                )}
              </AutoSizer>
            )}
            {!useVirtualized && (
              <div
                className={styles('items-wrapper', 'scrollable', itemsWrapperClassName)}
                style={itemsWrapperStyle}
                ref={(itemWrapper): void => {
                  if (itemWrapper) this.itemWrapper = itemWrapper;
                }}
              >
                {selectAll && (
                  <div
                    className={styles(
                      'item',
                      'with-icon',

                      'cursor-hover',
                    )}
                    onClick={() => selectAllValues()}
                  >
                    <TextItem isHtml item="Select All" />
                  </div>
                )}
                {items && items.map((item, key): JSX => this.renderItem({ index: key, key }))}
                {addItem && (
                  <div className={styles('item', 'add')} onClick={(): void => this.manageAddItem()}>
                    <TextItem path={addItemLabel} />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
