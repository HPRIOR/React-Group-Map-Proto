import './App.css';
import MapInfo from './MapImporter.js'
//import SideBar  from './SideBar'
import React, { useEffect, useState} from 'react'
import nextId from "react-id-generator";
import PostCodeInputField from './PostCodeInputField'


function App() {

  const [locations, setLocations] = useState([]);
  const [input, setInput] = useState('');
  const [search, setInputWithButton] = useState(null)

  const removeLocation = (id) => {
    if (locations.length > 0){
      const deleted_location = locations.find(l => l.id === id)
      deleted_location.marker.setMap(null)
      setLocations(locations => locations.filter(l => l.id !== id));
    }
  }


  
  useEffect(() => {
    const fetchPostCode = async () => {
      if (search !== null){
          const url = "https://api.postcodes.io/postcodes/" + search;
          await fetch(url,{headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }})
            .then(response => response.json())
            .then(data => {
              if (data.status === 200){
                const marker = new window.google.maps.Marker(
                  {
                    position: {lat: data.result.latitude, lng: data.result.longitude},
                    map: window.map
                  }
                )
                setLocations(previousLocations => [...previousLocations, {
                postcode: data.result.postcode,
                lng: data.result.longitude,
                lat: data.result.latitude,
                norm_lng: data.result.longitude + 180,
                norm_lat: data.result.latitude + 90,
                id: nextId(),
                marker: marker
              }])
                setInput('');
              }
            })
          }
        }
        fetchPostCode();
      }, [search])

      return (
    <div id="main-window">
      <MapInfo />
      {/* <div id="map"></div>
      <SideBar/> */}
      <PostCodeInputField 
      locations={locations} 
      postCode= {input}
      handleInputChange={e => setInput(e.target.value)} 
      addButtonCallBack={() => setInputWithButton(input)}
      removeButtonCallBack={removeLocation}
      />
    </div>
  );
}

export default App;
