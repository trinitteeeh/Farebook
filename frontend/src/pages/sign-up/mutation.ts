import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation AddUser($inputUser: NewUser!) {
    createUser(inputUser: $inputUser) {
      id
      firstName
      surename
      email
      gender
      dob
    }
  }
`;
