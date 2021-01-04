import * as React from 'react';
import SideMenu from 'components/global/SideMenu';

export interface StateProps {
  sideMenus: Record<string, any>;
}

export interface DispatchProps {}

export interface OwnProps {}

export type SideMenusProps = StateProps & DispatchProps & OwnProps;

interface SideMenusState {}

export default class SideMenus extends React.Component<SideMenusProps, SideMenusState> {
  render(): JSX {
    const { sideMenus } = this.props;
    return (
      <React.Fragment>
        {Object.keys(sideMenus).map(
          (key): JSX => (
            <SideMenu sideMenu={{ ...sideMenus[key] }} key={key} />
          ),
        )}
      </React.Fragment>
    );
  }
}
