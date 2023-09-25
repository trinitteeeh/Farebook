import { gql } from "@apollo/client";

export const GET_ALL_REELS = gql`
  query GetAllReels($limit: Int!, $offset: Int!) {
    getAllReels(limit: $limit, offset: $offset) {
      id
      text
      mediaURL
      user {
        firstName
        surename
      }
    }
  }
`;
