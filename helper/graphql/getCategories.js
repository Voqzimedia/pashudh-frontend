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

export const getCategory = gql`
  query getCategory($slug: String!) {
    categories(where: { slug: $slug }) {
      id
      title
      slug
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
  }
`;
