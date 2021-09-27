import { gql } from "@apollo/client";

export const getClasses = gql`
  query getClasses {
    classes(sort: "priority") {
      id
      title
      slug
      description
      tagLine
      subTitle
      img {
        id
        url
        formats
      }
    }
  }
`;

export const getClassesPath = gql`
  query getClasses {
    classes(sort: "priority") {
      id
      slug
    }
  }
`;

export const getClass = gql`
  query getClass($slug: String!) {
    classes(where: { slug: $slug }) {
      id
      title
      slug
      description
      tagLine
      subTitle
      img {
        id
        url
        formats
      }
    }
  }
`;
