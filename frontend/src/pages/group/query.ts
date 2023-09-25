import { gql } from "@apollo/client";

export const GET_GROUP_BY_USER_ID = gql`
  query GetGroupsByUserID($userID: ID!) {
    getGroupsByUserID(userID: $userID) {
      id
      name
      description
      members {
        user {
          id
          firstName
          surename
          profileURL
        }
        role
        status
      }
      profileURL
      posts {
        id
        postText
        publishDate
        privacy
        user {
          id
          firstName
          surename
          profileURL
        }
        likesCount
        mediaLink
        isLiked
      }
    }
  }
`;
export const GET_GROUP_RECOMMENDATION = gql`
  query GetGroupRecommendation($userID: ID!) {
    getGroupRecommendation(userID: $userID) {
      id
      name
      description
      members {
        user {
          id
          firstName
          surename
          profileURL
        }
        role
        status
      }
      profileURL
      posts {
        id
        postText
        publishDate
        privacy
        user {
          id
          firstName
          surename
          profileURL
        }
        likesCount
        mediaLink
        isLiked
      }
    }
  }
`;

export const GET_GROUP_BY_ID = gql`
  query GetGroupByID($id: ID!, $userID: ID!) {
    getGroupByID(id: $id, userID: $userID) {
      id
      name
      description
      members {
        user {
          id
          firstName
          surename
          profileURL
        }
        role
        status
      }
      profileURL
      posts {
        id
        postText
        publishDate
        privacy
        user {
          id
          firstName
          surename
          profileURL
        }
        likesCount
        mediaLink
        isLiked
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
