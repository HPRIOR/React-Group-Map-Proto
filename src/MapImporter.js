import './Map.css'
import {Loader} from "@googlemaps/js-api-loader"
import React, { useEffect} from 'react'

const MapInfo = () => {
    useEffect(() => {
      const loader = new Loader({
          apiKey: "AIzaSyA2R5x0ZAR8nkEtHSsJ7hIc1mELB9LlO2Q",
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