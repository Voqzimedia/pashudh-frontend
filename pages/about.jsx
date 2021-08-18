import { Container, Row, Col } from "reactstrap";
import dynamic from "next/dynamic";

const PageMotion = dynamic(() => import("../components/Motion/PageMotion"));
const Slider = dynamic(() => import("react-slick"));

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import rocketIcon from "../assets/images/icons/rocket.svg?include";
import badgeIcon from "../assets/images/icons/badge.svg?include";
import threadIcon from "../assets/images/icons/thread.svg?include";

const timelineList = [
  {
    year: "1950",
    title: "Kanchi. K. Ethirajulu ",
    subTitle: "(Weaver to Designer)",
  },
  {
    year: "1976",
    title: "Kanchi. K. E. Venkatachalam",
    subTitle: "(Expansion of Business)",
  },
  {
    year: "1976",
    title: "K. V. Kumar",
    subTitle: "(K. V. Kumar Silks)",
  },
  {
    year: "2006",
    title: "K. K. Rajkumar and K. K. Suresh Kumar",
    subTitle: "(Managing Directors, K. V. Kumar Silks)",
  },
  {
    year: "2017",
    title: " Ms. Jeevitha Rajkumar and Ms. Vinodhini Suresh",
    subTitle: "(Pashudh)",
  },
];

