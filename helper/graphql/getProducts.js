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
        SKU
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
        SKU
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
        SKU
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

export const getProductByFilter = gql`
  query getProductByFilter(
    $limit: Int
    $start: Int
    $categories: [String]
    $class: [String]
    $color: [String]
    $price: Int
    $query: String
  ) {
    products(
      limit: $limit
      start: $start
      where: {
        classes: { slug_in: $class }
        colors: { slug_in: $color }
        categories: { slug_in: $categories }
        price_lte: $price
        name_contains: $query
      }
    ) {
      id
      name
      image {
        id
        url
        formats
      }
      StockDetails {
        isSoldOut
        SKU
      }
      content
      price
      slug
    }
  }
`;
