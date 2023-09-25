import { gql } from "@apollo/client";

export const CREATE_CHAT_HEADER = gql`
  mutation CreateChatHeader($newChatHeader: newChatHeader!) {
    createChatHeader(newChatHeader: $newChatHeader) {
      id
    }
  }
`;

export const CREATE_CHAT_DETAIL = gql`
  mutation CreateChatDetail($senderID: ID!, $receiverID: ID!, $text: String!, $headerID: ID!, $mediaURL: String!) {
    createChatDetail(senderID: $senderID, receiverID: $receiverID, text: $text, headerID: $headerID, mediaURL: $mediaURL) {
      id
    }
  }
`;
