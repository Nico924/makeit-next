import React, { useState, useEffect } from 'react';

// Redux part
import { useSelector, useDispatch } from 'react-redux';
import { StoreState } from 'store/rootReducer';

// Import actions here

import classNames from 'classnames/bind';
import TextItem from 'components/items/TextItem';
import SeoHandler from 'components/global/SeoHandler';
import CustomMarketingForm from 'components/enhancers/CustomMarketingForm';
import CustomButton from 'components/items/CustomButton';
import ProjectInput from 'components/formItems/ProjectInput';
import styleIdentifiers from './contactPage.scss';

// assets
import File from './assets/file.svg';
import Thumbnail from './assets/thumbnail.png';
import contactIllu from './assets/contact_illu.png';
import pin from './assets/pin.svg';
import mail from './assets/mail.svg';
import card from './assets/card.svg';
import halfCarrePink from './assets/half_carre_pink.svg';

const ContactFormulaire = CustomMarketingForm(ProjectInput, CustomButton);

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {}

export type ContactPageProps = StateProps & DispatchProps & OwnProps;

const ContactPage = (props: ContactPageProps) => {
  const { history } = props;
  // mapStateToProps
  const content = useSelector((state: StoreState) => state.content.raw);
  const lg = useSelector(state => state.content.lg);

  // Allow to dispatch actions
  const dispatch = useDispatch();

  return (
    <div className={styles('contact-page')}>
      <img className={styles('half_carre_pink')} src={halfCarrePink} alt="shape" />
      <SeoHandler path="web.contact.seo" image={Thumbnail} />
      <section className={styles('section1')}>
        <div className={styles('contain_wrapper')}>
          <div className={styles('left_wrapper')}>
            <div className={styles('title', 'white')}>
              <TextItem isHtml path="web.contact.title" />
            </div>
            <div className={styles('text', 'white')}>
              <TextItem isHtml path="web.contact.text" />
            </div>
            <div className={styles('form')}>
              <div className={styles('text', 'black')}>
                <TextItem isHtml path="web.contact.formText" />
              </div>
              <ContactFormulaire
                lg={lg}
                onSubmit={() => history.push('/thank-you-contact')}
                formId="826e5879-71fc-48f3-828a-48226e03b698"
                className={styles('contact-form')}
                buttonProps={{
                  label: 'Send',
                  color: 'pink',
                }}
              />
            </div>
          </div>
          <div className={styles('right_wrapper')}>
            <div className={styles('image_wrapper')}>
              <img className={styles('contact_illu')} src={contactIllu} alt="Illu" />
            </div>
          </div>
        </div>
      </section>
      <section className={styles('section2')}>
        <div className={styles('contain_wrapper')}>
          <div className={styles('info_wrapper')}>
            <div className={styles('info_item')}>
              <div className={styles('info_icon')}>
                <img className={styles('pin')} src={pin} alt="pin" />
              </div>
              <div className={styles('info_text')}>
                <div className={styles('text', 'white')}>
                  <TextItem isHtml path="web.contact.section2.address_one" />
                </div>
              </div>
            </div>
            <div className={styles('info_item')}>
              <div className={styles('info_icon')}>
                <img className={styles('pin')} src={pin} alt="pin" />
              </div>
              <div className={styles('info_text')}>
                <div className={styles('text', 'white')}>
                  <TextItem isHtml path="web.contact.section2.address_two" />
                </div>
              </div>
            </div>
            <div className={styles('info_item')}>
              <div className={styles('info_icon')}>
                <img className={styles('pin')} src={pin} alt="pin" />
              </div>
              <div className={styles('info_text')}>
                <div className={styles('text', 'white')}>
                  <TextItem isHtml path="web.contact.section2.address_three" />
                </div>
              </div>
            </div>
            <div className={styles('info_item')}>
              <div className={styles('info_icon')}>
                <img className={styles('mail')} src={mail} alt="mail" />
              </div>
              <div className={styles('info_text')}>
                <div className={styles('text', 'white')}>
                  <TextItem isHtml path="web.contact.section2.mail" />
                </div>
              </div>
            </div>
            <div className={styles('info_item')}>
              <div className={styles('info_icon')}>
                <img className={styles('card')} src={card} alt="card" />
              </div>
              <div className={styles('info_text')}>
                <div className={styles('text', 'white')}>
                  <TextItem isHtml path="web.contact.section2.society" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
