import { gql } from "@apollo/client";

export const GETUSER = gql`
  query GetUserByToken($token: String!) {
    getUserByToken(token: $token) {
      id
      firstName
      surename
      email
      gender
      dob
      profileURL
    }
  }
`;