export default function About() {
  const pageTitle = "About us";

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <PageMotion>
      <section className={`about-header-section page-section`}>
        <Container>
          <center>
            <h1 className="page-title" data-title={pageTitle}>
              {pageTitle}
            </h1>
          </center>
          <Row className={`highlight-container`}>
            <Col md="4">
              <div className="highlight-wrapper">
                <Row className={`flex-center align-center`}>
                  <Col md="3">
                    <div
                      dangerouslySetInnerHTML={{ __html: rocketIcon }}
                      className={`highlight-icon`}
                    />
                  </Col>
                  <Col md="9">
                    <h4 className={`title`}>Contemporary Trends</h4>{" "}
                  </Col>
                  <Col md="12">
                    <p className={`content`}>
                      New styles for the new-age woman, reinforced on ancestral
                      skill.
                    </p>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col md="4">
              <div className="highlight-wrapper">
                <Row className={`flex-center align-center`}>
                  <Col md="3">
                    <div
                      dangerouslySetInnerHTML={{ __html: badgeIcon }}
                      className={`highlight-icon`}
                    />
                  </Col>
                  <Col md="9">
                    <h4 className={`title`}>Rich Legacy</h4>{" "}
                  </Col>
                  <Col md="12">
                    <p className={`content`}>
                      Business that's over 4 decades old, thriving in all its
                      glory.
                    </p>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col md="4">
              <div className="highlight-wrapper">
                <Row className={`flex-center align-center`}>
                  <Col md="3">
                    <div
                      dangerouslySetInnerHTML={{ __html: threadIcon }}
                      className={`highlight-icon`}
                    />
                  </Col>
                  <Col md="9">
                    <h4 className={`title`}>Supporting Weavers</h4>{" "}
                  </Col>
                  <Col md="12">
                    <p className={`content`}>
                      A confluence of 750 weavers, offering a sensational twist
                      on their expertise.
                    </p>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className={`our-silk-route-section page-section`}>
        <Container>
          <center>
            <h2 className="section-title center">
              Silks that sing tales of heritage, legacy, and excellence.
            </h2>
          </center>
          <article className="content-holder">
            <p>
              The journey that started with the vision of becoming the pioneer
              in silks has now reached the destination of being a name
              synonymous with eternal style. Pashudh's story is not just that of
              a brand; it's the history of a silk-weaving community.
            </p>
            <p>
              A visionary who embarked on his life's voyage as a weaver, Kanchi
              K Ethirajulu, made the transition to being a designer in 1950.
              Subsequently, he started handling multiple weaving looms, and the
              family business flourished with each new generation. Introducing
              the mechanical jacquard and many such innovations in the field of
              handlooms enabled us to gain a stronghold in the business world.
              Our foundation was K. V. Kumar Silks, headed by K. K. Rajkumar and
              K.K. Suresh Kumar, with a focus on B2B sales, wherein the
              world-renowned Kanjivaram silk sarees created were sold directly
              to retailers. The expertise of our weavers and solid
              infrastructure comprising world-class machinery in weaving
              technology enabled us to produce top-quality Kanjivaram silk
              sarees.
            </p>
            <p>
              Ms Jeevitha Rajkumar, our CEO and Ms Vinodhini Suresh, our CMD,
              wanted to enter the B2C market, which gave birth to Pashudh.
              Established in Arani, a quaint little town in the Thiruvannamalai
              district, Tamil Nadu, Pashudh prides itself on creating a strong
              digital presence, delivering magnificent Kanjivaram silk sarees
              globally.
            </p>
            <p>
              Upholding a design philosophy that adapts heritage Kanjivaram silk
              weaves to suit the sensibilities of modern women, Pashudh offers a
              wide variety of silk sarees that you can flaunt on all kinds of
              occasions, right from casual to elite. Lending the love of the
              craft a personal touch, our Managing Directors themselves
              contribute their insights while designing the sarees. This results
              in each Pashudh saree exemplifying the virtues of contemporary
              design, ultimate precision, exceptional quality, and optimum
              comfort.
            </p>
            <p>
              With great legacy comes great responsibility. The weavers'
              community that forms the backbone of Pashudh's path to success
              comprises about 750 people, all of whom live and breathe silk
              sarees. The organization is focused on equipping them with
              technological advancements, education, and anything else necessary
              to aid in their evolution into a self-sustaining and thriving
              community of weavers.
            </p>
            <p>
              Pashudh aspires to present the magic of our looms before the
              world, with a level of finesse and elegance that has never been
              seen before. Furthermore, we wish to communicate our love for
              weaving silk sarees and our legacy through our products. One day,
              we hope the global community would think Pashudh every time they
              think of silk sarees.
            </p>
          </article>
        </Container>
      </section>
      <section className={`timeline-section page-section`}>
        <Container>
          <center>
            <Slider {...sliderSettings} className={`timeline-slider`}>
              {timelineList.map((timeline, index) => (
                <div className="about-timeline" key={index}>
                  <div className="timeline">
                    <h2 className="year">{timeline.year}</h2>
                  </div>
                  <div className="content">
                    <h2>{timeline.title}</h2>
                    <p>{timeline.subTitle}</p>
                  </div>
                </div>
              ))}
            </Slider>
          </center>
        </Container>
      </section>
      <section className={`founder-section page-section`}>
        <Container>
          <center>
            <div className="founder-wrapper">
              <div className="founder">
                <h2 className="title">Founder</h2>
                <br />
                <div className="img-wrapper">
                  {/* <picture>
                    <img src="" alt="" />
                  </picture> */}
                  <div className={`placeHolder`}></div>
                </div>

                <p className="name">K.V. Kumar</p>
              </div>
            </div>
          </center>
        </Container>
      </section>
      <section className={`team-section page-section`}>
        <Container>
          <center>
            <h2 className="title">Board of Directors and Designers</h2>
            <br />
            <div className="team-wrapper">
              <div className="member">
                <div className="img-wrapper">
                  {/* <picture>
                    <img src="" alt="" />
                  </picture> */}
                  <div className={`placeHolder`}></div>
                </div>
                <div className="content">
                  <h3>CEO </h3>
                  <p className="name">Mrs. Jeevitha Rajkumar</p>
                </div>
              </div>
              <div className="member">
                <div className="img-wrapper">
                  {/* <picture>
                    <img src="" alt="" />
                  </picture> */}
                  <div className={`placeHolder`}></div>
                </div>
                <div className="content">
                  <p className="name">K.K. Rajkumar & K.K.Suresh kumar</p>
                </div>
              </div>
              <div className="member">
                <div className="img-wrapper">
                  {/* <picture>
                    <img src="" alt="" />
                  </picture> */}
                  <div className={`placeHolder`}></div>
                </div>
                <div className="content">
                  <h3>CMD </h3>
                  <p className="name">Mrs. Vinodhini Sureshkumar</p>
                </div>
              </div>
            </div>
          </center>
        </Container>
      </section>
    </PageMotion>
  );
}
