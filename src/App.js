import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify'
import backgroundImage from "./images/AdobeStock_306938507.jpeg";

import {API, graphqlOperation} from 'aws-amplify'
import {getUser} from './graphql/queries'
import {createUser, updateUser} from './graphql/mutations'


function App(){

  const [premierLeagueStandings, fillStandings]=useState([])
  const [hasSetTeam, setTeam]=    useState(1)

  useEffect(
    () => {
      console.log("initial effect")
      fetchStandings()
      //fetchUserDetails()
    }, []
  );

  async function fetchUserDetails(){
    // 1) Fetch to see if the user has already selected their favourite team (do this by scanning the database for their username and seeing their chosen team)
    const userName = await(Auth.currentUserInfo()).username
    

  }

  function fetchStandings(){
    axios({ //Get Premier League Standings
      'method': "GET",
      'url': 'https://api-football-v1.p.rapidapi.com/v2/leagueTable/2790',
      'headers': {
          'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
          'x-rapidapi-key': 'a3e9667df8msh1fa39a70e177eadp14832bjsned2e9b17d6a1'
      },
    }).then((results)=>{
      var standingsFromAPI = results.data.api.standings[0]
      var ourStandings=[]
      for (var i=0; i<standingsFromAPI.length; i++) {
        ourStandings.push(standingsFromAPI[i])
      }
      fillStandings(ourStandings)
    })
  }

  if(hasSetTeam){
    return (
      <div style={{textAlign:'center', display:'block'}}>
                <h1>See the standings for the Premier League below!</h1>
                <img src={backgroundImage} style={{width:'500px'}} />
    
                <table style={{marginLeft:'auto', marginRight:'auto', position:'relative', top:'25px'}}>
                  <tbody>
                    <tr>
                      <th>Standing:</th><th>Team:</th><th>Points:</th>
                    </tr>
                    
                    {premierLeagueStandings.map(standing=>{
                      return (
                        <tr>
                          <td>{standing.rank}</td><td>{standing.teamName}</td><td>{standing.points}</td>
                          <td></td>
                        </tr>
                      )
                    })
                    }
                  </tbody>
                </table>
                <button onClick={()=>{clickityClick(click+1)}}>Change team</button>

                <AmplifySignOut style={{position:'relative',top:'82px'}}/>
      </div>
    )
  }
  else {
    return (
      <div>
        <h1>Please choose team out of the selection below</h1>








      </div>
    )
  }
}
  


export default withAuthenticator(App);
