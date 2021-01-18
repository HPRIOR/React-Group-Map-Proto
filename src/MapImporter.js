import './Map.css'
import {Loader} from "@googlemaps/js-api-loader"
import React, { useEffect} from 'react'

const MapInfo = () => {
    useEffect(() => {
      const loader = new Loader({
          apiKey: "AIzaSyBM1_xC_FX8KU5JyDLDmEYyFoon_AYigbg",
        version: "weekly"
      });
      loader.load().then(()=>{
          window.map = new window.google.maps.Map(document.getElementById('map'), {
              zoom: 6,
              center: {
                  lat: 50.736129,
                  lng: -1.98822,
                }
              })
          });
      }, []);

    return(
        <div id="map"></div>
    );
}


export default MapInfo;