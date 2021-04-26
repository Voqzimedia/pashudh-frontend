import { gql } from "@apollo/client";

export const getProductList = gql`
  query getProductList {
    products {
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
`;

export const getProductSlug = gql`
  query getProductSlug {
    products {
      id
      slug
    }
  }
`;

export const getProduct = gql`
  query getProduct($slug: String!) {
    products(where: { slug: $slug }) {
      id
      name
      image {
        id
        url
        formats
      }
      GalleryImgs {
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
`;
