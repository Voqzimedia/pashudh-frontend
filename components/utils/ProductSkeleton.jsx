import React from "react";
import { Row, Col } from "reactstrap";
import ContentLoader from "react-content-loader";

export default function ProductSkeleton() {
  return (
    <Row>
      <Col md="4" className={`product-skeleton`}>
        <ContentLoader
          width={350}
          height={600}
          viewBox="0 0 450 650"
          backgroundColor="#f0f0f0"
          foregroundColor="#dedede"
        >
          <rect x="43" y="627" rx="4" ry="4" width="271" height="9" />
          <rect x="44" y="643" rx="3" ry="3" width="119" height="6" />
          <rect x="42" y="77" rx="10" ry="10" width="388" height="517" />
        </ContentLoader>
      </Col>
      <Col md="4" className={`product-skeleton`}>
        <ContentLoader
          width={350}
          height={600}
          viewBox="0 0 450 650"
          backgroundColor="#f0f0f0"
          foregroundColor="#dedede"
        >
          <rect x="43" y="627" rx="4" ry="4" width="271" height="9" />
          <rect x="44" y="643" rx="3" ry="3" width="119" height="6" />
          <rect x="42" y="77" rx="10" ry="10" width="388" height="517" />
        </ContentLoader>
      </Col>
      <Col md="4" className={`product-skeleton`}>
        <ContentLoader
          width={350}
          height={600}
          viewBox="0 0 450 650"
          backgroundColor="#f0f0f0"
          foregroundColor="#dedede"
        >
          <rect x="43" y="627" rx="4" ry="4" width="271" height="9" />
          <rect x="44" y="643" rx="3" ry="3" width="119" height="6" />
          <rect x="42" y="77" rx="10" ry="10" width="388" height="517" />
        </ContentLoader>
      </Col>
    </Row>
  );
}
