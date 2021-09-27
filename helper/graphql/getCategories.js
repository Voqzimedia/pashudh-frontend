import { gql } from "@apollo/client";

export const getCategories = gql`
  query getCategories {
    categories(sort: "priority") {
      title
      subTitle
      slug
      tagLine
      description
      img {
        id
        url
        formats
      }
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
      title
      subTitle
      slug
      tagLine
      description
      img {
        id
        url
        formats
      }
    }
  }
`;
