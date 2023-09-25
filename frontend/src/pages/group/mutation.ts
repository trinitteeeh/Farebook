import { gql } from "@apollo/client";

export const CREATE_GROUP = gql`
  mutation CreateGroup($name: String!, $description: String!, $profileURL: String!, $privacy: String!) {
    createGroup(name: $name, description: $description, profileURL: $profileURL, privacy: $privacy) {
      id
    }
  }
`;

export const CREATE_GROUP_Member = gql`
  mutation CreateGroupMember($groupID: ID!, $memberID: ID!, $status: String!, $role: String!) {
    createGroupMember(groupID: $groupID, memberID: $memberID, status: $status, role: $role) {
      groupID
    }
  }
`;
export const DELETE_GROUP_MEMBER = gql`
  mutation DeleteGroupMember($groupID: ID!, $memberID: ID!) {
    deleteGroupMember(groupID: $groupID, memberID: $memberID) {
      groupID
    }
  }
`;
