import { gql } from "@apollo/client";

export const GET_ALL_POSTS = gql`
  query GetAllPost($currentUserID: ID!, $limit: Int!, $offset: Int!) {
    getAllPost(currentUserID: $currentUserID, limit: $limit, offset: $offset) {
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
`;

export const GET_ALL_USER = gql`
  query getAllUser {
    getAllUser {
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

export const GET_ALL_GROUP = gql`
  query GetAllGroup($userID: ID!) {
    getAllGroup(userID: $userID) {
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
