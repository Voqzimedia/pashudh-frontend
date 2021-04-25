import { gql } from "@apollo/client";

export const getProductList = gql`
  query getProductList {
    products {
      id
      name
      image {
        id
        url
      }
      StockDetails {
        isSoldOut
      }
      content
      price
      slug
    }
  }
`;

export const getProductSlug = gql`
  query getProductSlug {
    products {
      id
      slug
    }
  }
`;
