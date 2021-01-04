import * as React from 'react';
import classNames from 'classnames/bind';
import TextItem from 'components/items/TextItem';
// import Fuse from 'fuse.js';

import FormElement from 'components/structure/FormElement';
import FieldWrapper from 'components/structure/FieldWrapper';

import Suggestions from 'components/structure/Suggestions';

import find from 'lodash/find';
import lodashFilter from 'lodash/filter';
import findIndex from 'lodash/findIndex';
import lodashOrderBy from 'lodash/orderBy';

import remove from 'lodash/remove';
import get from 'lodash/get';
import forEach from 'lodash/forEach';

import {
  getContent,
  compareItems,
  clone,
  getTextFromObject,
  getValueFromObject,
} from 'store/utils/helper';
import { content as localeContent } from 'config/content';

import { config } from 'config/general';

import { FaAngleDown, FaTimes } from 'react-icons/fa';
import styleIdentifiers from './customSelect.scss';

const styles = classNames.bind(styleIdentifiers);

interface Item {
  type?: string;
  value: string;
  description?: string;
  position?: number;
  id?: string;
  text?: string;
  label?: string;
}

export interface StateProps {
  content: {};
  lg: string;
}

export interface DispatchProps {
  dialogShow: Function;
  load: Function;
  update: Function;
  add: Function;
  reset: Function;
  deleteItem: Function;
}

export interface OwnProps {
  // open or not
  active?: boolean;
  // forced orderBy
  orderBy?: string;
  // No default order by
  noOrder?: boolean;
  // limit
  limit?: number;
  // additional info
  info?: string;
  // List of items provided
  items: Item[];
  // Multi select
  multiple: boolean;
  multipleSelection: boolean;
  // Add filter to suggesstion
  filter: boolean;
  // Placeholder value
  placeholder: string;
  // Suggestion placeholder
  filterPlaceholder?: string;
  // Item rendering function
  asObject?: boolean;
  // showItems,
  itemRendering?: Function;
  // hide the ball with amount
  hideIndication?: boolean;
  // no arrow
  hideArrow?: boolean;
  // show values underneath
  showValues?: boolean;
  // make suggestions small
  smallSuggestion?: boolean;
  // from store
  content: {};
  // placeholder
  placeholderClassName?: string;
  placeholderStyle?: {};
  // fixed element (arrow)
  fixedElementClassName?: string;
  // additional data so send to loadApiData
  apiPayload?: {};
  // function to call to retrieve dynamic data (according to the filter value)
  loadApiData?: Function;
  // Copy the object if a linked api to call is given (with loadApiData)
  copyObject?: boolean;
  // Do not copy the object for no api call list (default is copy while for api is not copy)
  noCopyObject: boolean;
  // binding api data to state items of the custom select
  modelValues?: {};
  // language
  lg?: string;
  prio?: string[];
  last?: string[];
  // default value
  defaultValue?: any;
  // Do not use api with filter change
  noFilterApi: boolean;
  hideValues: boolean;
  // Reset if list is Updated
  resetOnListChange: boolean;
  hideLabelOnSelected: boolean;
  singleValueAsArray: boolean;
  // items who are disable and not clickable
  disabledItems: any[];
  // items who are removed from the list
  removedValues?: any[];
  // items who are included from the list
  includedValues?: any[];

  disableClassName: string;
  disable: boolean;
  disabled: boolean;
  // other props
  addItem?: boolean;
  addItemLabel?: string;
  addItemAction?: Function;
  // if background dark, white placeholder
  darkMode?: boolean;
  // Remove not matched, values
  onlyItemsValues?: boolean;
  // noMountApi
  noMountApi: boolean;
  filterWithFuse?: boolean; // use filter with fuse.js
  filterFunc?: Function; // Custom filter function
  checkWrapperClassName: string;
  selectAll?: boolean;
  // Do not allow cancelation of a selection
  noCancel?: boolean;
  // Do not display check icon for checked items in suggestion
  noCheck?: boolean;
  checkFunction?: Function;
  onFocus?: Function;
  onBlur?: Function;
}

