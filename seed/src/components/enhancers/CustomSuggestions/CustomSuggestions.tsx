import * as React from 'react';
import classNames from 'classnames/bind';
import Suggestions from 'components/structure/Suggestions';

import find from 'lodash/find';

import styleIdentifiers from './customSuggestions.scss';

const styles = classNames.bind(styleIdentifiers);

export interface CustomSuggestionsProps {
  load?: Function;
  items: object[];
  input: {};
  actionChange?: Function;
  defaultValue: any;
  textKey: string;
  searchValue: any;
  useId?: boolean;
  forcedOpen?: boolean;
  size?: string;
}

interface CustomSuggestionsState {
  searched?: boolean;
  items: object[];
}

function Wrapper(ItemComponent: React.ComponentType<any>) {
  return class CustomSuggestions extends React.Component<
    CustomSuggestionsProps,
    CustomSuggestionsState,
  > {
    constructor(props: CustomSuggestionsProps) {
      super(props);

      this.state = {
        items: [],
      };
    }

    componentDidMount() {
      const { load } = this.props;
      this.handleItems({});
      if (load) load('');
    }

    componentDidUpdate(prevProps: CustomSuggestionsProps) {
      this.handleItems(prevProps);
    }

    onChange = (e: KeyboardEvent) => {
      const { load, input, actionChange, defaultValue, textKey } = this.props;

      const str = e.currentTarget.value;

      if (load) load(str);

      let value;
      if (defaultValue) {
        value = {
          ...defaultValue,
          [textKey || 'name']: str,
        };
      } else {
        value = {
          [textKey || 'name']: str,
        };
      }

      input.onChange(value);

      if (actionChange && !str) actionChange();
    };

    handleItems = (prevProps: {}) => {
      const { items, textKey, searchValue } = this.props;

      const { searched } = this.state;

      if (prevProps.items !== items) {
        const newData = [];
        // from server
        if (items) {
          // handle list
          for (let i = 0; i < items.length; i += 1) {
            const elem = items[i];

            newData.push({
              value: elem.id,
              // text will be displayed
              text: elem[textKey || 'name'],
              ...elem,
              id: elem.id,
            });
          }
          if (searchValue && !searched && items.length > 0) {
            const item = find(newData, it => it[textKey || 'name'] === searchValue);
            if (item) this.selectValue(item, true);
            this.setState({
              items: newData,
              searched: true,
            });
          } else {
            this.setState({
              items: newData,
            });
          }
        } else {
          this.setState({
            items,
          });
        }
      }
    };

    selectValue = (item: {}, disableAction: boolean) => {
      const { input, actionChange, load, useId, textKey } = this.props;

      const value = useId ? item.id : item;

      input.onChange(value);

      if (load) load(item[textKey || 'name']);

      if (actionChange && !disableAction) actionChange(value);
    };

    filteredItems = () => {
      const { items } = this.state;

      return items || [];
    };

    render() {
      const { input, useId, forcedOpen, size, textKey } = this.props;

      return (
        <div className={styles('CustomSuggestions')}>
          <Suggestions
            closeOnSelect
            forcedOpen={forcedOpen}
            selectValue={this.selectValue}
            value={input.value}
            useId={useId}
            size={size}
            items={this.filteredItems()}
          >
            <ItemComponent
              {...this.props}
              input={{
                value: input.value[textKey || 'name'] || '',
              }}
              onChange={this.onChange}
            />
          </Suggestions>
        </div>
      );
    }
  };
}

export default Wrapper;
