import { gql } from "@apollo/client";

export const GET_ALL_NOTIFICATION = gql`
  query GetAllNotification($userID: ID!) {
    getAllNotification(userID: $userID) {
      id
      user {
        id
        firstName
        surename
        profileURL
      }
      profile {
        id
        firstName
        surename
        profileURL
      }
      createdAt
      text
    }
  }
`;
