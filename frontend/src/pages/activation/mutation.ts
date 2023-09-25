import { gql } from "@apollo/client";

export const ACTIVATE_ACCOUNT = gql`
  mutation ActivateAccount($id: ID!) {
    activateAccount(id: $id)
  }
`;
