import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames/bind";
import TextItem from "components/items/TextItem";
import CustomButton from "components/items/CustomButton";
import InvestIllustration from "components/pageItems/InvestIllustration";
import InvestCard from "components/pageItems/InvestCard";
import VideoItem from "components/pageItems/VideoItem";
import { Form } from "react-final-form";
import InvestContactForm from "components/forms/InvestContactForm";
import QuoteArticleItem from "components/pageItems/QuoteArticleItem";
import InvestHeader from "components/pageItems/InvestHeader";
import InvestFooter from "components/pageItems/InvestFooter";
import SeoHandler from "components/global/SeoHandler";
import { getContent } from "store/utils/helper";
import { Redirect } from "react-router-dom";
import styleIdentifiers from "./investingInIdeas.scss";

// Assets
import Rectangle from "./assets/rectangle.svg";
import BeAngels from "./assets/beangels.jpg";
import Logo from "./assets/logo.svg";
import Arrow from "./assets/arrow.svg";
import Section2 from "./assets/section2.png";
import Section3 from "./assets/section3.svg";
import Exclamation from "./assets/exclamation.svg";
import Biceps from "./assets/biceps.svg";
import Info from "./assets/info.png";
import Invest from "./assets/invest.png";
import Card1 from "./assets/card1.png";
import Card2 from "./assets/card2.png";

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {}

export type InvestingInIdeasProps = StateProps & DispatchProps & OwnProps;

