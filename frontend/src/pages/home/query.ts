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

export const GET_LIKES_COUNT = gql`
  query GetLikesCount($postId: ID!) {
    getLikesCount(postId: $postId)
  }
`;

export const GET_POST_COMMENTS = gql`
  query GetPostComments($postID: ID!) {
    getPostComments(postID: $postID) {
      user {
        id
        firstName
        surename
        email
        profileURL
      }
      id
      postId
      commentText
      replies {
        id
        commentText
        user {
          id
          firstName
          surename
          email
          profileURL
        }
      }
    }
  }
`;

export const GET_POST_BY_USER_ID = gql`
  query GetPostByUserId($userID: ID!) {
    getPostByUserId(userId: $userID) {
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
