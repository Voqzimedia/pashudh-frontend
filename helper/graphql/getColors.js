import { gql } from "@apollo/client";

export const getColors = gql`
  query getColors {
    colors {
      id
      name
      slug
    }
  }
`;

export const getColor = gql`
  query getColor($slug: String!, $sort: String, $limit: Int, $start: Int) {
    colors(where: { slug: $slug }) {
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
