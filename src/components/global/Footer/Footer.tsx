import React, { Component } from 'react';
import classNames from 'classnames/bind';
import TextItem from 'components/items/TextItem';
import Logo from 'components/global/Logo';
import NewsLetterForm from 'components/forms/NewsLetterForm';
import BlogItem from 'components/listItems/BlogItem';
import CardItem from 'components/items/CardItem';
import FolderItem from 'components/items/FolderItem';
import Menu from 'components/global/Menu';
import Image from 'next/image';
import styleIdentifiers from './footer.module.scss';

// assets
const LogoImage = '/assets/logoFooter.svg';
const Smiley = '/assets/smile.png';
const Pin = '/assets/pin.svg';
const Facebook = '/assets/facebook.svg';
const Linkedin = '/assets/linkedin.svg';
const Instagram = '/assets/instagram.svg';
const ArrowBot = '/assets/back-to-top.svg';
const Folder = '/assets/folder.svg';

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {
  latestPost: boolean;
  FooterCta: boolean;
  FooterInfo: boolean;
}

export type FooterProps = StateProps & DispatchProps & OwnProps;

interface FooterState {}

export default class Footer extends Component<FooterProps, FooterState> {
  submit = (values: Record<string, any>): void => {
    const { subscribe, history } = this.props;
    subscribe({ data: values, callback: (): void => history.push('/blog/thank-you-blog') });
  };

  showMenu = section => {
    const { dialogShow, dialogHide } = this.props;
    dialogShow({
      id: 'custom',
      large: true,
      wrapperClassName: 'modal-menu',
      children: (
        <CardItem
          className={styles('modal-menu-card')}
          noLine
          noPadding
          title="Make It Explorer"
          action={() => dialogHide('custom')}
          mobileCross
        >
          <Menu sectionStart={section} />
        </CardItem>
      ),
    });
  };

  render() {
    const { FooterCta, FooterInfo, latestPost, latest, history, location } = this.props;
    return (
      <div className={styles('Footer')}>
        {/* {FooterCta && (
          <div className={styles('footer-cta-container')}>
            <div className={styles('rectangle')} />
            <div className={styles('cta-container', latestPost && 'big-container')}>
              <div className={styles('title')}>
                <TextItem isHtml path="general.footer.cta.title" />
              </div>
              <div className={styles('subtitle')}>
                <TextItem isHtml path="general.footer.cta.subtitle" />
              </div>
              <NewsLetterForm withInfo colorButton="yellow" onSubmit={this.submit} />
            </div>
          </div>
        )} */}
        {latestPost && (
          <div className={styles('last-post-container')}>
            <div className={styles('related-container')}>
              <div className={styles('related-title')}>
                {/* <TextItem path="general.footer.latestPost.title" /> */}
              </div>
              <div className={styles('related-post')}>
                {latest &&
                  latest.data &&
                  latest.data.map((item, key) => (
                    <BlogItem noDescription type="blog" key={key} data={item} />
                  ))}
              </div>
            </div>
          </div>
        )}
        {FooterInfo ? (
          <>
            <div className={styles('footer-info-container', !latestPost && 'padding-top')}>
              <div className={styles('info-container')}>
                <div className={styles('top')}>
                  <div className={styles('makeit')}>
                    <div className={styles('makeit-container')}>
                      <div onClick={() => history.push('/')} className={styles('logo')}>
                        <Image width={220} height={85} src={LogoImage} alt="logo" />
                      </div>
                      {/* <div className={styles('job')}>
                        <p>Tech</p>
                        <p>Startup</p>
                        <p>Studio</p>
                      </div> */}
                    </div>
                  </div>
                  <div className={styles('folder-container')}>
                    {/* <FolderItem
                      className={styles('folder-item')}
                      action={() => this.showMenu('event')}
                      title="Events"
                    />
                    <FolderItem
                      className={styles('folder-item')}
                      action={() => this.showMenu('job')}
                      title="Jobs"
                    />
                    <FolderItem
                      className={styles('folder-item')}
                      action={() => this.showMenu('blog')}
                      title="Blog"
                    /> */}
                    <FolderItem
                      className={styles('folder-item')}
                      action={() => this.showMenu()}
                      title="Menu"
                    />
                  </div>
                </div>
                <div className={styles('bottom')}>
                  <div className={styles('address-container')}>
                    <div className={styles('address')}>
                      <Image width={25} height={25} src={Pin} alt="pin" />
                      <div className={styles('text')}>
                        <TextItem isHtml path="general.footer.info.kraainem" />
                      </div>
                    </div>
                    {/* <div className={styles('address')}>
                      <Image width={100} height={100} src={Pin} alt="pin" />
                      <div className={styles('text')}>
                        <TextItem isHtml path="general.footer.info.jambes" />
                      </div>
                    </div> */}
                    <div className={styles('address')}>
                      <Image width={25} height={25} src={Pin} alt="pin" />
                      <div className={styles('text')}>
                        <TextItem isHtml path="general.footer.info.losAngeles" />
                      </div>
                    </div>
                  </div>
                  <div className={styles('contact')}>
                    <Image
                      width={60}
                      height={60}
                      className={styles('img')}
                      src={Smiley}
                      alt="smile"
                    />
                    <TextItem isHtml path="general.footer.info.info" />
                  </div>
                </div>
              </div>
            </div>
            {/* <div className={styles('bottom-bar')}>
              <div className={styles('bar-container')}>
                <div
                  className={styles('back')}
                  onClick={(): void => window.scroll({ top: 0, left: 0, behavior: 'smooth' })}
                >
                  <TextItem path="general.footer.info.back" />
                </div>
                <div
                  className={styles('arrow')}
                  onClick={(): void => window.scroll({ top: 0, left: 0, behavior: 'smooth' })}
                >
                  <Image width={100} height={100} src={ArrowBot} alt="arrow-back-to-top" />
                </div>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.instagram.com/makeitgroup/"
                  className={styles('social')}
                >
                  <Image width={100} height={100} src={Instagram} alt="instagram" />
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.linkedin.com/company/makeitgroup/"
                  className={styles('social')}
                >
                  <Image width={100} height={100} src={Linkedin} alt="linkedin" />
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.facebook.com/MakeitStartupStudio/"
                  className={styles('social')}
                >
                  <Image width={100} height={100} src={Facebook} alt="facebook" />
                </a>
                <div className={styles('copyright')}>
                  <TextItem path="general.footer.info.copyright" isHtml />
                </div>
              </div>
            </div> */}
          </>
        ) : (
          <div className={styles('footer-container')}>
            <Logo className={styles('footer-logo')} />
            <div className={styles('footer-text')}>
              <TextItem path="web.home.footer" />
            </div>
          </div>
        )}
      </div>
    );
  }
}
