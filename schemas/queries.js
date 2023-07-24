import { gql } from 'graphql-tag';

export const getDummyData = gql`
query TestDummy{
    dummyData{
      id
      value
    }
  }
`

export const getTopNodes = gql`
query getTenantNode{
  topLevelNode{
    name
    path
    hasChildren
  }
}
`

export const getChildNodes = gql`
query getChildNodes($path:String!,$name: String!){
  nodeChildren(name: $name,path: $path){
    name
    path
    hasChildren
  }
}
`