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
      isSoldOut
      StockDetails {
        Stock
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
      isSoldOut
      StockDetails {
        Stock
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

export const getProductsCount = gql`
  query productCount(
    $categories: [String]
    $class: [String]
    $color: [String]
    $price: Int
    $query: String
    $isSoldOut: Boolean
    $thisFor: String
    $priceMax: Int
  ) {
    productsConnection(
      where: {
        classes: { slug_in: $class }
        colors: { slug_in: $color }
        categories: { slug_in: $categories }
        price_lte: $priceMax
        price_gte: $price
        name_contains: $query
        isSoldOut: $isSoldOut
        thisFor: $thisFor
      }
    ) {
      aggregate {
        count
      }
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
      categories {
        slug
      }
      GalleryImgs {
        id
        url
        formats
      }
      gallery {
        main {
          id
          url
          formats
        }
        pallu {
          id
          url
          formats
        }
        border {
          id
          url
          formats
        }
        blouse {
          id
          url
          formats
        }
      }
      isSoldOut
      StockDetails {
        Stock
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
    $priceMax: Int
    $query: String
    $sort: String
    $isSoldOut: Boolean
    $thisFor: String
  ) {
    products(
      limit: $limit
      start: $start
      where: {
        classes: { slug_in: $class }
        colors: { slug_in: $color }
        categories: { slug_in: $categories }
        price_lte: $priceMax
        price_gte: $price
        name_contains: $query
        isSoldOut: $isSoldOut
        thisFor: $thisFor
      }
      sort: $sort
    ) {
      id
      name
      image {
        id
        url
        formats
      }
      isSoldOut
      StockDetails {
        Stock
        SKU
      }
      content
      price
      slug
    }
  }
`;
