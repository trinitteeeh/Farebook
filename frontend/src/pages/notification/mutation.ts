import { gql } from "@apollo/client";

export const CREATE_NOTIFICATION = gql`
  mutation CreateNotification($userID: ID!, $profileID: ID!, $createdAt: String!, $text: String!) {
    createNotification(userID: $userID, profileID: $profileID, createdAt: $createdAt, text: $text) {
      id
    }
  }
`;
