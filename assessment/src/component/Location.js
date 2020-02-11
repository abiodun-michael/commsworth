import React, {useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import {AuthContext} from '../context/auth';

const FETCH_LOCATION_QUERY = gql`
{
  loadLocations{
  latitude
  location
  longitude
}
}
`;

export function Location(props){

  const {user} = useContext(AuthContext);
  if(!user){
    props.history.push('/');
}
  
  const {loading, data} = useQuery(FETCH_LOCATION_QUERY);
         return(
          loading ? (
            <p>Please wait we are loading your data</p>
          ):(
            <main>
               <Map google={props.google} zoom={14}>
              
            {
              data.loadLocations.map(function(lod,i){
              return(
                <Marker key={i}
                  lat={lod.latitude}
                  lng={lod.longitude}
                  text={lod.location}
                />
              )
              })
              }
              </Map>
            </main>

          )
          
        );
    }

  export default   GoogleApiWrapper({
      apiKey: ('AIzaSyCn3U0hO2MEc3A1GA4cWmkJFD2HAGyvaGk'),
    })(Location)