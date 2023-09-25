import { gql } from "@apollo/client";

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

export const GET_ALL_CHAT_HEADERS = gql`
  query GetAllChatHeaders($userID: ID!) {
    getAllChatHeaders(userID: $userID) {
      id
      user1 {
        id
        firstName
        surename
        profileURL
      }
      user2 {
        id
        firstName
        surename
        profileURL
      }
      createdAt
    }
  }
`;

export const GET_ALL_CHAT_DETAIL = gql`
  query GetAllChat($headerID: ID!) {
    getAllChat(headerID: $headerID) {
      id
      sender {
        id
        firstName
        surename
        profileURL
      }
      receiver {
        id
        firstName
        surename
        profileURL
      }
      createdAt
      text
      mediaURL
    }
  }
`;
