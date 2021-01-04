import * as React from 'react';
import classNames from 'classnames/bind';

import findIndex from 'lodash/findIndex';
import orderBy from 'lodash/orderBy';
import get from 'lodash/get';

import TextItem from 'components/items/TextItem';
import Button from 'components/items/Button';
import ReactPaginate from 'react-paginate';
import { withRouter } from 'react-router-dom';
import qs from 'query-string';
import { IoIosArrowDown } from 'react-icons/io';
import styleIdentifiers from './customTable.scss';

const styles = classNames.bind(styleIdentifiers);

export interface CustomTableProps {
  noCheckbox?: boolean;
  items: any[];
  headers: object[];
  loaded?: boolean;
  loading?: boolean;
  customOrder?: Function;
  itemProps?: {};
  noShadow?: boolean;
  location: {};
  history: {};
  url?: string;
  loadFunc?: Function;
  handleFilters?: Function;
  subhead?: React.Element<any>;
  actions?: React.Element<any>;
  legend?: React.Element<any>;
  actionDelete?: Function;
  title?: string;
  loaded?: boolean;
  loading?: boolean;
  loadMore?: Function;
  noMore?: boolean;
  itemProps?: {};
  // filters
  displayFilters?: boolean;
  filtersProps?: {};
  filtersInitialValues?: {};
  // reset
  pagination?: {};
  currentPage?: number;
  noResultMessage?: string;
}

interface CustomTableState {
  list: any[];
  filters: {};
  masterCheck: boolean;
  order: string;
  asc: boolean;
}

