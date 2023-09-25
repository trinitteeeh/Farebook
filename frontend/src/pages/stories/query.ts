import { gql } from "@apollo/client";

export const GET_ALL_STORY_BY_USERID = gql`
  query GetStoryByUserId($userID: ID!) {
    getStoryByUserId(userID: $userID) {
      id
      text
      backgroundStyle
      fontType
      pictureURL
      user {
        firstName
        surename
        profileURL
      }
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
