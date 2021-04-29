import { gql } from "@apollo/client";

export const getTestimonials = gql`
  query getTestimonials {
    testimonials {
      User {
        username
        ProfilePic {
          url
          formats
        }
      }
      NickName
      Testimonial
      Approved
    }
  }
`;
