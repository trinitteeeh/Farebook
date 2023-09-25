import { gql } from "@apollo/client";

export const CREATE_POST = gql`
  mutation CreatePost($newPost: NewPost!) {
    createPost(inputPost: $newPost) {
      id
      postText
      userId
      privacy
      publishDate
    }
  }
`;

export const DELETE_POST = gql`
  mutation deletePost($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`;

export const CREATE_POST_PICTURE = gql`
  mutation CreatePostPicture($postID: ID!, $pictureURL: String!) {
    createPostPicture(postID: $postID, pictureURL: $pictureURL) {
      pictureURL
    }
  }
`;

export const CREATE_POST_LIKE = gql`
  mutation CreatePostLike($postID: ID!, $userID: String!) {
    createPostLike(postID: $postID, userID: $userID) {
      userId
    }
  }
`;

export const DELETE_POST_LIKE = gql`
  mutation DeletePostLike($postID: ID!, $userID: String!) {
    deletePostLike(postID: $postID, userID: $userID)
  }
`;

export const CREATE_POST_COMMENT = gql`
  mutation CreatePostComment($postID: ID!, $userID: ID!, $commentText: String!) {
    createPostComment(postID: $postID, userID: $userID, commentText: $commentText) {
      postId
    }
  }
`;

export const DELETE_POST_COMMENT = gql`
  mutation DeletePostComment($postID: ID!, $userID: ID!, $parentID: ID!) {
    deletePostComment(postID: $postID, userID: $userID, parentID: $parentID)
  }
`;

export const CREATE_COMMENT_REPLY = gql`
  mutation CreatePostCommentReply($postID: ID!, $userID: ID!, $commentText: String!, $parentID: ID!) {
    createPostCommentReply(postID: $postID, userID: $userID, commentText: $commentText, parentId: $parentID) {
      postId
    }
  }
`;
