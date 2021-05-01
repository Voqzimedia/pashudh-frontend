import { gql } from "@apollo/client";

export const getCategories = gql`
  query getCategories {
    categories {
      title
      subTitle
      slug
    }
  }
`;

export const getCategoriesPath = gql`
  query getCategories {
    categories {
      id
      slug
    }
  }
`;

export const getCategory = gql`
  query getCategory($slug: String!, $sort: String) {
    categories(where: { slug: $slug }) {
      id
      title
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
