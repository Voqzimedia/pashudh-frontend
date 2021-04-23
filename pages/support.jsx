import { Container } from "reactstrap";

import dynamic from "next/dynamic";

const PageMotion = dynamic(() => import("../components/Motion/PageMotion"));
const Accordion = dynamic(() =>
  import("../components/utils/accordion").then((mod) => mod.Accordion)
);
const AccordionItem = dynamic(() =>
  import("../components/utils/accordion").then((mod) => mod.AccordionItem)
);

export default function Support() {
  const pageTitle = "Support";

  return (
    <PageMotion>
      <section className={`support-header-section page-section`}>
        <Container>
          <center>
            <h1 className="page-title" data-title={pageTitle}>
              {pageTitle}
            </h1>
          </center>
        </Container>
      </section>
      <section className={`support-content-section page-section`}>
        <Container>
          <div className="support-accordions-wrapper">
            <Accordion atomic={true}>
              <AccordionItem title={`Shipping Policy`}>
                <div className="support-item">
                  <article className="support-content">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Nam possimus repellat, saepe sunt, consequatur distinctio
                      temporibus quod eveniet corrupti id est minima inventore
                      asperiores obcaecati doloremque impedit ab totam soluta?
                    </p>
                  </article>
                </div>
              </AccordionItem>
              <AccordionItem title={`Cancellation Policy`}>
                <div className="support-item">
                  <article className="support-content">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Nam possimus repellat, saepe sunt, consequatur distinctio
                      temporibus quod eveniet corrupti id est minima inventore
                      asperiores obcaecati doloremque impedit ab totam soluta?
                    </p>
                  </article>
                </div>
              </AccordionItem>
              <AccordionItem title={`Exchange Policy`}>
                <div className="support-item">
                  <article className="support-content">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Nam possimus repellat, saepe sunt, consequatur distinctio
                      temporibus quod eveniet corrupti id est minima inventore
                      asperiores obcaecati doloremque impedit ab totam soluta?
                    </p>
                  </article>
                </div>
              </AccordionItem>
              <AccordionItem title={`General Terms And Conditions`}>
                <div className="support-item">
                  <article className="support-content">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Nam possimus repellat, saepe sunt, consequatur distinctio
                      temporibus quod eveniet corrupti id est minima inventore
                      asperiores obcaecati doloremque impedit ab totam soluta?
                    </p>
                  </article>
                </div>
              </AccordionItem>
              <AccordionItem title={`Terms Of Service`}>
                <div className="support-item">
                  <article className="support-content">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Nam possimus repellat, saepe sunt, consequatur distinctio
                      temporibus quod eveniet corrupti id est minima inventore
                      asperiores obcaecati doloremque impedit ab totam soluta?
                    </p>
                  </article>
                </div>
              </AccordionItem>
              <AccordionItem title={`Privacy Policy`}>
                <div className="support-item">
                  <article className="support-content">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Nam possimus repellat, saepe sunt, consequatur distinctio
                      temporibus quod eveniet corrupti id est minima inventore
                      asperiores obcaecati doloremque impedit ab totam soluta?
                    </p>
                  </article>
                </div>
              </AccordionItem>
            </Accordion>
          </div>
        </Container>
      </section>
    </PageMotion>
  );
}
