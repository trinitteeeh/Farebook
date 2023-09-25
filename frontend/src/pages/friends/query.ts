import { gql } from "@apollo/client";

export const GET_ALL_FRIEND_REQUEST = gql`
  query GetAllFriendRequests($userID: ID!) {
    getAllFriendRequests(userID: $userID) {
      id
      firstName
      surename
      profileURL
    }
  }
`;

export const GET_ALL_FRIEND_SUGGESTIONS = gql`
  query GetAllFriendSuggestions($userID: ID!) {
    getAllFriendSuggestions(userID: $userID) {
      id
      firstName
      surename
      profileURL
    }
  }
`;

export const GET_ALL_FRIENDS = gql`
  query GetAllFriends($userID: ID!) {
    getAllFriends(userID: $userID) {
      id
      firstName
      surename
      profileURL
      gender
    }
  }
`;


