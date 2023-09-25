import { gql } from "@apollo/client";

export const CREATE_FRIENDSHIP = gql`
  mutation CreateFriendship($userID: ID!, $friendID: ID!) {
    createFriendship(userID: $userID, friendID: $friendID) {
      userID
      friendID
    }
  }
`;

export const CONFIRM_FRIENDSHIP = gql`
  mutation ConfirmFriendship($userID: ID!, $friendID: ID!) {
    confirmFriendship(userID: $userID, friendID: $friendID) {
      userID
      friendID
    }
  }
`;

export const DELETE_FRIENDSHIP = gql`
  mutation DeleteFriendship($userID: ID!, $friendID: ID!) {
    deleteFriendship(userID: $userID, friendID: $friendID) {
      userID
      friendID
    }
  }
`;
