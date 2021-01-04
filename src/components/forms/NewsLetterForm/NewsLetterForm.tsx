import React, { Component } from 'react';
import { InjectedFormProps } from 'redux-form';
import classNames from 'classnames/bind';
import CustomButton from 'components/items/CustomButton';
import CustomMarketingForm from 'components/enhancers/CustomMarketingForm';
import ProjectInput from 'components/formItems/ProjectInput';
import styleIdentifiers from './newsLetterForm.scss';

const NewsLetter = CustomMarketingForm(ProjectInput, CustomButton);

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface FormData {}

export interface OwnProps {
  withInfo: boolean;
  noSpace: boolean;
  colorButton: string;
}

export type NewsLetterFormProps = StateProps &
  DispatchProps &
  InjectedFormProps<FormData, OwnProps>;

interface NewsLetterFormState {}

export default class NewsLetterForm extends Component<NewsLetterFormProps, NewsLetterFormState> {
  render(): JSX {
    const { withInfo, noSpace, mobile, lg, history, ...rest } = this.props;
    return (
      <div className={styles('NewsLetterForm')}>
        <NewsLetter
          formId="2a31a7b3-708a-44d0-84d7-f3360c369593"
          lg={lg}
          buttonProps={{
            label: 'Sign up',
            color: 'pink',
            variable: true,
          }}
          onSubmit={() => history.push('/blog/thank-you-blog')}
        />
        {noSpace && !mobile && withInfo && (
          <div className={styles('info')}>
            We will not spam you with ads you have not subscribed for.
          </div>
        )}
      </div>
    );
  }
}