function CustomTable(
  ItemComponent: React.ComponentType<any>,
  FiltersForm?: React.ComponentType<any>,
) {
  class Table extends React.Component<CustomTableProps, CustomTableState> {
    constructor(props: CustomTableProps) {
      super(props);

      const { location } = props;

      this.state = {
        // used to check the item internaly (could have used the store as well)
        list: [],
        filters: qs.parse(location.search),
        masterCheck: false,
        order: '',
        asc: true,
      };
    }

    componentDidMount() {
      this.updateList();
      this.loadData();
    }

    componentDidUpdate(prevProps: CustomTableProps) {
      this.updateList(prevProps);
      this.onUpdate(prevProps);
    }

    // Could be done in reducers
    onItemClick = (id: number, targetValue?: boolean) => {
      const list = this.items();

      const index = findIndex(list, { id });
      const newElement = list[index];

      let masterCheck = true;
      // toggle part
      if (targetValue !== undefined) newElement.checked = targetValue;
      else if (newElement.checked === true) {
        newElement.checked = false;
      } else {
        newElement.checked = true;
      }
      list.splice(index, 1, newElement);

      if (!targetValue) {
        list.forEach(element => {
          if (!element.checked) masterCheck = false;
        });
        this.setState({ list, masterCheck });
      }
    };

    onUpdate = (prevProps?: CustomTableProps) => {
      const { location } = this.props;

      if (!prevProps || location !== prevProps.location) {
        this.setState(
          {
            filters: qs.parse(location.search),
          },
          this.loadData,
        );
      }
    };

    getCheckedItems = () => {
      const list = this.items();

      const data = [];
      if (!list || !Array.isArray(list)) return data;
      list.forEach(element => {
        if (element.checked) data.push(element);
      });

      return data;
    };

    // Update location
    setFilters = filters => {
      const { history, url } = this.props;

      history.push({
        pathname: url,
        search: qs.stringify(filters),
      });
    };

    // Update the list displayed internaly
    updateList = (prevProps?: {}) => {
      const { items } = this.props;
      if (items && (!prevProps || prevProps.items !== items)) {
        this.setState({
          list: items,
        });
      }
    };

    loadData = () => {
      const { loadFunc } = this.props;

      const { filters } = this.state;
      if (loadFunc) {
        loadFunc(filters);
      }
    };

    applyFilters = values => {
      const { filters } = this.state;
      const { handleFilters } = this.props;

      const newFilters = handleFilters ? handleFilters(values, filters) : values;

      if (newFilters) this.setFilters(newFilters);
    };

    loadPage = page => {
      const currentPage = parseInt(page.selected, 10) + 1;

      const { filters } = this.state;

      const newFilters = {
        ...filters,
        page: currentPage,
      };

      this.setFilters(newFilters);
    };

    masterCheck = () => {
      const { masterCheck } = this.state;

      const list = this.items();
      list.forEach(element => {
        this.onItemClick(element.id, !masterCheck);
      });

      this.setState({
        masterCheck: !masterCheck,
      });
    };

    // Get internal list
    items = () => {
      const { list } = this.state;
      return list || [];
    };

    // Get actually dispalyed data
    filtered = () => {
      const { order, asc } = this.state;
      const { customOrder } = this.props;

      const list = this.items();

      const sorted = orderBy(
        list,
        (item: {}) => {
          if (customOrder) return customOrder(item, order) || false;
          const val = get(item, order);
          if (!isNaN(val)) return parseFloat(val);
          return val || false;
        },
        [asc ? 'asc' : 'desc'],
      );

      return sorted;
    };

    orderBy = (field?: string) => {
      const { order, asc } = this.state;

      if (field && order !== field) {
        this.setState({
          order: field,
          asc: true,
        });
      } else {
        this.setState({
          asc: !asc,
        });
      }
    };

    listHeadItem = (name: string, field?: string) => {
      const { order, asc } = this.state;
      if (field) {
        return (
          <div className={styles('sortable-head')} onClick={() => this.orderBy(field)}>
            <TextItem path={name} />
            {order === field && (
              <div className={styles('arrow', !asc && 'inverted')}>
                <IoIosArrowDown />
              </div>
            )}
          </div>
        );
      }
      return (
        <div className={styles('not-sortable-head')}>
          <TextItem path={name} />
        </div>
      );
    };

    render() {
      const {
        noCheckbox,
        subhead,
        actions,
        actionDelete,
        headers,
        title,
        loaded,
        loading,
        loadMore,
        itemProps,
        pagination,
        noShadow,
        currentPage,
        noResultMessage,
      } = this.props;
      const { masterCheck, filters } = this.state;
      const list = this.filtered();

      const checkedList = this.getCheckedItems();
      return (
        <div className={styles('CustomTable')}>
          {title && (
            <div className={styles('head')}>
              <div className={styles('title')}>
                <h1>
                  <TextItem path={title} />
                </h1>
                {subhead && <div className={styles('subhead')}>{subhead}</div>}
              </div>
              <div className={styles('actions')}>
                {!checkedList || checkedList.length === 0 ? (
                  actions
                ) : (
                  <Button
                    noMargin
                    relative
                    shadow
                    className={styles('delete')}
                    color="red"
                    label="general.messages.deleteSelection"
                    action={() => actionDelete && actionDelete(checkedList)}
                  />
                )}
              </div>
            </div>
          )}
          {FiltersForm && (
            <div className={styles('filters')}>
              <FiltersForm onSubmit={this.applyFilters} initialValues={filters} />
            </div>
          )}
          <div className={styles('listing', noShadow && 'no-shadow')}>
            {loaded && list.length === 0 && (
              <div className={styles('no-result')}>
                <TextItem path={noResultMessage || 'admin.messages.noResult'} />
              </div>
            )}
            {list.length > 0 && (
              <table>
                <thead>
                  <tr>
                    <th
                      onClick={this.masterCheck}
                      className={styles('box-wrapper', noCheckbox && 'small')}
                    >
                      {!noCheckbox && <div className={styles('box', masterCheck && 'checked')} />}
                    </th>
                    {headers.map((item, key) => (
                      <th key={item.title || key}>{this.listHeadItem(item.title, item.key)}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {list.map((item, key) => (
                    <ItemComponent
                      action={() => this.onItemClick(item.id)}
                      item={item}
                      key={item.id || key}
                      noCheckbox={noCheckbox}
                      {...itemProps}
                    />
                  ))}
                </tbody>
              </table>
            )}
            {loading && (
              <div className={styles('loading')}>
                <TextItem path="general.messages.loading" />
              </div>
            )}
          </div>
          {loadMore && pagination && pagination.current_page < pagination.last_page && (
            <div className={styles('buttons')}>
              <Button
                noMargin
                relative
                shadow
                color="blue"
                label="Charger plus"
                action={() => loadMore(pagination)}
              />
            </div>
          )}
          {pagination && pagination.last_page > 1 && (
            <ReactPaginate
              pageCount={pagination.last_page}
              pageRangeDisplayed={3}
              marginPagesDisplayed={1}
              // initialPage={parseInt(currentPage - 1, 10)}
              forcePage={currentPage && parseInt(currentPage - 1, 10)}
              disableInitialCallback
              breakLabel="..."
              onPageChange={this.loadPage}
              previousLabel="Précédent"
              nextLabel="Suivant"
              containerClassName={styles('pages')}
              pageClassName={styles('page')}
              activeClassName={styles('active')}
              disabledClassName={styles('disabled')}
            />
          )}
        </div>
      );
    }
  }
  return withRouter(Table);
}

export default CustomTable;
