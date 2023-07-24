import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type Mutation {
    createNewTenant(input: CreateNewTenantInput!): Tenant!
    updateNode(input: UpdateNodeInput!): Tenant!
    addChildNode(input: AddChildNodeInput!): AddChildNodePayload!
    deleteNode(input: DeleteNodeInput!): DeleteNodePayload!
  }

  type Tenant {
    name: String
  }

  type Node {
    name: String!
    path: String!
    fullPath: String!
    pool: Int!
    hasChildren: Boolean!
    icon: String
    sort: Long!
    useTemplate: Boolean!
    templateName: String
  }

  type UpdateNodePayload {
    node: Node
  }

  type AddChildNodePayload {
    node: Node
  }

  type DeleteNodePayload {
    boolean: Boolean
  }

  input CreateNewTenantInput {
    name: String!
    icon: String
    description: String!
    pool: Int!
  }

  input UpdateNodeInput {
    path: String!
    name: String!
    updatedName: String!
    updatedIcon: String!
  }

  input AddChildNodeInput {
    path: String!
    nodeName: String!
    childNodeName: String!
    childNodeIcon: String!
  }

  input DeleteNodeInput {
    path: String!
    name: String!
  }
`;
