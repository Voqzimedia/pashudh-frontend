import { gql } from "@apollo/client";

export const getGiftCards = gql`
  query getGiftCards {
    giftcards {
      id
      name
      slug
      price
      description
    }
  }
`;

export const getGiftCardSlug = gql`
  query getGiftCardSlug {
    giftcards {
      id
      slug
    }
  }
`;

export const getGiftCard = gql`
  query getGiftCard($slug: String!) {
    giftcards(where: { slug: $slug }) {
      id
      name
      slug
      price
      description
    }
  }
`;
