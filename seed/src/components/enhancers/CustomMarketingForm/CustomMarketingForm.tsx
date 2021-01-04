import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import TextItem from 'components/items/TextItem';
import { ApolloClient, ApolloProvider, createHttpLink, gql, InMemoryCache } from '@apollo/client';
import { Query, Mutation } from '@apollo/react-components';

import { config } from 'config/general';
import fetch from 'cross-fetch';
import { Form } from 'react-final-form';
import { required, email, composeValidators, isTrue } from 'store/utils/validation';
import Button from 'components/items/Button';
import Loading from 'components/items/Loading';

import sortBy from 'lodash/sortBy';

import styleIdentifiers from './customMarketingForm.scss';

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {}

export type CustomMarketingFormProps = StateProps & DispatchProps & OwnProps;

const cache = new InMemoryCache();

const clientForm = new ApolloClient({
  link: createHttpLink({ uri: config.api.formUrlApollo || config.api.baseUrlApollo, fetch }),
  cache,
});

function Wrapper(ItemComponent: React.ComponentType<any>, ButtonComponent: React.CompentType<any>) {
  return class CustomMarketingForm extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        sendLoader: false,
        values: null,
        formElement: null,
      };
    }

    cleanFormAfterSubmit = (form, fields) => {
      for (let index = 0; index < Object.keys(fields).length; index++) {
        const element = Object.keys(fields)[index];
        form.resetFieldState(element);
      }
      form.reset();
    };

    renderList = schema => {
      return schema.list;
    };

    renderValidation = schema => {
      if (schema.type === 'email' && schema.required) return composeValidators(email, required);
      if (schema.type === 'email' && !schema.required) return composeValidators(email);
      if (schema.type === 'checkbox' && schema.required) return composeValidators(isTrue);
      if (schema.required) return composeValidators(required);
      return null;
    };

    render() {
      const {
        formId,
        buttonProps,
        onSubmit,
        className,
        inputProps,
        loadingClassName,
        initialValues,
        lg,
      } = this.props;
      const { sendLoader, values, formElement } = this.state;

      const queryGetForm = gql`{
        formsGetOne(id: "${formId}") {
          formData  {
            title
            position
            label {
              ${lg || 'en'}
            }
            placeholder {
              ${lg || 'en'}
            }
            schema {
              required
              type
              list 
            }
          }
        }
      }
    `;

      const mutationSubmitForm = gql`
        mutation submit($input: NewFormSubmissionInput!, $id: String!) {
          formsSubmitOne(input: $input, id: $id) {
            _id
          }
        }
      `;

      return (
        <Mutation
          client={clientForm}
          mutation={mutationSubmitForm}
          onCompleted={() => {
            this.setState({ sendLoader: false });
            formElement.reset();
            if (onSubmit) onSubmit(values);
            this.setState({ formElement: null });
          }}
          onError={e => {
            this.setState({ sendLoader: false });
            if (onSubmit) onSubmit(e);
          }}
          key={formId}
        >
          {formsSubmitOne => (
            <Form
              initialValues={initialValues || {}}
              onSubmit={e => {
                this.setState({ sendLoader: true, values: e });
                if (!e.email && localStorage.getItem('ACemail')) {
                  e.email = localStorage.getItem('ACemail');
                }
                formsSubmitOne({
                  variables: { id: formId, input: { formData: e } },
                });
                if (window && window.vgo && e.email) {
                  localStorage.setItem('ACemail', e.email);
                  window.vgo('setEmail', e.email);
                  window.vgo('process');
                }
              }}
              component={({ handleSubmit, form }) => (
                <Query client={clientForm} query={queryGetForm}>
                  {({ loading, error, data }) => {
                    if (loading) return <div>Loading ...</div>;
                    if (!data || !data.formsGetOne) return <div>Error</div>;
                    return (
                      <form
                        className={styles('CustomMarketingForm', className)}
                        onSubmit={async event => {
                          await handleSubmit(event);
                          this.setState({ formElement: form });
                        }}
                      >
                        {ItemComponent &&
                          sortBy(data.formsGetOne.formData, 'position').map((item, key) => {
                            if (!lg) return <div>Please provide lg props</div>;

                            return (
                              <ItemComponent
                                name={item.title}
                                label={(item.label && item.label[lg]) || item.label}
                                placeholder={
                                  (item.placeholder && item.placeholder[lg]) || item.placeholder
                                }
                                {...item.schema}
                                type={item.schema.type !== 'radio' ? item.schema.type : ''}
                                {...inputProps}
                                items={this.renderList(item.schema)}
                                key={key}
                                seed={item.schema && item.schema.type}
                                validate={this.renderValidation(item.schema)}
                              />
                            );
                          })}
                        {!ItemComponent && <div>Please pass your project Input</div>}
                        {ButtonComponent ? (
                          <ButtonComponent type="submit" {...buttonProps} />
                        ) : (
                          <Button label="Submit" type="submit" {...buttonProps} />
                        )}
                        {sendLoader && (
                          <div className={styles('loading-container', loadingClassName)}>
                            <Loading className={styles('loading')} />
                          </div>
                        )}
                      </form>
                    );
                  }}
                </Query>
              )}
            />
          )}
        </Mutation>
      );
    }
  };
}

export default Wrapper;
