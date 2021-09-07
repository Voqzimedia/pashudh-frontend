import { gql } from "@apollo/client";

export const getCategories = gql`
  query getCategories {
    categories(sort: "priority") {
      title
      subTitle
      slug
      tagLine
      description
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
  query getCategory($slug: String!, $sort: String, $limit: Int, $start: Int) {
    categories(where: { slug: $slug }, sort: "id") {
      id
      title
      slug
      tagLine
      description
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
