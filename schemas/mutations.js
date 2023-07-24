import { gql } from 'graphql-tag';

export const CREATE_TENANT_MUTATION = gql`
mutation createNewTenant($input: CreateNewTenantInput!) {
  createNewTenant(input: $input) {
    tenant {
      name
    }
  }
}`;

export const UPDATE_NODE_MUTATION = gql`
mutation updateNode($input:UpdateNodeInput!){
  updateNode(input: $input) {
    node {
      name
    }
  }
}
`

export const ADD_CHILD_NODE_MUTATION = gql`
mutation addChildNode($input:AddChildNodeInput!){
  addChildNode(input:$input){
    node {
      name
      path
    }
  }
}
`

export const DELETE_NODE_MUTATION = gql`
mutation deleteNode($input:DeleteNodeInput!){
  deleteNode(input:$input){
    boolean
  }
}
`