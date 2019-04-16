import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

const LAUNCHES_QUERY = gql`
    query LaunchesQuery{
        flights{
        flight_number
        mission_name
    }
}
`;
export class launchers extends Component {
  render() {
    return (
      <div>
        <h1 className="display-4 my-3">flights</h1>
        <Query query={LAUNCHES_QUERY}>
        {
            ({loading, error, data})=>{
                if(loading) return <h4>loading</h4>
                if(error) console.log(error)
                return <h1>test</h1>
            }
        }
        </Query>
      </div>
    )
  }
}

export default launchers
