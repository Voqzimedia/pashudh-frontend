import { gql } from "@apollo/client";

export const getClasses = gql`
  query getClasses {
    classes {
      id
      name
      slug
    }
  }
`;

export const getClass = gql`
  query getClass($slug: String!, $sort: String, $limit: Int, $start: Int) {
    classes(where: { slug: $slug }) {
      id
      name
      slug
      products(sort: $sort, limit: $limit, start: $start) {
        id
        name
        image {
          id
          url
          formats
        }
        StockDetails {
          isSoldOut
        }
        content
        price
        slug
      }
    }
  }
`;