type CustomSelectProps = StateProps & DispatchProps & OwnProps;

interface CustomSelectState {
  dropdownActive: boolean;
  apiLoaded: boolean;
  value: {} | any[] | null;
  items: object[];
  cursor: number;
  filterValue?: string;
}

export default class CustomSelect extends React.Component<CustomSelectProps, CustomSelectState> {
  constructor(props: CustomSelectProps) {
    super(props);

    const { active } = this.props;

    const localeList = this.constructLocaleList();

    this.state = {
      value: this.getValue(localeList),
      dropdownActive: active || false,
      cursor: -1,
      apiLoaded: false,
      items: localeList,
    };
  }

  componentDidMount(): void {
    // not called in ssr
    const { apiPayload, noMountApi } = this.props;

    if (apiPayload && !noMountApi) this.loadDataFromApi();
  }

  componentDidUpdate = (prevProps: CustomSelectProps): void => {
    const { input, items, lg, removedValues, includedValues } = this.props;

    if (items && prevProps.items !== items) {
      this.updateItems();
    }
    if (prevProps.removedValues !== removedValues) {
      this.updateItems();
    }
    if (prevProps.includedValues !== includedValues) {
      this.updateItems();
    }
    if (prevProps.lg !== lg) {
      this.updateItems();
    }
    if (input.value !== prevProps.input.value) {
      this.handleValue();
    }
  };

  updateItems = () => {
    const list = this.constructLocaleList();

    this.setState(
      {
        items: list,
      },
      (): void => this.handleValue(),
    );
  };

  extractApiData = element => {
    const { copyObject } = this.props;

    const { modelValues, content, lg, valueKey } = this.props;

    const text = getTextFromObject(element, modelValues, content, lg);
    const value = getValueFromObject(element, modelValues, valueKey);

    let itemList = {
      [config.idKey]: value,
      value,
      text,
      latinize: text && this.latinizeText(text),
    };
    if (copyObject) {
      itemList = {
        ...element,
        ...itemList,
      };
    }

    return itemList;
  };

  // Construct homogen list for the custom select with tuple text, value and id (for data from api)
  constructApiList = (values: any[], handleValue?: boolean): void => {
    const { resetOnListChange, removedValues, includedValues } = this.props;
    const list = [];

    values.forEach((element): void => {
      const it = this.extractApiData(element);

      if (removedValues?.indexOf(it.value) < 0) {
        list.push(it);
      }
      if (includedValues?.indexOf(it.value) >= 0) {
        list.push(it);
      }
      if (!removedValues && !includedValues) list.push(it);
    });

    this.setState({ items: list }, (): void => {
      if (handleValue) this.handleValue();

      if (resetOnListChange) this.resetValue();
    });
  };

  // Construct an homogen list for the custom select with tuple text and value
  constructLocaleList = (): object[] => {
    const {
      items,
      apiPayload,
      lg,
      valueKey,
      content,
      copyObject,
      modelValues,
      noCopyObject,
      removedValues,
      includedValues,
    } = this.props;
    let listItems;

    const localeList = [];

    if (typeof items === 'string' && content) {
      listItems = getContent(content, items);
    } else {
      listItems = clone(items);
    }
    if (!Array.isArray(listItems) && typeof listItems === 'object') {
      listItems = Object.values(listItems);
    }
    if (Array.isArray(listItems)) {
      for (let i = 0; i < listItems.length; i++) {
        const original = clone(listItems[i]);

        if (typeof original === 'string') {
          localeList.push({
            value: original,
            label: original,
          });
          continue;
        }

        let it;
        // Handle api data
        if (apiPayload) it = this.extractApiData(original);
        else {
          it = copyObject || !noCopyObject ? original : {};
          if (typeof it !== 'object') continue;

          it.text = getTextFromObject(original, modelValues, content, lg);
          it.value = getValueFromObject(original, modelValues, valueKey);

          if (!it.value) {
            console.warn('A custom select items has no value', it);
          }
        }

        if (removedValues?.indexOf(it.value) < 0) {
          localeList.push(it);
        }
        if (includedValues?.indexOf(it.value) >= 0) {
          localeList.push(it);
        }
        if (!includedValues && !removedValues) localeList.push(it);
      }
    }

    forEach(localeList, (el): void => {
      el.latinize = this.latinizeText(el.text);
    });

    return localeList;
  };

