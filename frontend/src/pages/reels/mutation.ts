import { gql } from "@apollo/client";

export const CREATE_REEL = gql`
  mutation CreateReel($newReel: NewReel!) {
    createReel(inputReel: $newReel) {
      id
    }
  }
`;
