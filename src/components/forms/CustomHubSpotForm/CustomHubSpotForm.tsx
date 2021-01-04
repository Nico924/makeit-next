import React, { Component } from 'react';
import classNames from 'classnames/bind';
import TextItem from 'components/items/TextItem';
import loadable from '@loadable/component';
import styleIdentifiers from './customHubSpotForm.scss';

const Hubspot = loadable.lib(() => import('react-hubspot-form'));

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {
  portalId: string;
  formId: string;
}

export type CustomHubSpotFormProps = StateProps & DispatchProps & OwnProps;

interface CustomHubSpotFormState {}

export default class CustomHubSpotForm extends Component<
  CustomHubSpotFormProps,
  CustomHubSpotFormState
> {
  render() {
    const { colorButton, className, colorError, checkboxLabelColor } = this.props;

    return (
      <div className={styles('CustomHubSpotForm', className)}>
        <div
          className={styles(
            'content-custom-form',
            colorButton && `button-color-${colorButton}`,
            colorError && `error-color-${colorError}`,
            checkboxLabelColor && `checbkox-label-color-${checkboxLabelColor}`,
          )}
        >
          <Hubspot>{({ default: HubspotForm }) => <HubspotForm {...this.props} />}</Hubspot>
        </div>
      </div>
    );
  }
}
