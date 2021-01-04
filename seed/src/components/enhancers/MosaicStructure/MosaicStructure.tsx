import * as React from 'react';
import classNames from 'classnames/bind';
import window from 'global/window';
import styleIdentifiers from './mosaicStructure.scss';

const styles = classNames.bind(styleIdentifiers);

export interface MosaicStructureProps {
  minWidth?: number;
  scrollableColumns?: boolean;
}

interface MosaicStructureState {
  columns: any[][] | null;
  numColumns: number;
}

function MosaicStructure(ItemComponent: React.ComponentType<any>) {
  class Structure extends React.Component<MosaicStructureProps, MosaicStructureState> {
    constructor(props: MosaicStructureProps) {
      super(props);
      this.state = {
        columns: null,
        numColumns: 1,
      };

      this.mosaicRef = React.createRef();
    }

    componentDidMount() {
      this.updateNumColumns();
      if (window.addEventListener) window.addEventListener('resize', this.updateNumColumns);
    }

    componentDidUpdate(prevProps) {
      const { items } = this.props;
      if (items !== prevProps.items) {
        this.updateNumColumns();
        if (window.addEventListener) window.addEventListener('resize', this.updateNumColumns);
      }
    }

    componentWillUnmount() {
      if (window.addEventListener) window.removeEventListener('resize', this.updateNumColumns);
    }

    updateNumColumns = () => {
      let { minWidth, width } = this.props;

      if (!this.mosaicRef) return;

      width = width || this.mosaicRef.current.offsetWidth;
      if (!width) return;

      if (!minWidth) {
        minWidth = 500;
      }
      let num = Math.floor(width / minWidth);
      if (num <= 0) num = 1;
      this.setState(
        {
          numColumns: num,
        },
        this.constructColumns,
      );
    };

    constructColumns = () => {
      const { items } = this.props;
      const { numColumns } = this.state;

      if (!items) return;

      let { direction } = this.props;
      direction = direction || 'ltrtl';

      let list;
      if (typeof items === 'object') {
        list = Object.values(items);
      } else {
        list = items;
      }

      const columns = [];
      for (let i = 0; i < numColumns; i++) {
        columns.push([]);
      }
      let current = direction.charAt(0) === 'l' ? 0 : numColumns - 1;
      let change = false;

      for (let i = 0; i < list.length; i++) {
        columns[current].push(list[i]);

        if (direction === 'ltrtl') {
          if (!change) current++;
          else current--;
        } else if (direction === 'rtltr') {
          if (!change) current--;
          else current++;
        } else if (direction === 'ltr') {
          current++;
          if (current >= numColumns) current = 0;
        } else if (direction === 'rtl') {
          current++;
          if (current <= 0) current = numColumns - 1;
        }
        // right to left to right or left to right to left
        if (direction === 'rtltr' || direction === 'ltrtl') {
          if (current >= numColumns) {
            change = !change;
            current = numColumns - 1;
          } else if (current <= 0) {
            change = !change;
            current = 0;
          }
        }
      }
      this.setState({
        columns,
      });
    };

    render() {
      const { scrollableColumns } = this.props;
      const { columns, numColumns } = this.state;
      return (
        <div className={styles('MosaicStructure')} ref={this.mosaicRef}>
          {columns &&
            columns.map((column, index) => (
              <div
                key={index}
                className={styles('column', scrollableColumns && 'scrollable')}
                style={{ width: `${100 / numColumns}%` }}
              >
                {column.map((item, ind) => (
                  <ItemComponent {...this.props} item={item} key={ind} />
                ))}
              </div>
            ))}
        </div>
      );
    }
  }
  return Structure;
}

export default MosaicStructure;
