import { Container, Row, Col } from "reactstrap";
import dynamic from "next/dynamic";

const PageMotion = dynamic(() => import("../components/Motion/PageMotion"));
const Slider = dynamic(() => import("react-slick"));

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// import rocketIcon from "../assets/images/icons/rocket.svg?include";
// import badgeIcon from "../assets/images/icons/badge.svg?include";
// import threadIcon from "../assets/images/icons/thread.svg?include";

import backDrop from "../assets/images/about/backDrop.png?webp";
import about1 from "../assets/images/about/about1.png?webp";
import about2 from "../assets/images/about/about2.png?webp";
import founder1 from "../assets/images/about/founder1.png?webp";
import founder2 from "../assets/images/about/founder2.png?webp";
import founder3 from "../assets/images/about/founder3.png?webp";
import founder4 from "../assets/images/about/founder4.png?webp";
import founder5 from "../assets/images/about/founder5.png?webp";

const timelineList = [
  {
    year: "1950",
    title: "Kanchi. K. Ethirajulu ",
    subTitle:
      "Laid the foundation for a business realm that integrated the expertise of weaving and designing silk sarees.",
  },
  {
    year: "1976",
    title: "Kanchi. K. E. Venkatachalam",
    subTitle:
      "Exemplified the legacy of weaving with new techniques of merging new designs in silk sarees.",
  },
  {
    year: "1976",
    title: "K. V. Kumar",
    subTitle:
      "Established the K V Kumar Silk Sarees and the foundation for a flourishing business.",
  },
  {
    year: "2006",
    title: "K. K. Rajkumar and K. K. Suresh Kumar",
    subTitle:
      "Researched and imbibed technologically innovative practices in the workings of the weaving factory, along with introducing new designs in keeping with the trends of the age.",
  },
  {
    year: "2017",
    title: " Ms. Jeevitha Rajkumar and Ms. Vinodhini Suresh",
    subTitle:
      "Laid the keystone for Pashudh as the one-stop destination for women looking for Kanjivaram silk sarees in vogue.",
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
    arrows: true,
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
            <hr className="small gradient no-m" />
          </center>
          <br />
          <center>
            <h2 className="section-title center about-title">
              Silks that sing tales of heritage, legacy, and excellence.
            </h2>
          </center>
        </Container>
      </section>
      <section className={`timeline-section page-section`}>
        <Container>
          <div
            className="timeline-holder"
            style={{ backgroundImage: `url(${backDrop})` }}
          >
            <center>
              <h3>OUR JOURNEY</h3>
              <hr className="small white no-m" />
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
          </div>
          <article className="content-holder">
            <center>
              <p>
                The journey that started with the vision of becoming the pioneer
                in silks has now reached the destination of being a name
                synonymous with eternal style. Pashudh's story is not just that
                of a brand; it's the history of a silk-weaving community.
              </p>
            </center>
          </article>
        </Container>
      </section>
      <section className={`our-silk-route-section page-section`}>
        <Container>
          <article className="content-holder">
            <center>
              <h2 className="section-title center content-title">
                Contemporary Trends For The New-Age Woman, Reinforced On
                Ancestral Skill.
              </h2>
              <hr className="small gradient no-m" />
              <br />

              <p>
                A visionary who embarked on his life's voyage as a weaver,
                Kanchi K Ethirajulu, made the transition to being a designer in
                1950. Subsequently, he started handling multiple weaving looms,
                and the family business flourished with each new generation.
                Kanchi. E. Venkatachalam and his brothers grew up under his
                expert tutelage, adapting to weaving as their master skill. They
                then parted ways to establish themselves as individual silk
                weavers.
              </p>

              <div className="image-holder">
                <img src={about1} alt="ab1" />
              </div>
            </center>
          </article>
        </Container>
      </section>
      <section className={`our-silk-route-section page-section`}>
        <Container>
          <article className="content-holder">
            <center>
              <h2 className="section-title center content-title">
                A Rich Legacy Of Business That'S Over 4 Decades Old, Still
                Thriving In All Its Glory.
              </h2>
              <hr className="small gradient no-m" />
              <br />

              <p>
                K V Kumar, the eldest son of KE. Venkatachalam, then moved on to
                establish K.V. Kumar Silk Sarees, growing it into a stronghold
                of Kanjivaram silk sarees in Arani. It marked a revolutionary
                period in the quaint little town, with technological innovations
                that benefitted the community and improved the lives of weavers
                by leaps and bounds. Introducing the mechanical jacquard and
                many such innovations in the field of weaving, K V Kumar along
                with his sons K. K. Rajkumar and K.K. Suresh Kumar, focused on
                B2B sales, wherein the world-renowned Kanjivaram silk sarees
                created were sold directly to retailers. The expertise of our
                weavers and solid infrastructure comprising world class handloom
                settings with latest weaving technology enabled us to produce
                top-quality Kanjivaram silk sarees.
              </p>
              <p>
                Ms Jeevitha Rajkumar, our CEO and Ms Vinodhini Suresh, our CMD,
                wanted to enter the B2C market, which gave birth to Pashudh.
                Pashudh prides itself on creating a strong digital presence,
                delivering magnificent Kanjivaram silk sarees globally.
              </p>
            </center>
          </article>
        </Container>
      </section>

      <section className={`our-silk-route-section page-section`}>
        <Container>
          <article className="content-holder">
            <center>
              <h2 className="section-title center content-title">
                Designs That Exemplify Passion, Knowledge, And Finesse.
              </h2>
              <hr className="small gradient no-m" />
              <br />

              <p>
                Upholding a design philosophy that adapts heritage Kanjivaram
                silk weaves to suit the sensibilities of modern women, Pashudh
                offers a wide variety of silk sarees that you can flaunt on all
                kinds of occasions, right from casual to elite. Lending the love
                of the craft a personal touch, our Managing Directors themselves
                contribute their insights while designing the sarees. This
                results in each Pashudh saree exemplifying the virtues of
                contemporary design, ultimate precision, exceptional quality,
                and optimum comfort.
              </p>

              <div className="image-holder">
                <img src={about2} alt="ab1" />
              </div>
            </center>
          </article>
        </Container>
      </section>

      <section className={`our-silk-route-section page-section`}>
        <Container>
          <article className="content-holder">
            <center>
              <h2 className="section-title center content-title">
                Empowering The Community, Sustaining The Art, And Making A Mark
                In History.
              </h2>
              <hr className="small gradient no-m" />
              <br />

              <p>
                With great legacy comes great responsibility. The weavers'
                community that forms the backbone of Pashudh's path to success
                comprises about 750 families, all of whom live and breathe silk
                sarees. The organization is focused on equipping them with
                technological advancements, education, and anything else
                necessary to aid in their evolution into a self-sustaining and
                thriving community of weavers. Enabling the transition from
                individual home businesses that brand the industry of Kanjivaram
                Silks, the founders created a true business model. At the
                state-of-the-art factory, weavers could embrace stability of
                their skills and sustain their legacy over decades.
              </p>
            </center>
          </article>
        </Container>
      </section>
      <section className={`our-silk-route-section page-section`}>
        <Container>
          <article className="content-holder">
            <center>
              <h2 className="section-title center content-title">
                Heritage Transcending To Eternal Style.
              </h2>
              <hr className="small gradient no-m" />
              <br />

              <p>
                Pashudh aspires to present the magic of our looms before the
                world, with a level of finesse and elegance that has never been
                seen before. Furthermore, we wish to communicate our love for
                weaving silk sarees and our legacy through our products. One
                day, we hope the global community would think Pashudh every time
                they think of silk sarees.
              </p>
            </center>
          </article>
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
                  <picture>
                    <img src={founder1} alt="Founder" />
                  </picture>
                  {/* <div className={`placeHolder`}></div> */}
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
                  <picture>
                    <img src={founder2} alt="Founder2" />
                  </picture>
                  {/* <div className={`placeHolder`}></div> */}
                </div>
                <div className="content">
                  <p className="name">K.K. Rajkumar</p>
                </div>
              </div>
              <div className="member">
                <div className="img-wrapper">
                  <picture>
                    <img src={founder3} alt="Founder3" />
                  </picture>
                  {/* <div className={`placeHolder`}></div> */}
                </div>
                <div className="content">
                  <p className="name"> K.K.Suresh kumar</p>
                </div>
              </div>
              <div className="member">
                <div className="img-wrapper">
                  <picture>
                    <img src={founder4} alt="Founder4" />
                  </picture>
                  {/* <div className={`placeHolder`}></div> */}
                </div>
                <div className="content">
                  {/* <h3>CEO </h3> */}
                  <p className="name">Mrs. Jeevitha Rajkumar</p>
                </div>
              </div>
              <div className="member">
                <div className="img-wrapper">
                  <picture>
                    <img src={founder5} alt="Founder5" />
                  </picture>
                  {/* <div className={`placeHolder`}></div> */}
                </div>
                <div className="content">
                  {/* <h3>CMD </h3> */}
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
