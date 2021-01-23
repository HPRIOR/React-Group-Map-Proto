import "./App.css";
import MapInfo from "./MapImporter.js";
//import SideBar  from './SideBar'
import React, { useEffect, useState } from "react";
import nextId from "react-id-generator";
import PostCodeInputField from "./PostCodeInputField";
import groupLocations from "./GroupCoords"

function App() {
  const [locations, setLocations] = useState([]);
  const [input, setInput] = useState("");
  const [search, setInputWithButton] = useState("");
  const [markers, setMarkers] = useState([]);
  const [distance, setGroupDistance] = useState(1);

  const removeLocation = id => {
      // const deleted_marker = markers.find(m => m.id === id);
      // deleted_marker.marker.setMap(null);
      // console.log(deleted_marker)
      setMarkers(markers => {
        const deleted_marker = markers.find(m => m.id === id);
        deleted_marker.marker.setMap(null);
        const new_state = markers.filter(m => m.id !== id);
        // console.log(id)
        // console.log(deleted_marker)
        // console.log(new_state)
        return new_state;}
        )
      setLocations((locations) => {
        const newState = locations.filter((l) => l.id !== id);
        return newState
      });
  };

  // get postcode data, and add location object to location array
  useEffect(() => {
    if (search.length > 0){
      const fetchPostCode = async () => {
        if (search !== null) {
          const url = "https://api.postcodes.io/postcodes/" + search;
          await fetch(url, {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.status === 200) 
                changeLocationState(data)
            });
        }
      };
      fetchPostCode();
    }
    
  }, [search]);

  const changeLocationState = data => {
    const id = nextId();
    setLocations((previousLocations) => {
      const newState = [
      ...previousLocations,
      {
        postcode: data.result.postcode,
        lng: data.result.longitude,
        lat: data.result.latitude,
        norm_lng: data.result.longitude + 180,
        norm_lat: data.result.latitude + 90,
        id: id,
      },
    ]
    return newState;
  });
    setInput("");
    setInputWithButton("");
  }

  // TODO state of colours should created. If length of groups is >/< than number of colours, new colours added/removed 
  // from state. Groups draw their colours from the colour state 
  useEffect(() => {
    if (locations.length === 0) return;
    const groups = groupLocations(locations, distance)
    let group_markers = []
    for(let group of groups){
      var groupColour = Math.floor(Math.random()*16777215).toString(16);
      let icon = generateIconWith("#" + groupColour)
      for (let location of group){
        const marker = new window.google.maps.Marker({
          map: window.map,
          position: new window.google.maps.LatLng(location.lat, location.lng),
          icon: icon
        })
        group_markers.push({id:location.id, marker: marker});
      }
    }
    setMarkers(marker => {
      marker.forEach(m => m.marker.setMap(null));
      return group_markers});
   },[locations, distance]);

  const generateIconWith = colour => {
    return {
        path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z M -2,-30 a 2,2 0 1,1 4,0 2,2 0 1,1 -4,0',
        fillColor: colour,
        fillOpacity: 1,
        strokeColor: '#000',
        strokeWeight: 2,
        scale: 1,
   };
}
 

  return (
    <div id="main-window">
      <MapInfo />
      {/* <div id="map"></div>
      <SideBar/> */}
      <PostCodeInputField
        locations={locations}
        postCode={input}
        handleInputChange={(e) => setInput(e.target.value)}
        addButtonCallBack={() => setInputWithButton(input)}
        removeButtonCallBack={removeLocation}
      />
    </div>
  );
}

export default App;
//