import { Container, Row, Col } from "reactstrap";
import PageMotion from "../components/Motion/PageMotion";

import rocketIcon from "../assets/images/icons/rocket.svg?include";
import badgeIcon from "../assets/images/icons/badge.svg?include";
import threadIcon from "../assets/images/icons/thread.svg?include";

export default function About() {
  const pageTitle = "About us";

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
            <h2 className="section-title center">Our Silk Route</h2>
          </center>
          <article className="content-holder">
            <p>
              Pashudh was born out of a passion to celebrate the glorious silk
              traditions of our land and embrace contemporary trends. Pure,
              authentic Kanjeevaram that has been treasured by generations of
              women needs to make its way into the wardrobes of new-age women
              who follow haute couture as well.
            </p>
            <p>
              Our journey began 40 years ago in Arni, a town in Tamil Nadu that
              is renowned for its rich legacy of silk sarees. Pashudh was
              founded by the brothers - KK Rajkumar, KK Sureshkumar and KV Kumar
              whose entrepreneurial skills and fascination for silk made Pashudh
              a name to reckon with.
            </p>
            <p>
              Mr KV Kumar has proven his business acumen by establishing key
              partnerships with retailers all over the country. He is also an
              illustrious designer whose creations have flown off the shelves.
              By keeping abreast of new developments in technology, trends and
              customer demands, he has been the driving force behind the brand’s
              success.
            </p>
            <p>
              Our story is also that of the revival of weaving communities. We
              have an award-winning team of 750 weavers, many of whom belonging
              to families that have been in the trade for generations. We
              combine conventional methods of weaving with more recent
              techniques as well. All our sarees are lovingly woven by hand, and
              proudly draped by lovely women all over the world.
            </p>
          </article>
        </Container>
      </section>
    </PageMotion>
  );
}
