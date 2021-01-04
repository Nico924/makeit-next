import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import TextItem from 'components/items/TextItem';
import CustomButton from 'components/items/CustomButton';
import VideoArticleItem from 'components/pageItems/VideoArticleItem';
import CostRiskTable from 'components/pageItems/CostRiskTable';
import Illustration from 'components/items/Illustration';
import Blurb from 'components/pageItems/Blurb';
import Section from 'components/pageItems/Section';
import Flex from 'components/pageItems/Flex';
import TestitmonialCard from 'components/items/TestimonialCard';
import CustomHubSpotForm from 'components/forms/CustomHubSpotForm';
import WorkerPresentation from 'components/items/WorkerPresentation';
import SeoHandler from 'components/global/SeoHandler';
import styleIdentifiers from './startWith.scss';

import arrowDown from './assets/arrow-down.svg';
import bestValue from './assets/best-value.svg';
import ryan from './assets/ryan.png';
import alex from './assets/alex.jpg';
// import logo from './assets/bpc-canva.svg';

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {}

export type StartWithProps = StateProps & DispatchProps & OwnProps;

const StartWith = (props: StartWithProps) => {
  const videoContainer = useRef(null);
  const [refVideoContainer, setRefVideoContainer] = useState(null);

  useEffect(() => setRefVideoContainer(videoContainer.current), [videoContainer]);

  return (
    <div className={styles('StartWith')}>
      <SeoHandler path="start-with.seo" />
      <Section classN={styles('first')}>
        <Flex align="a-center" justify="j-space-between" classN={styles('half_img_half_content')}>
          <div className={styles('content')}>
            <div className={styles('title')}>
              <h1>
                <TextItem path="start-with.section.first.title" />
              </h1>
            </div>
            <div className={styles('text')}>
              <TextItem path="start-with.section.first.text" />
            </div>
            <CustomButton
              className={styles('button')}
              color="pink"
              label="start-with.section.first.button"
            />
          </div>
          <div className={styles('video')} ref={videoContainer}>
            <VideoArticleItem path="start-with.section.first.video" />
          </div>
        </Flex>
      </Section>
      <Section classN={styles('second')}>
        <Flex align="a-center" justify="j-space-between" classN={styles('half_img_half_content')}>
          <WorkerPresentation className={styles('workerImage')} picture={alex} />
          <div className={styles('content')}>
            <div className={styles('title')}>
              <h2 className="white">
                <TextItem path="start-with.section.second.title" />
              </h2>
            </div>
            <div className={styles('text')}>
              <p className="white">
                <TextItem path="start-with.section.second.text" isHtml />
              </p>
            </div>
            <CustomButton
              className={styles('button')}
              label="start-with.section.second.button"
              color="white"
            />
          </div>
        </Flex>
      </Section>
      <Section classN={styles('third')}>
        <div className={styles('section_heading', 'text-center')}>
          <div className={styles('title')}>
            <h2 className="white">
              <TextItem path="start-with.section.third.title" />
            </h2>
          </div>
          <div className={styles('text')}>
            <p className="white">
              <TextItem path="start-with.section.third.subtitle" />
            </p>
          </div>
        </div>
        <CostRiskTable
          header={['cost', 'risk']}
          data={[
            { name: 'Legal', cost: 'medium', risk: 'low' },
            {
              name: 'Branding',
              cost: 'medium',
              risk: 'low',
            },
            {
              name: 'Product',
              cost: 'high',
              risk: 'low',
            },
            {
              name: 'Go to market',
              cost: 'high',
              risk: 'high',
            },
          ]}
        />
        <Flex classN={styles('after_table')} justify="j-space-between">
          <Illustration illu="prohibited" className={styles('tick')} />
          <div className={styles('text')}>
            <p className="white">
              <TextItem path="start-with.section.third.text" />
            </p>
          </div>
        </Flex>
        <div className={styles('image_wrapper', 'text-center')}>
          <img src={arrowDown} alt="arrow-down" className={styles('arrow-down')} />
        </div>
      </Section>
      <Section classN={styles('fourth')}>
        <div className={styles('section_heading', 'text-center')}>
          <div className={styles('title')}>
            <h2 className="white">
              <TextItem path="start-with.section.fourth.title" />
            </h2>
          </div>
          <div className={styles('text')}>
            <p className="white">
              <TextItem path="start-with.section.fourth.subtitle" />
            </p>
          </div>
        </div>
        <CostRiskTable
          header={['cost', 'risk']}
          data={[
            {
              name: 'Finding first customers',
              cost: 'low',
              risk: 'high',
            },
            {
              name: 'Delivering value to your customers',
              cost: 'low',
              risk: 'high',
            },
            {
              name: 'Building you MVP',
              cost: 'medium',
              risk: 'low',
            },
            {
              name: 'Legal',
              cost: 'medium',
              risk: 'low',
            },
            {
              name: 'Go to market',
              cost: 'high',
              risk: 'low',
            },
          ]}
        />
        <Flex classN={styles('after_table')} justify="j-space-between">
          <Illustration illu="checked" className={styles('tick')} />
          <div className={styles('text')}>
            <p className="white">
              <TextItem path="start-with.section.fourth.text" />
            </p>
          </div>
        </Flex>

        <CustomButton
          className={styles('button')}
          label="start-with.section.fourth.button"
          color="white"
        />
      </Section>
      <Section classN={styles('fifth')} className={styles('fifth')}>
        <div className={styles('section_heading')}>
          <div className={styles('title')}>
            <h2 className="text-center white">
              <TextItem path="start-with.section.fifth.title" />
            </h2>
          </div>
          <div className={styles('text')}>
            <p className="text-center white">
              <TextItem path="start-with.section.fifth.subtitle" />
            </p>
          </div>
        </div>
        <Flex justify="j-space-between" align="a-flex-start">
          <Blurb
            width="fourth"
            type="vertical"
            illu="exclamation"
            alt="warning"
            text="start-with.section.fifth.cards.one"
          />
          <Blurb
            width="fourth"
            type="vertical"
            illu="checked"
            alt="computer"
            text="start-with.section.fifth.cards.two"
          />
          <Blurb
            width="fourth"
            type="vertical"
            illu="files"
            alt="validated"
            text="start-with.section.fifth.cards.three"
          />
          <Blurb
            width="fourth"
            type="vertical"
            illu="team"
            alt="actions"
            text="start-with.section.fifth.cards.four"
          />
        </Flex>
        <CustomButton
          className={styles('button')}
          label="start-with.section.fifth.button"
          color="white"
        />
      </Section>
      <Section classN={styles('sixth')}>
        <div className={styles('section_heading')}>
          <div className={styles('title')}>
            <h2 className="text-center">
              <TextItem path="start-with.section.sixth.title" />
            </h2>
          </div>
          <div className={styles('text', 'text-center')}>
            <p>
              <TextItem path="start-with.section.sixth.subtitle" />
            </p>
          </div>
        </div>
        <Flex justify="j-space-between">
          <div className={styles('workshop_card')}>
            <div className={styles('card_wrapper')}>
              <div className={styles('card_heading')}>
                <h3>
                  <TextItem path="start-with.section.sixth.leftCard.title" />
                </h3>
              </div>
              <div className={styles('card_body')}>
                <p>
                  <TextItem path="start-with.section.sixth.leftCard.text" />
                </p>
              </div>
            </div>
            <div className={styles('card_button')}>
              <CustomButton
                className={styles('button')}
                label="start-with.section.sixth.leftCard.button"
                color="pink"
              />
            </div>
          </div>
          <div className={styles('workshop_card')}>
            <div className={styles('best_value')}>
              <img src={bestValue} alt="" />
            </div>
            <div className={styles('card_wrapper')}>
              <div className={styles('card_heading')}>
                <h3>
                  <TextItem path="start-with.section.sixth.rightCard.title" />
                </h3>
              </div>
              <div className={styles('card_body')}>
                <p>
                  <TextItem path="start-with.section.sixth.rightCard.text" />
                </p>
              </div>
            </div>
            <div className={styles('card_button')}>
              <CustomButton
                className={styles('button')}
                label="start-with.section.sixth.rightCard.button"
                color="pink"
              />
            </div>
          </div>
        </Flex>
      </Section>
      <Section classN={styles('seventh')}>
        <Flex align="a-center" justify="j-space-between" classN={styles('half_img_half_content')}>
          {/* <img src={alex} alt="" /> */}
          <WorkerPresentation className={styles('workerImage')} picture={alex} />
          <div className={styles('content')}>
            <div className={styles('title')}>
              <h2 className="white">
                <TextItem path="start-with.section.seventh.title" />
              </h2>
            </div>
            <div className={styles('text')}>
              <p className="white">
                <TextItem path="start-with.section.seventh.text" />
              </p>
            </div>
            <CustomButton
              className={styles('button')}
              label="start-with.section.seventh.button"
              color="pink"
            />
          </div>
        </Flex>
      </Section>
      <Section classN={styles('eigth')}>
        <div className={styles('section_heading')}>
          <div className={styles('title')}>
            <h2 className="white text-center">
              <TextItem path="start-with.section.eigth.title" />
            </h2>
          </div>
        </div>
        <Flex>
          <TestitmonialCard
            photo={ryan}
            text="start-with.section.eigth.testimonials.one.text"
            name="start-with.section.eigth.testimonials.one.name"
            width="third"
          />
          <TestitmonialCard
            photo={ryan}
            text="start-with.section.eigth.testimonials.two.text"
            name="start-with.section.eigth.testimonials.two.name"
            width="third"
          />
          <TestitmonialCard
            photo={ryan}
            text="start-with.section.eigth.testimonials.three.text"
            name="start-with.section.eigth.testimonials.three.name"
            width="third"
          />
        </Flex>
      </Section>
      <Section classN={styles('ninth')}>
        <Flex align="a-center" justify="j-space-between" classN={styles('half_img_half_content')}>
          <div className={styles('content')}>
            <div className={styles('title')}>
              <h2>
                <TextItem path="start-with.section.ninth.title" />
              </h2>
            </div>
            <div className={styles('text')}>
              <p>
                <TextItem path="start-with.section.ninth.text" />
              </p>
            </div>
            <CustomButton
              className={styles('button')}
              label="start-with.section.ninth.button"
              color="pink"
            />
          </div>
          <div className={styles('video')}>
            <VideoArticleItem path="start-with.section.ninth.video" />
          </div>
        </Flex>
      </Section>
      <Section classN={styles('tenth')}>
        <div className={styles('section_heading')}>
          <div className={styles('title')}>
            <h2 className="white text-center">
              <TextItem path="start-with.form.title" />
            </h2>
          </div>
          <div className={styles('text')}>
            <p className="white text-center">
              <TextItem path="start-with.form.subtitle" />
            </p>
          </div>
        </div>
        <CustomHubSpotForm
          colorError="red"
          className={styles('form')}
          portalId="3047087"
          formId="d198a6ba-7272-4d60-afa7-128f2a60af2a"
        />
      </Section>
    </div>
  );
};

export default StartWith;
