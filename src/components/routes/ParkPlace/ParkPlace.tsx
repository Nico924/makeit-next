import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import TextItem from 'components/items/TextItem';
import TagItem from 'components/items/TagItem';
import SharingRectangle from 'components/pageItems/SharingRectangle';
import CtaNewsLetter from 'components/items/CtaNewsletter';
import InlineContactForm from 'components/forms/InlineContactForm';
import { Form } from 'react-final-form';

// assets
import WysiwygItem from 'components/pageItems/WysiwygItem';
import nflField from './assets/nflField.png';
import customWarning from './assets/customWarning.svg';
import quote from './assets/quote.svg';
// import content from './assets/content.js';
import group from './assets/group.png';
import cheapParking from './assets/cheapParking.png';
import multipleButtons from './assets/multipleButtons.png';
import Square from './assets/square.png';

import styleIdentifiers from './parkPlace.scss';

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {}

export type ParkPlaceProps = StateProps & DispatchProps & OwnProps;

const Parkplace = (props: ParkPlaceProps) => {
  const test = 'The ParkPlace Case';

  const {
    subscribe,
    history,
    content: { ParkPlace },
  } = props;

  const handleSubmit = values => {
    subscribe({ data: values, callback: (): void => history.push('/blog/thank-you-blog') });
  };

  return (
    <div className={styles('ParkPlace')}>
      <div className={styles('WrapperHeader')}>
        <img src={Square} alt="square" />
        <div className={styles('HeaderSection')}>
          <div className={styles('YellowBox')}>
            <TextItem path="Use Case" />
          </div>

          <div className={styles('title', 'white')}>
            <TextItem path="ParkPlace.fullContent.title" isHtml />
          </div>
        </div>
      </div>
      <div className={styles('ContentSection')}>
        <div className={styles('ContentWrapper')}>
          <div className={styles('SharingWrapper')}>
            <SharingRectangle />
          </div>
          <div className={styles('ImageWrapper')}>
            <div className={styles('top')}>
              <TagItem categorie={test} indicColor="#64c1be" />
            </div>
            <img src={nflField} alt="preview" />
          </div>
          <div className={styles('FullContentWrapper')}>
            <div className={styles('TextContent')}>
              <TextItem path="ParkPlace.fullContent.first" isHtml />
            </div>
            <div className={styles('Box', 'Blue')}>
              <div className={styles('IconContainer')}>
                <img src={customWarning} alt="" />
              </div>
              <TextItem path="ParkPlace.fullContent.blueBox" />
            </div>
            <div className={styles('HeaderText')}>
              <TextItem path="ParkPlace.fullContent.second.title" />
            </div>
            <div className={styles('SubHeaderText')}>
              <TextItem path="ParkPlace.fullContent.second.subHeader" />
            </div>
            <img src={group} alt="preview" />
            <div className={styles('TextContent')}>
              <TextItem path="ParkPlace.fullContent.second.text1" />
            </div>
            <div className={styles('TextContent')}>
              <TextItem path="ParkPlace.fullContent.second.text2" />
            </div>
            <div className={styles('SubHeaderText')}>
              <TextItem path="ParkPlace.fullContent.third.subHeader" />
            </div>
            <div className={styles('TextContent')}>
              <TextItem path="ParkPlace.fullContent.third.text" />
            </div>
            <div className={styles('GreenRectangle')}>
              <TextItem path="ParkPlace.fullContent.third.greenBox" />
            </div>
            <div className={styles('SubHeaderText')}>
              <TextItem path="ParkPlace.fullContent.fourth.subHeader" />
            </div>
            <div className={styles('TextContent')}>
              <strong>
                <TextItem path="ParkPlace.fullContent.fourth.titleList1" />
              </strong>
            </div>
            <ul className={styles('ListContainer')}>
              <li>
                <TextItem
                  className={styles('TextContent')}
                  path="ParkPlace.fullContent.fourth.listElem1"
                />
              </li>
              <li>
                <TextItem
                  className={styles('TextContent')}
                  path="ParkPlace.fullContent.fourth.listElem2"
                />
              </li>
              <li>
                <TextItem
                  className={styles('TextContent')}
                  path="ParkPlace.fullContent.fourth.listElem3"
                />
              </li>
              <li>
                <TextItem
                  className={styles('TextContent')}
                  path="ParkPlace.fullContent.fourth.listElem4"
                />
              </li>
            </ul>
            <div className={styles('TextContent')}>
              <TextItem path="ParkPlace.fullContent.fourth.text1" />
            </div>
            <div className={styles('TextContent')}>
              <TextItem path="ParkPlace.fullContent.fourth.text2" />
            </div>
            <div className={styles('TextContent')}>
              <TextItem path="ParkPlace.fullContent.fourth.text3" />
            </div>
            <div className={styles('TextContent')}>
              <TextItem path="ParkPlace.fullContent.fourth.text4" />
            </div>
            <img src={cheapParking} alt="preview" />
            <div className={styles('TextContent')}>
              <strong>
                <TextItem path="ParkPlace.fullContent.fifth.titleList2" />
              </strong>
            </div>
            <div className={styles('TextContent')}>
              <TextItem path="ParkPlace.fullContent.fifth.text1" />
            </div>
            <div className={styles('TextContent')}>
              <TextItem path="ParkPlace.fullContent.fifth.text2" />
            </div>
            <div className={styles('TextContent')}>
              <TextItem path="ParkPlace.fullContent.fifth.text3" />
            </div>
            <div className={styles('TextContent')}>
              <TextItem path="ParkPlace.fullContent.fifth.text4" />
            </div>
            <div className={styles('TextContent')}>
              <TextItem path="ParkPlace.fullContent.fifth.text5" />
            </div>
            <div className={styles('TextContent')}>
              <strong>
                <TextItem path="ParkPlace.fullContent.sixth.titleList3" />
              </strong>
            </div>
            <div className={styles('TextContent')}>
              <TextItem path="ParkPlace.fullContent.sixth.text1" />
            </div>
            <div className={styles('TextContent')}>
              <TextItem path="ParkPlace.fullContent.sixth.text2" />
            </div>
            <div className={styles('TextContent')}>
              <TextItem path="ParkPlace.fullContent.sixth.text3" />
            </div>
            <div className={styles('Box', 'Red')}>
              <div className={styles('IconContainer')}>
                <img src={quote} alt="" />
              </div>
              <TextItem path="ParkPlace.fullContent.sixth.redBox" />
            </div>
          </div>
        </div>
        <div className={styles('ContactFormWrapper')}>
          <div className={styles('ContactForm')}>
            <img src={multipleButtons} alt="preview" />
            <div className={styles('TextWrapper')}>
              <div className={styles('ContactHeader')}>
                <TextItem path="ParkPlace.fullContent.Contact.text1" />
              </div>
              <div className={styles('ContactText')}>
                <TextItem path="ParkPlace.fullContent.Contact.text2" />
              </div>
              <Form component={InlineContactForm} buttonColor="pink" onSubmit={handleSubmit} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Parkplace;
