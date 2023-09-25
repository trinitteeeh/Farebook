import { gql } from "@apollo/client";

export const RESET_PASSWORD = gql`
  mutation ResetPassword($id: ID!, $newPassword: String!) {
    resetPassword(id: $id, newPassword: $newPassword)
  }
`;
