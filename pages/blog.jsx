import { Container } from "reactstrap";

export default function Blog() {
  const pageTitle = "Silken Symphonies";
  return (
    <>
      <section className={`blog-section page-section`}>
        <Container>
          <center>
            <h1 className="page-title" data-title={pageTitle}>
              {pageTitle}
            </h1>
          </center>
        </Container>
      </section>
    </>
  );
}
