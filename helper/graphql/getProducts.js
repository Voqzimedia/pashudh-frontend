import { gql } from "@apollo/client";

export const getProductList = gql`
  query getProductList($limit: Int, $start: Int) {
    products(limit: $limit, start: $start) {
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

export const searchProduct = gql`
  query searchProduct($query: String!, $limit: Int, $start: Int) {
    products(where: { name_contains: $query }, limit: $limit, start: $start) {
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
    products(where: { slug: $slug }, limit: 9) {
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
      ProductDetails {
        Material
        Fabric
        Colours
        Zari
        SareeLength
        Weight
        BlousePiece
        HowToWash
        Shipping
      }
      content
      price
      slug
    }
  }
`;
