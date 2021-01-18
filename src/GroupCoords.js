

test_locations = [

    {
        id: 1,
        name: null,
        lat: 0,
        lng: 1,
        postcode: "N7 9RA"
    },
    {
        id:2,
        name: null,
        lat: 0,
        lng: 1,
        postcode: "NW5 2NJ"
    },
    {
        id: 3,
        name: null,
        lat: 4,
        lng: 4,
        postcode: "N7 2G6"
    },
    {
        id: 4,
        name: null,
        lat: 5,
        lng: 5,
        postcode: "NW4 6RF"
    }
]
// returns list of hashmaps of location objects based on postCodes
const groupLocations = (locations, distance) => {

}

const normaliseLatLng = (coordinate) => [coordinate[0] += 90, coordinate[1] += 180];

const getLocationPlaceInGrid = (locations, groupByDistance) => {
    grid = {};
    minLat = getMinLat(locations);
    minLng = getMinLng(locations);
    for (let l in locations){
        coord = [Math.floor((l.lat - minLat)/groupByDistance), Math.floor((l.lng - minLng)/groupByDistance)];
        if (grid[coord]){
            grid[coord].push([l.lat, l.lng]);
        }
        else {
            grid[coord] = [[l.lat, l.lng]];
        }
    }
}

const getMinLat = (locations) => Math.min(locations.map(x => x.lat));

const getMinLng = (locations) => Math.min(locations.map(x => x.lng));



const groupCoordinates = (locations) => {

}

const getPostCodeLatLng = (postCode) => {


}


