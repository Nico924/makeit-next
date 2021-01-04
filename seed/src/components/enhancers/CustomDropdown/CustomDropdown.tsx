import * as React from 'react';
import classNames from 'classnames/bind';
import { mobileAndTabletCheck } from 'store/utils/helper';
import styleIdentifiers from './customDropdown.scss';

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {
  decal?: boolean;
  active: boolean;
  forceClose: boolean;
  toggleContent: boolean;
  actionContent: Function;
  action: Function;
  label: React.Node;
  item: React.Node;
  arrowColor: string;
  className: string;
  direction: string;
  arrowStyle: {} | string;
  dropdownContentStyle: string;
  children: React.Node;
  selectorClass?: string;
  contentClass?: string;
  activeClass?: string;
  activeClassName?: string;
  contentClassName?: string;
  selectorClassName?: string;
  selectorContentClassName?: string;
  noArrow: boolean;
  hover: boolean;
  spacing: number;
  fixedMobile?: boolean;
}

export type CustomDropdownProps = StateProps & DispatchProps & OwnProps;

interface CustomDropdownState {
  dropdownActive: boolean;
}

function CustomDropdown(ItemComponent: React.ComponentType<any>): JSX {
  class DropdownContainer extends React.Component<CustomDropdownProps, CustomDropdownState> {
    constructor(props: CustomDropdownProps) {
      super(props);

      const { active } = this.props;

      this.state = {
        dropdownActive: active || false,
      };
    }

    componentDidMount = (): void => {
      document.addEventListener('mouseup', this.handleClickOutside);
    };

    componentDidUpdate = (prevProps: CustomDropdownProps): void => {
      const { forceClose } = this.props;

      if (forceClose && !prevProps.forceClose) {
        this.toggleClick(false);
      }
    };

    componentWillUnmount = (): void => {
      document.removeEventListener('mouseup', this.handleClickOutside);
    };

    /**
     * Set the wrapper ref
     */
    setWrapperRef = (node: HTMLElement): void => {
      this.wrapperRef = node;
    };

    toggleClick = (forcedValue: boolean): void => {
      const { action } = this.props;
      const { dropdownActive } = this.state;

      if (forcedValue !== undefined && forcedValue === dropdownActive) return;

      if (!dropdownActive && action) {
        action();
      }

      this.setState({
        dropdownActive: (forcedValue !== undefined && forcedValue) || !dropdownActive,
      });
    };

    actionContent = (): void => {
      const { toggleContent, actionContent } = this.props;
      const { dropdownActive } = this.state;

      if (toggleContent) {
        this.setState({ dropdownActive: !dropdownActive });
      }
      if (actionContent) {
        actionContent();
      }
    };

    /**
     * Alert if clicked on outside of element
     */
    handleClickOutside = (event: MouseEvent): void => {
      const { target } = event;
      const { dropdownActive } = this.state;
      if (target instanceof HTMLElement) {
        if (dropdownActive && this.wrapperRef && !this.wrapperRef.contains(target)) {
          this.setState({ dropdownActive: false });
        }
      }
    };

    itemButton = (): void => {
      const { label, item } = this.props;
      if (label) {
        return <span>{label}</span>;
      }
      if (item) {
        return item;
      }
      return null;
    };

    render(): JSX {
      // TODO: rename class prop, shouldn't use the reserved keyword
      const {
        className,
        direction,
        arrowColor,
        decal,
        arrowStyle,
        selectorClass,
        selectorClassName,
        selectorContentClassName,
        contentClass,
        contentClassName,
        dropdownContentStyle,
        children,
        noArrow,
        activeClass,
        activeClassName,
        hover,
        spacing,
        center,
        fixedMobile,
      } = this.props;
      const { dropdownActive } = this.state;

      const mobile = typeof navigator === 'object' && mobileAndTabletCheck();

      return (
        <div
          className={styles(
            'CustomDropdown',
            className,
            decal && 'decal',
            fixedMobile && 'fixed-mobile',
            noArrow && 'no-triangle',
            direction || 'bottom',
          )}
          onMouseEnter={(): void => hover && !mobile && this.toggleClick(true)}
          onMouseLeave={(): void => hover && !mobile && this.toggleClick(false)}
          ref={this.setWrapperRef}
        >
          <div
            className={styles(
              'dropdown-selector',
              dropdownActive && 'active',
              dropdownActive && activeClass,
              dropdownActive && activeClassName,
              selectorClass,
              selectorClassName,
            )}
            style={spacing && { marginBottom: `${spacing}px`, marginTop: `${spacing}px` }}
            onClick={() => this.toggleClick()}
          >
            <div className={styles('dropdown-selector-content', selectorContentClassName)}>
              <ItemComponent
                active={dropdownActive}
                {...this.props}
                close={force => this.toggleClick(force)}
              />
            </div>
            {!noArrow && <div className={styles('arrow', arrowColor)} style={arrowStyle} />}
          </div>
          <div
            className={styles(
              'dropdown-content',
              dropdownActive && 'active',
              center && 'center',
              contentClass,
              contentClassName,
            )}
            style={dropdownContentStyle}
            onClick={this.actionContent}
          >
            {children}
          </div>
        </div>
      );
    }
  }
  return DropdownContainer;
}

export default CustomDropdown;
