import React from 'react';
import CustomDropdown from 'components/enhancers/CustomDropdown';

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {
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
  selectorClass: string;
  contentClass: string;
  activeClass: string;
  noArrow: boolean;
  hover: boolean;
}

export type DropdownProps = StateProps & DispatchProps & OwnProps;

interface DropdownState {
  dropdownActive: boolean;
}

const ItemComponent = props => {
  const { label, item } = props;

  if (label) {
    return <span>{label}</span>;
  }
  if (item) {
    return item;
  }
  return null;
};

const LocaleDropdown = CustomDropdown(ItemComponent);

const Dropdown = (props: DropdownProps) => {
  return <LocaleDropdown decal {...props} />;
};

export default Dropdown;