const InvestingInIdeas = (props: InvestingInIdeasProps) => {
  const { sendMessage, profile, location, content } = props;

  const contextSection = useRef();
  const contactSection = useRef();
  const resourceSection = useRef();
  const starWarsSection = useRef();

  function handleSubmit(val) {
    sendMessage({
      data: val,
      success: "Message send"
    });
  }

  function downloadPDF() {
    const file = getContent(content, "investinideasus.Resource.presentation");
    if (file && file.value) window.open(file.value);
  }

  function parkPlaceCase() {
    const file = getContent(content, "investinideasus.Resource.parkplace");
    if (file && file.value) window.open(file.value);
  }

  function scrollTo(item) {
    if (item && item.current) {
      window.scrollTo({
        top: item.current.offsetTop - 100,
        behavior: "smooth"
      });
    }
  }

  function handleLocationChange(hash) {
    switch (hash) {
      case "#context":
        scrollTo(contextSection);
        break;
      case "#contact":
        scrollTo(contactSection);
        break;
      case "#starwars":
        scrollTo(starWarsSection);
        break;
      case "#resource":
        scrollTo(resourceSection);
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    if (location.hash) {
      handleLocationChange(location.hash);
    }
  }, [location.hash]);

  if (profile && !profile.data) return <Redirect to="/investonboarding" />;

  return (
    <div className={styles("InvestingInIdeas")}>
      <SeoHandler path="investinideasus.Home.seo" />
      <InvestHeader />
      <section className={styles("first")}>
        <div className={styles("container")}>
          <InvestIllustration
            className={styles("illu")}
            style={{ left: "45%" }}
            illu="triangle"
          />
          <InvestIllustration
            className={styles("illu")}
            illu="star-four"
            style={{ right: "20%", top: "-15%" }}
          />
          <InvestIllustration
            className={styles("illu")}
            illu="half-oval"
            style={{ left: "20%", top: "40%" }}
          />
          <InvestIllustration
            className={styles("illu")}
            illu="bar"
            style={{ bottom: "32%", right: "37%" }}
          />
          <InvestIllustration
            className={styles("illu")}
            illu="star-four"
            style={{ bottom: "15%", left: "42%", width: "20px" }}
          />
          <InvestIllustration
            className={styles("illu")}
            illu="square"
            style={{ right: "10%", top: "40%" }}
          />
          <InvestIllustration
            className={styles("illu")}
            style={{ left: "10%", top: "-10%" }}
            illu="polygon"
          />
          <div className={styles("title")}>
            <TextItem path="investinideasus.Home.first.title" />
          </div>
          <div className={styles("discover")}>
            <CustomButton
              action={() => scrollTo(contextSection)}
              color="grey"
              label="investinideasus.Home.first.button"
              iconRight={
                <img className={styles("arrow")} src={Arrow} alt="arrow" />
              }
            />
          </div>
        </div>
      </section>
      <section className={styles("second")} ref={contextSection}>
        <div className={styles("container", "row")}>
          <InvestIllustration
            illu="polygon"
            className={styles("illu")}
            style={{ width: "70px", right: "10%", bottom: "-35px" }}
          />
          <div className={styles("col", "left")}>
            <div className={styles("title")}>
              <TextItem path="investinideasus.Home.second.title" isHtml />
            </div>
            <div className={styles("image")}>
              <img src={Section2} alt="happy-men" />
            </div>
          </div>
          <div className={styles("col")}>
            <div className={styles("text")}>
              <TextItem path="investinideasus.Home.second.text" isHtml />
            </div>
            <InvestCard
              className={styles("card-info")}
              type="puce"
              puceColor="pink"
            >
              <TextItem
                className={styles("info")}
                path="investinideasus.Home.second.info"
              />
            </InvestCard>
          </div>
        </div>
      </section>
      <section className={styles("third")}>
        <div className={styles("container", "row")}>
          <div className={styles("col")}>
            <div className={styles("title")}>
              <TextItem path="investinideasus.Home.third.title" isHtml />
            </div>
            <InvestCard className={styles("card")} type="puce" puceColor="aqua">
              <TextItem
                className={styles("card-text")}
                path="investinideasus.Home.third.info"
              />
            </InvestCard>
            <div className={styles("text")}>
              <TextItem path="investinideasus.Home.third.text" isHtml />
            </div>
          </div>
          <div className={styles("col")}>
            <img src={Section3} alt="illustration" />
          </div>
        </div>
      </section>
      <section className={styles("fourth")}>
        <InvestIllustration
          className={styles("illu")}
          style={{ right: 0, bottom: "-22%" }}
          illu="donut"
        />
        <div className={styles("container")}>
          <div className={styles("title")}>
            <TextItem path="investinideasus.Home.fourth.title" isHtml />
          </div>
          <div className={styles("card-container")}>
            <InvestCard className={styles("card-item")}>
              <img src={Exclamation} alt="exclamation" />
              <TextItem
                isHtml
                className={styles("card-text")}
                path="investinideasus.Home.fourth.card1"
              />
            </InvestCard>
            <InvestCard className={styles("card-item")}>
              <img src={Biceps} alt="biceps" />
              <TextItem
                isHtml
                className={styles("card-text")}
                path="investinideasus.Home.fourth.card2"
              />
            </InvestCard>
          </div>
        </div>
      </section>
      <section className={styles("fifth")} ref={starWarsSection}>
        <InvestIllustration
          className={styles("illu")}
          style={{ left: 0, bottom: "-5%" }}
          illu="donut"
          color="aqua"
        />
        <div className={styles("container", "row")}>
          <div className={styles("col")}>
            <VideoItem
              className={styles("video")}
              path="investinideasus.Home.fifth.video"
            />
          </div>
          <div className={styles("col")}>
            <div className={styles("title")}>
              <TextItem isHtml path="investinideasus.Home.fifth.title" />
            </div>
            <div className={styles("text")}>
              <TextItem isHtml path="investinideasus.Home.fifth.text" />
            </div>
            <div className={styles("list")}>
              <TextItem isHtml path="investinideasus.Home.fifth.list" />
            </div>
            <InvestCard className={styles("card")}>
              <img src={Info} alt="info" />
              <TextItem
                className={styles("card-text")}
                path="investinideasus.Home.fifth.info"
              />
            </InvestCard>
          </div>
        </div>
      </section>
      <section className={styles("sixth")} ref={resourceSection}>
        <div className={styles("container")}>
          <div className={styles("title")}>
            <TextItem path="investinideasus.Home.sixth.title" isHtml />
          </div>
          <div className={styles("card-container")}>
            <InvestCard className={styles("card")}>
              <div className={styles("content-card")}>
                <div className={styles("image")}>
                  <img src={Card1} alt="presentation-pdf" />
                </div>
                <div className={styles("title")}>
                  <TextItem path="investinideasus.Home.sixth.card1.title" />
                </div>
                <div className={styles("text")}>
                  <TextItem path="investinideasus.Home.sixth.card1.text" />
                </div>
              </div>
              <CustomButton
                noMargin
                action={downloadPDF}
                className={styles("button")}
                iconRight={<img src={Arrow} alt="arrow" />}
                label="investinideasus.Home.sixth.card1.button"
                color="grey"
              />
            </InvestCard>
            <InvestCard className={styles("card")}>
              <div className={styles("content-card")}>
                <div className={styles("image")}>
                  <img src={Card2} alt="presentation-pdf" />
                </div>
                <div className={styles("title")}>
                  <TextItem path="investinideasus.Home.sixth.card2.title" />
                </div>
                <div className={styles("text", "margin")}>
                  <TextItem
                    path="investinideasus.Home.sixth.card2.text"
                    isHtml
                  />
                </div>
              </div>
              <CustomButton
                noMargin
                action={parkPlaceCase}
                className={styles("button")}
                iconRight={<img src={Arrow} alt="arrow" />}
                label="investinideasus.Home.sixth.card2.button"
                color="grey"
              />
            </InvestCard>
          </div>
        </div>
      </section>
      <section className={styles("seventh")} ref={contactSection}>
        <div className={styles("container", "row")}>
          <InvestIllustration
            className={styles("illu")}
            style={{ left: 0, width: "400px", bottom: "-52%" }}
            illu="donut"
            color="pink"
          />
          <div className={styles("col", "left")}>
            <div className={styles("title")}>
              <TextItem path="investinideasus.Home.seventh.title" isHtml />
            </div>
            <div className={styles("text")}>
              <TextItem path="investinideasus.Home.seventh.text" isHtml />
            </div>
          </div>
          <div className={styles("col")}>
            <div className={styles("form")}>
              <Form
                onSubmit={handleSubmit}
                initialValues={profile && profile.data}
                component={InvestContactForm}
              />
            </div>
          </div>
        </div>
      </section>
      <section className={styles("eighth")}>
        <div className={styles("container")}>
          <div className={styles("image")}>
            <img src={Invest} alt="invest" />
          </div>
          <div className={styles("title")}>
            <TextItem path="investinideasus.Home.eighth.title" isHtml />
          </div>
          <div className={styles("text")}>
            <TextItem isHtml path="investinideasus.Home.eighth.subtitle" />
          </div>
          <QuoteArticleItem className={styles("quote")}>
            <TextItem path="investinideasus.Home.eighth.testimonial" isHtml />
          </QuoteArticleItem>
        </div>
      </section>
      <InvestFooter />
    </div>
  );
};

export default InvestingInIdeas;
