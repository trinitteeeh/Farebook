import { gql } from "@apollo/client";

export const CREATE_STORY = gql`
  mutation CreateStory($newStory: NewStory!) {
    createStory(inputStory: $newStory) {
      id
      backgroundStyle
    }
  }
`;
