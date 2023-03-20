import { gql, useQuery } from '@apollo/client';
import React, { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/features/AuthSlice';

const FEED_QUERY = gql`{ 
    search (type: REPOSITORY, query: "big user:MekniWassime", first:50) {
      edges {
        node {
          ... on Repository {
            name
          }
        }
      }
    }
  }`

function Home() {
    //const { data, loading, error, called, networkStatus, } = useQuery(FEED_QUERY);

    // useMemo(() => console.log(data), [data]);
    // useMemo(() => console.log(loading), [loading]);
    // useMemo(() => console.log(error), [error]);
    // useMemo(() => console.log(called), [called]);
    // useMemo(() => console.log(networkStatus), [networkStatus]);

    const dispatch = useDispatch();
    return (
        <>
            <div>Home</div>
            <button onClick={() => dispatch(logout())}>logout</button>
        </>
    )
}

export default Home