  loadDataFromApi = (payload): void => {
    const { loadApiData, apollo, apiPayload } = this.props;

    if (!loadApiData) return;

    let apiConfig = payload || apiPayload;

    if (apollo) {
      apiConfig = this.createApolloApiConfig(apiConfig);
    }

    const apiData = {
      ...apiConfig,
      callback: (result): {} => {
        this.setState({
          apiLoaded: true,
        });
        this.constructApiList(result, true);
      },
    };

    loadApiData(apiData);
  };

  createApolloApiConfig = apiPayload => {
    // Do not seem to be used
    const { list } = this.state;
    const { modelValues, lg, inputs, noHttpHeader } = this.props;
    const data = {};

    const headers = [];

    if (!modelValues) {
      console.warn('no model values provided for apollo config', apiPayload);
      return null;
    }

    for (let index = 0; index < Object.values(modelValues).length; index++) {
      const element = Object.values(modelValues)[index];
      if (element.value && element.translatable) {
        headers.push({ key: `${element.value}.${lg}` });
      } else {
        headers.push({ key: element });
      }
    }

    data.options = {
      apollo: true,
      resourceList: apiPayload && (apiPayload.resource || apiPayload.resourceType),
      headers,
      noHttpHeader,
    };

    data.inputs = inputs;

    if (apiPayload && apiPayload[config.selectSearchParameter]) {
      data.inputs = data.inputs || {};
      // Apply search to inputs
      data.inputs[config.selectSearchParameter] = apiPayload[config.selectSearchParameter];
    }

    if (!list) data.skip = 0;

    return data;
  };

  // To load data dynamicaly
  filterApi = (text: string): {} => {
    const { apiPayload } = this.props;

    this.setState({ filterValue: text });
    if (!apiPayload) return;

    const payload = { ...apiPayload, [config.selectSearchParameter]: text || '' };

    this.loadDataFromApi(payload);
  };

  latinizeText = (text: string): string =>
    text && text.normalize ? text.normalize('NFD').replace(/[\u0300-\u036f]/g, '') : '';

  resetValue = (): void => {
    this.handleChange(null);
    this.setState({ value: null });
  };

  getValue = (items: any[], filterValue): string => {
    const {
      input,
      multiple,
      multipleSelection,
      defaultValue,
      loadApiData,
      asObject,
      onlyItemsValues,
      checkFunction,
    } = this.props;

    const isMultiple = multiple || multipleSelection;

    const value = input && input.value;

    if (!value && defaultValue) {
      if (input) this.handleChange(defaultValue);
      return '';
    }

    const compareFunction = checkFunction || compareItems;

    let stateValue;
    let inputValue;

    if (isMultiple && Array.isArray(value)) {
      stateValue = [];
      inputValue = [];

      // Loop on actual values
      for (let j = 0; j < value.length; j++) {
        const inputItem = value[j];

        let found = false;
        // loop on suggestion available
        for (let i = 0; i < items.length; i++) {
          const item = items[i];

          if (loadApiData && asObject) {
            // if filter written => keep stateValue that do no match the filter
            if (compareFunction(this.extractApiData(inputItem), item)) {
              found = true;
              stateValue.push(item);
              if (onlyItemsValues) {
                inputValue.push(inputItem);
              }
            }
          }
          // if filter written => keep stateValue that do no match the filter
          else if (compareFunction(inputItem, item)) {
            found = true;
            stateValue.push(item);
            if (onlyItemsValues) {
              inputValue.push(inputItem);
            }
          }
        }
        if (filterValue && !found) {
          stateValue.push(inputItem);
        }
      }
      // no data yet
      if (items.length === 0) {
        stateValue = value;
      }
    } else {
      // take as default
      stateValue = value;
      // important for default value
      if (loadApiData && asObject) stateValue = this.extractApiData(value);

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (compareFunction(value, item)) {
          stateValue = item;
          // first occurence has priority
          break;
        }
      }
    }

