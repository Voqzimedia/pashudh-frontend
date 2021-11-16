import InstagramFeed from "../../components/utils/InstagramFeed";
// import "react-ig-feed/dist/index.css";
import { Container } from "reactstrap";

const instaToken = process.env.NEXT_PUBLIC_INSTAGRAM_TOKEN;

const InstaFeed = () => {
  return (
    <section className="page-section insta-section" id="insta">
      <div className="section-main">
        <Container className="section-header">
          <center>
            <div className="content-holder">
              <p className="sub-title">Instagram</p>
              <hr className="small gradient no-m" />
              <h2 className="title">#pashudh</h2>

              <br />
              <p>
                Featuring our Instagram page where you can connect, network, and
                stay on top of all that we have to offer!
              </p>
            </div>
          </center>
        </Container>
        <div className="section-body">
          <Container>
            <InstagramFeed token={instaToken} counter="7" />
          </Container>
        </div>
      </div>
    </section>
  );
};

export default InstaFeed;
