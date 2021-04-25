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
