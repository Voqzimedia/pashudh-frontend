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
  query getClass($slug: String!, $sort: String) {
    classes(where: { slug: $slug }) {
      id
      name
      slug
      products(sort: $sort) {
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
