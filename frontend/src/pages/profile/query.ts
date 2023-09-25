import { gql } from "@apollo/client";

export const GET_PICTURE_BY_USER_ID = gql`
  query GetPictureByUserID($userID: ID!) {
    getPictureByUserID(userID: $userID)
  }
`;

export const GET_REELS_BY_USER_ID = gql`
  query GetReelsURLByUserID($userID: ID!) {
    getReelsURLByUserID(userID: $userID)
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

export const GET_USER_BY_ID = gql`
  query GetUserByID($id: ID!) {
    getUserByID(id: $id) {
      id
      firstName
      surename
      profileURL
      email
      dob
      gender
    }
  }
`;