    if (inputValue && inputValue.length > 0) {
      this.handleChange(inputValue);
    }

    return stateValue;
  };

  handleValue = (): void => {
    const { items, filterValue } = this.state;

    this.setState({
      value: this.getValue(items, filterValue),
    });
  };

  hasValue = (): boolean => {
    const { input, multiple, multipleSelection } = this.props;

    const isMultiple = multiple || multipleSelection;

    if (!isMultiple && input.value) {
      return true;
    }
    if (isMultiple && input.value && input.value.length > 0) {
      return true;
    }
    return false;
  };

  handleFocus = (e: Event): void => {
    const { disable, input, onFocus } = this.props;

    if (disable) return;

    // can pass an onBlur function
    if (onFocus) onFocus(e);

    input.onFocus();

    this.toggleClick(true);
  };

  handleChange = value => {
    const { input, onChange } = this.props;

    input.onChange(value ? clone(value) : value);

    if (onChange) onChange(value);
  };

  handleBlur = (e: Event): void => {
    const { input, onBlur } = this.props;

    // can pass an onBlur function
    if (onBlur) onBlur(e);

    // Passing value to onBlur change value for redux-form (need to check for final form)
    input.onBlur();
  };

  onMouseEnter = () => {
    const { hover } = this.props;
    if (!hover) return;
    this.toggleClick(true);
  };

  onMouseLeave = () => {
    const { hover } = this.props;
    if (!hover) return;
    this.toggleClick(false);
  };

  // Toggle click is called from the child
  toggleClick = (forcedValue?: boolean): void => {
    const { dropdownActive, apiLoaded } = this.state;
    const { apiPayload, disable, disabled } = this.props;
    let targetValue;
    if (forcedValue === true || forcedValue === false) targetValue = forcedValue;
    else targetValue = !dropdownActive;

    // avoid double call (no used anymore)
    if (this.disableDoubleCall) {
      return;
    }

    if (disable || disabled) return;

    this.setState({
      dropdownActive: targetValue,
    });

    if (targetValue && apiPayload && !apiLoaded) {
      this.loadDataFromApi(apiPayload);
    }
  };

  // TODO: take into accoubt asObject, ...
  selectAllValues = (): void => {
    const {
      input,
      asObject,
      multiple,
      multipleSelection,
      singleValueAsArray,
      noCancel,
      loadApiData,
    } = this.props;

    const isMultiple = multiple || multipleSelection;
    const items = this.orderedData();

    const { value } = this.state;

    const current = [];

    if (value.length < items.length) {
      // locale find item

      items.forEach(item => {
        current.push(item.value && item.value.slice());
      });

      this.handleChange(current);
    } else {
      this.handleChange(current);
    }
  };

  selectValue = (item: {}): void => {
    const {
      input,
      asObject,
      multiple,
      multipleSelection,
      singleValueAsArray,
      noCancel,
      loadApiData,
      checkFunction,
    } = this.props;

    const isMultiple = multiple || multipleSelection;

    const compareFunction = checkFunction || compareItems;

    const items = this.orderedData();
    const cursorPlace = findIndex(items, (it): boolean => compareFunction(it, item));

    if (!isMultiple) {
      let current = input.value;
      if (loadApiData && asObject) {
        current = this.extractApiData(current);
      }
      if (!noCancel && (current === item.value || compareFunction(current, item))) {
        this.handleChange(null);
        this.setState({ cursor: -1 });
      } else {
        const newValue = (asObject && item) || (singleValueAsArray && [item.value]) || item.value;

        this.handleChange(newValue);
        this.setState({ cursor: cursorPlace });
      }
      this.toggleClick();
    } else {
      // locale find item
      const findItem = it => {
        let inputValue = it;
        // handle api value
        if (loadApiData && asObject) {
          inputValue = this.extractApiData(it);
        }

        if (asObject) return compareFunction(inputValue, item);

        return inputValue === item.value;
      };

      const current = (input.value && Array.isArray(input.value) && input.value.slice()) || [];

      const foundItem = find(current, findItem);

      if (!foundItem) {
        current.push(asObject ? item : item.value);
      } else {
        remove(current, findItem);
      }

      this.handleChange(current);
      this.setState({ cursor: cursorPlace });
    }
  };

  dataFiltered = (): object[] => {
    const { filterWithFuse, apiPayload, noFilterApi, filterFunc } = this.props;
    let { filterValue } = this.state;

    const { items } = this.state;

    // if (filterWithFuse) return this.fuseDataFiltered();

    if (apiPayload && !noFilterApi) return items;

    if (filterFunc) return filterFunc(items);

    const newItems = lodashFilter(items, (it): boolean => {
      if (filterValue) {
        filterValue = filterValue.toLowerCase();
      } else return true;

      const keys = Object.keys(it);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (it[key] && it[key].toLowerCase && it[key].toLowerCase().indexOf(filterValue) >= 0) {
          return true;
        }
      }
      return false;
    });

    return newItems;
  };

  // Breaks on IE => should be moved to the parent
  /*
  fuseDataFiltered = (): void => {
    const { filterWithFuse } = this.props;
    const { items, filter } = this.state;

    if (!filter) {
      return items;
    }

    let results = [];
    const maxPatternLength = filterWithFuse.maxPatternLength || 20;

    const options = {
      minMatchCharLength: filterWithFuse.minMatchCharLength || 1,
      shouldSort: filterWithFuse.shouldSort || true,
      treshold: filterWithFuse.treshold || 0.4,
      location: filterWithFuse.location || 10,
      distance: filterWithFuse.distance || 20,
      maxPatternLength,
      keys: filterWithFuse.keys || ['text', 'value'],
      // findAllMatches: true,
    };

    const fuse = new Fuse(items, options);

    results = fuse.search(filter.substr(0, maxPatternLength));

    results = results.splice(0, 20);

    const filtered = [];

    results.forEach(function(result) {
      if (result.item) filtered.push(result.item);
    });

    return filtered;
  };
  */

  filterChange = (value?: string): void => {
    this.setState({
      filterValue: value,
    });
  };

  orderedData = (): object[] => {
    const { noOrder, orderBy, orderFunc, prio, last, limit } = this.props;

    const order = orderBy;

    const items = this.dataFiltered();

    if (orderFunc) {
      return orderFunc(items);
    }

    if (noOrder) return items;

    let ordered = lodashOrderBy(items, order || ['latinize', 'text']);

    if (prio && Array.isArray(prio)) {
      const arrayPrio = [];
      prio.forEach((element): void => {
        const inOrder = find(ordered, ['value', element]);
        const index = findIndex(ordered, inOrder);
        if (index && inOrder) {
          ordered.splice(index, 1);
          arrayPrio.push(inOrder);
        }
      });
      ordered = arrayPrio.concat(ordered);
    }

    if (last && Array.isArray(last)) {
      const arrayLast = [];
      last.forEach((element): void => {
        const inOrder = find(ordered, ['value', element]);
        const index = findIndex(ordered, inOrder);
        if (index && inOrder) {
          ordered.splice(index, 1);
          arrayLast.push(inOrder);
        }
      });
      ordered = ordered.concat(arrayLast);
    }

    if (limit) {
      return ordered.slice(0, limit);
    }

    return ordered;
  };

  renderFixedElements = (): JSX => {
    const {
      multiple,
      multipleSelection,
      hideIndication,
      fixedElementClassName,
      hideArrow,
      hideValues,
    } = this.props;
    const { value } = this.state;

    const isMultiple = multiple || multipleSelection;
    return (
      <div className={styles('fixed-elements', fixedElementClassName)}>
        {!hideIndication &&
          isMultiple &&
          Array.isArray(value) &&
          (hideValues ? value.length > 0 : value.length > 1) && (
            <div className={styles('indication')}>{value.length}</div>
          )}
        {!hideArrow && (
          <div className={styles('arrow')}>
            <FaAngleDown />
          </div>
        )}
      </div>
    );
  };

  renderValue = (stateValue: object): JSX => {
    // value is a state value and text and value should be extracted
    // we should alway display value.text
    if (stateValue?.text) return <TextItem item={stateValue.text} />;

    return <TextItem item={stateValue} />;

    // // Special case if data are already there
    // if (modelValues && !isEmpty(modelValues)) {
    //   const text = getTextFromObject(value);

    //   if (text) return <TextItem item={text} />;
    //   // Here data are already here but not respecting the modelValues
    //   // It can tipically be a list of ID
    //   // Therefore the best if to display the id
    // }

    // if (value && value.label && value.label[lg]) {
    //   return <TextItem item={value.label[lg]} />;
    // }

    // return <TextItem item={value} />;
  };

  render(): JSX {
    const {
      // Styling
      // global
      className,
      // Label
      // Value
      fieldWrapperClassName,
      contentWrapperClassName,
      activeWrapperClassName,
      valueClassName,
      centerValue,
      // suggestion
      itemsContentWrapperClassName,
      itemsContentWrapperStyle,
      itemsClassName,
      itemsStyle,
      itemsWrapperClassName,
      itemsWrapperStyle,
      itemClassName,
      itemStyle,
      activeClassName,
      checkWrapperClassName,
      // Configuration
      effect,
      small,
      multiple,
      multipleSelection,
      withBorder,
      withValueBorder,
      showValues,
      // Do not use filter api
      noFilterApi,
      // custom display of items (both suggestion and bottom)
      itemRendering,
      placeholder,
      // suggestion
      smallSuggestion,
      filter,
      filterPlaceholder,
      // placeholder
      placeholderClassName,
      placeholderStyle,
      hideArrow,
      hideIndication,
      apiPayload,
      hideValues,
      filterClassName,
      // disable props
      disabled,
      disable,
      disableItem,
      disabledItems,
      disableClassName,
      addItem,
      addItemLabel,
      addItemAction,
      //
      noCheck,
      darkMode,
      // right
      right,
      // content
      content,
      lg,
      onlyRenderingItemlist,
      selectAll,
      checkFunction,
      decal,
    } = this.props;

    const { value, dropdownActive, cursor } = this.state;

    const list = this.orderedData();

    const hasValue = this.hasValue();

    const isDisabled = disable || disabled;

    let type;

    if (withBorder) type = 'with-border';
    else if (withValueBorder) type = 'with-value-border';
    else type = 'with-border-bottom';

    const isMultiple = multiple || multipleSelection;

    const styling = styles(
      'select-content-wrapper',
      type,
      hideArrow && 'hide-arrow',
      hideIndication && 'hide-indication',
      isMultiple && 'multiple',
      centerValue && 'centered',
      type === 'with-border' && contentWrapperClassName,
      type !== 'with-border' && valueClassName,
      type !== 'with-border' && 'select-value',
    );

    const filterTextPlaceholder =
      getContent(content, filterPlaceholder, lg) ||
      getContent(localeContent, filterPlaceholder, lg) ||
      filterPlaceholder;

    const disabledList = disabledItems || disableItem;

    return (
      <FormElement
        {...this.props}
        className={styles('CustomSelect', className, dropdownActive && 'active')}
      >
        <div
          className={styles('custom-select-wrapper')}
          tabIndex={!filter ? '0' : undefined}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
        >
          <Suggestions
            lg={lg}
            checkFunction={checkFunction}
            externalActive={dropdownActive}
            externalCursor={cursor}
            placeholder={filterTextPlaceholder}
            small={smallSuggestion}
            items={list}
            right={right}
            filter={filter}
            multiple={isMultiple}
            value={value}
            selectValue={this.selectValue}
            selectAll={selectAll}
            selectAllValues={this.selectAllValues}
            filterChange={apiPayload && !noFilterApi ? this.filterApi : this.filterChange}
            toggleClick={this.toggleClick}
            // styling
            checkWrapperClassName={checkWrapperClassName}
            itemRendering={itemRendering}
            itemsClassName={itemsClassName}
            itemsStyle={itemsStyle}
            itemsContentWrapperClassName={itemsContentWrapperClassName}
            itemsContentWrapperStyle={itemsContentWrapperStyle}
            itemsWrapperClassName={itemsWrapperClassName}
            itemsWrapperStyle={itemsWrapperStyle}
            itemClassName={itemClassName}
            activeClassName={activeClassName}
            filterClassName={filterClassName}
            itemStyle={itemStyle}
            disabledItems={disabledList}
            disableClassName={disableClassName}
            addItem={addItem}
            addItemLabel={addItemLabel}
            addItemAction={addItemAction}
            noCheck={noCheck}
            darkMode={darkMode}
            decal={decal || (!withBorder && !withValueBorder)}
          >
            <FieldWrapper
              {...this.props}
              small={small}
              fieldWrapperClassName={styles(
                'select-wrapper',
                small && 'small',
                isDisabled && 'disabled',
                fieldWrapperClassName,
                hasValue && activeWrapperClassName,
              )}
              contentWrapperClassName={
                type === 'with-border' ? styling : styles(contentWrapperClassName)
              }
              valueClassName={
                type !== 'with-border' ? styling : styles('select-value', valueClassName)
              }
              secondChildren={withBorder && this.renderFixedElements()}
              hasValue={hasValue}
            >
              {(!hasValue || hideValues) && !effect && placeholder && (
                <TextItem
                  className={styles('placeholder', placeholderClassName)}
                  path={placeholder}
                  style={placeholderStyle}
                />
              )}

              {hasValue &&
                !isMultiple &&
                (itemRendering && !onlyRenderingItemlist
                  ? itemRendering(value)
                  : this.renderValue(value))}
              {hasValue && isMultiple && !hideValues && (
                <>
                  <div className={styles('values-wrapper')}>
                    {Array.isArray(value) &&
                      value.map(
                        (it, index): JSX => (
                          <React.Fragment key={it.value || index}>
                            {index > 0 && <span>,&nbsp;</span>}
                            {itemRendering ? itemRendering(it) : this.renderValue(it)}
                          </React.Fragment>
                        ),
                      )}
                  </div>
                </>
              )}
              {!withBorder && this.renderFixedElements()}
            </FieldWrapper>
          </Suggestions>
        </div>
        {isMultiple && showValues && value && (
          <div className={styles('values-list')}>
            {Array.isArray(value) &&
              value.map(
                (item, key): JSX => (
                  <div key={item.id || item.key || key} className={styles('value-item')}>
                    <TextItem item={item} />
                    <div className={styles('delete')} onClick={(): void => this.selectValue(item)}>
                      <FaTimes />
                    </div>
                  </div>
                ),
              )}
          </div>
        )}
      </FormElement>
    );
  }
}
