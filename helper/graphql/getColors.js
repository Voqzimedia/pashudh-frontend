import { gql } from "@apollo/client";

export const getColors = gql`
  query getColors {
    colors(sort: "priority") {
      id
      title
      slug
    }
  }
`;

export const getColorsPath = gql`
  query getColors {
    colors(sort: "priority") {
      id
      slug
    }
  }
`;

export const getColor = gql`
  query getColor($slug: String!) {
    colors(where: { slug: $slug }) {
      id
      title
      slug
    }
  }
`;
