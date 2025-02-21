import {HexagonLayer, AmbientLight, PointLight, LightingEffect, DeckGL} from "deck.gl";
import Map from 'react-map-gl/maplibre';
import type {Color, PickingInfo, MapViewState} from '@deck.gl/core';
import {BASEMAP} from '@deck.gl/carto';
import 'maplibre-gl/dist/maplibre-gl.css';
import {dataArray} from "../data.ts";

type DataPoint = [longitude: number, latitude: number];

const ambientLight = new AmbientLight({
    color: [255, 255, 255],
    intensity: 1.0
});

const pointLight1 = new PointLight({
    color: [255, 255, 255],
    intensity: 0.8,
    position: [-0.144528, 49.739968, 80000]
});

const pointLight2 = new PointLight({
    color: [255, 255, 255],
    intensity: 0.8,
    position: [-3.807751, 54.104682, 8000]
});

const lightingEffect = new LightingEffect({ambientLight, pointLight1, pointLight2});

// const API_TOKEN = "WqO6oqPksKlAzikxnBbN"
// const MAP_STYLE = `https://api.maptiler.com/maps/streets/style.json?key=${API_TOKEN}`
// const MAP_STYLE = 'https://tiles.basemaps.cartocdn.com/gl/positron-gl-style/style.json'
// const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json';
const MAP_STYLE = BASEMAP.VOYAGER_NOLABELS

function getTooltip({object}: PickingInfo) {
    if (!object) {
        return null;
    }
    const lat = object.position[1];
    const lng = object.position[0];
    const count = object.count;

    return `\
    latitude: ${Number.isFinite(lat) ? lat.toFixed(6) : ''}
    longitude: ${Number.isFinite(lng) ? lng.toFixed(6) : ''}
    ${count} Accidents`;
}


const colorRange: Color[] = [
    [1, 152, 189],
    [73, 227, 206],
    [216, 254, 181],
    [254, 237, 177],
    [254, 173, 84],
    [209, 55, 78]
];

const INITIAL_VIEW_STATE: MapViewState = {
    longitude: -1.415727,
    latitude: 52.232395,
    zoom: 6.6,
    minZoom: 5,
    maxZoom: 15,
    pitch: 40.5,
    bearing: -27
};

function CustomMap() {
    // const [viewport, setViewport] = useState({
    //     latitude: 61.5240, // Широта центра карты (Россия)
    //     longitude: 105.3188, // Долгота центра карты (Россия)
    //     zoom: 3, // Уровень масштабирования
    //     width: '100%', // Ширина карты
    //     height: '100vh', // Высота карты
    // });
    const data = dataArray as DataPoint[]

    const layers = [
        new HexagonLayer<DataPoint>({
            id: 'heatmap',
            gpuAggregation: true,
            colorRange,
            coverage: 1,
            data,
            elevationRange: [0, 3000],
            elevationScale: data && data.length ? 50 : 0,
            extruded: true,
            getPosition: d => d,
            pickable: true,
            radius: 1000,
            upperPercentile: 100,
            material: {
                ambient: 0.64,
                diffuse: 0.6,
                shininess: 32,
                specularColor: [51, 51, 51]
            },

            transitions: {
                elevationScale: 3000
            }
        })
    ];

    return (
        <DeckGL
            layers={layers}
            effects={[lightingEffect]}
            initialViewState={INITIAL_VIEW_STATE}
            controller={true}
            getTooltip={getTooltip}
        >
            <Map
                initialViewState={{
                    longitude: -122.4,
                    latitude: 37.8,
                    zoom: 14
                }}
                style={{width: 600, height: 400}}
                mapStyle={MAP_STYLE}
                reuseMaps
            />
        </DeckGL>
    );
}

export default CustomMap
