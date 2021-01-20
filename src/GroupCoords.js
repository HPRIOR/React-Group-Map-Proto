// test_locations = [
//     {
//         id: 1,
//         lat: 0,
//         lng: 1,
//         norm_lng: 181,
//         norm_lat: 90,
//         postcode: "N7 9RA"
//     },
//     {
//         id:2,
//         lat: 0,
//         lng: 0,
//         norm_lng: 180,
//         nomr_lat: 91,
//         postcode: "NW5 2NJ"
//     },
//     {
//         id: 3,
//         lat: 4,
//         lng: 4,
//         norm_lng: 184,
//         norm_lat: 94,
//         postcode: "N7 2G6"
//     },
//     {
//         id: 4,
//         lat: 4,
//         lng: 5,
//         norm_lat: 94,
//         norm_lng: 185,
//         postcode: "NW4 6RF"
//     }
// ]

// returns list of hashmaps of location objects based on postCodes
const groupLocations = (locations, distance) => {
    const grid = getLocationPlaceInGrid(locations, distance);
    const adjacentGridCoords = groupByAdjecentTiles(grid);
    let adjacentLocations = [];
    for (let coordGroup of adjacentGridCoords){
        let group = []
        for (let gridCoord of coordGroup){
            group = group.concat(grid[gridCoord])
        }
        adjacentLocations.push(group)
    }
    return adjacentLocations;
}

const getLocationPlaceInGrid = (locations, groupByDistance) => {
    let grid = {};
    const minLat = Math.min(...locations.map(x => x.norm_lat));
    const minLng = Math.min(...locations.map(x => x.norm_lng));
    for (let l of locations){
        const coord = [Math.floor((l.norm_lat - minLat)/groupByDistance), Math.floor((l.norm_lng - minLng)/groupByDistance)];
        if (grid[coord]){
            grid[coord].push(l);
        }
        else {
            grid[coord] = [l];
        }
    }
    return grid
}

const groupByAdjecentTiles = (grid) => {
    let tiles = new Set(Object.keys(grid));
    let visited = new Set();
    const group = (current_square, groupSet = new Set()) =>{
        if (!tiles.has(current_square) || visited.has(current_square)){
            return null;
        }
        visited.add(current_square)
        groupSet.add(current_square)
        const directions = [[0, 1], [1,0], [-1, 0],[0, -1]]
        for (let d of directions){
            const newDirection = String(parseInt(current_square[0]) + d[0]) + ',' + String(parseInt(current_square[2]) + d[1])
            group(newDirection, groupSet)
        }
        return groupSet
    }
    let adjacentGroups = []
    for (let tile of tiles){
       adjacentGroups.push(group(tile))
    }
    return adjacentGroups.filter(x => x != null);
}

export default groupLocations;

// const grid = getLocationPlaceInGrid(test_locations, 1)
// const adjacentGridCoords = groupByAdjecentTiles(grid)
// console.log(grid)
// console.log(adjacentGridCoords)

// for (let set of adjacentGridCoords){
//     for (let coord of set){
//         console.log(grid[coord])
//     }
// }
// console.log(groupLocations(test_locations, 1));