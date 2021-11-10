import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
/* eslint import/no-webpack-loader-syntax: off */
import mapboxgl from '!mapbox-gl';
import { AG_TYPES, LAYER_SLIDERS } from '../data';
import { setSelected } from '../../store/actions/locations';
import './styles.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;

const SOCIOECONOMIC_URL =
  'https://gist.githubusercontent.com/ampu3ro/34609e91dedb19591e3d57203c9b4162/raw/c9fc9c2bf756f3e160e2f865b2ceba16c79f10d8/nyc_socio_economic.geojson';

const PANTRY_URL =
  'https://gist.githubusercontent.com/ampu3ro/1cc8e3347805d344c1b3a3638d25caa1/raw/8d76a1d543551097559e2bdcf4566f20262bd313/nyc_pantries.geojson';

const PAINT_COLOR = [
  ...AG_TYPES.filter((d) => d.label)
    .map((d) => [d.option, d.color])
    .flat(),
  '#ccc',
];

const Map = ({ showLayers, showPantries }) => {
  const mapRef = useRef(null);
  const [mapBase, setMapBase] = useState(null);
  const [featureId, setFeatureId] = useState('');
  const selectedId = useRef();

  const location = useSelector((state) => state.location);
  const filters = useSelector((state) => state.filters);
  const layers = useSelector((state) => state.layers);
  const selected = useSelector((state) => state.selected);

  const dispatch = useDispatch();

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapRef.current,
      style: 'mapbox://styles/ampu3ro/cktki8cej537c17mikqn1tp1n',
      center: [-73.98, 40.7],
      zoom: 10,
    });

    const popup = new mapboxgl.Popup();

    const hoverPopup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
    });

    map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

    map.on('load', () => {
      map.addSource('socioeconomic-data', {
        type: 'geojson',
        data: SOCIOECONOMIC_URL,
      });

      map.addLayer({
        id: 'socioeconomic-layer',
        source: 'socioeconomic-data',
        type: 'fill',
        paint: {
          'fill-color': '#8900e1',
          'fill-opacity': 0,
        },
      });

      map.addSource('pantry-data', {
        type: 'geojson',
        data: PANTRY_URL,
      });

      map.addLayer({
        id: 'pantry-layer',
        source: 'pantry-data',
        type: 'symbol',
        layout: {
          'icon-image': 'convenience',
          visibility: 'none',
        },
      });

      map.addSource('farms-data', {
        type: 'geojson',
        data: null,
      });

      const areaRoot = ['sqrt', ['number', ['get', 'area'], 10000]];

      map.addLayer({
        id: 'farms-layer',
        source: 'farms-data',
        type: 'circle',
        paint: {
          'circle-radius': [
            'interpolate',
            ['linear'],
            ['zoom'],
            10,
            ['/', areaRoot, 20],
            15,
            ['/', areaRoot, 10],
          ],
          'circle-color': ['match', ['get', 'type'], ...PAINT_COLOR],
          'circle-opacity': {
            base: 2.72,
            stops: [
              [8, 0.6],
              [14, 1],
            ],
          },
          'circle-stroke-width': [
            'case',
            ['boolean', ['feature-state', 'selected'], false],
            1.5,
            0,
          ],
          'circle-stroke-color': '#000',
        },
      });

      map.on('click', 'farms-layer', (e) => {
        e.preventDefault();
        if (!e.features.length) return;
        const { id } = e.features[0];
        selectedId.current = id;
        setFeatureId(id);
      });

      map.on('click', (e) => {
        if (e.defaultPrevented || !selectedId.current) return;
        map.setFeatureState(
          { source: 'farms-data', id: selectedId.current },
          { selected: false }
        );
        selectedId.current = null;
        dispatch(setSelected(null));
      });

      map.on('mouseenter', 'farms-layer', (e) => {
        if (e.features.length) {
          map.getCanvas().style.cursor = 'pointer';
          const { coordinates } = e.features[0].geometry;
          const { name } = e.features[0].properties;
          hoverPopup.setLngLat(coordinates).setHTML(name).addTo(map);
        }
      });

      map.on('mouseleave', 'farms-layer', () => {
        map.getCanvas().style.cursor = '';
        hoverPopup.remove();
      });

      map.on('mouseenter', 'pantry-layer', (e) => {
        map.getCanvas().style.cursor = 'pointer';
        const { coordinates } = e.features[0].geometry;
        const { Name } = e.features[0].properties;
        hoverPopup.setLngLat(coordinates).setHTML(Name).addTo(map);
      });

      map.on('mouseleave', 'pantry-layer', () => {
        map.getCanvas().style.cursor = '';
        hoverPopup.remove();
      });

      map.on('click', 'pantry-layer', (e) => {
        map.getCanvas().style.cursor = 'pointer';
        const { coordinates } = e.features[0].geometry;
        const { Lat, Lon, Zipcode, ...fields } = e.features[0].properties;
        const html = Object.entries(fields)
          .map(([k, v]) => `<b>${k}</b>: ${v}`)
          .join('<br>');
        popup.setLngLat(coordinates).setHTML(html).addTo(map);
      });

      setMapBase(map);
    });
  }, [dispatch]);

  useEffect(() => {
    const { options } = location;
    if (options && featureId) {
      const clicked = options.filter((d) => d.featureId === featureId)[0];
      const { center, ...rest } = clicked; // avoid flying
      dispatch(setSelected(rest));
    }
  }, [location, featureId, dispatch]);

  useEffect(() => {
    let mapData = JSON.parse(JSON.stringify(location.data)); // deep copy for mutation below
    if (!mapBase || !mapData) return;

    mapData.features = mapData.features.map((d) => {
      let { properties } = d;
      properties.environments = String(properties.environments); // mapbox won't filter an array
      return { ...d, properties };
    });

    mapBase.getSource('farms-data').setData(mapData);
  }, [location, mapBase]);

  useEffect(() => {
    if (!mapBase || !filters.types || !filters.environments) return;

    const pointFilters = [
      'all',
      ['in', 'type', ...filters.types],
      ['in', 'environments', ...filters.environments],
    ];
    mapBase.setFilter('farms-layer', pointFilters);
  }, [filters, mapBase]);

  useEffect(() => {
    if (!mapBase || !selected) return;

    if (selected.featureId) {
      selectedId.current = selected.featureId;
      mapBase.setFeatureState(
        { source: 'farms-data', id: selected.featureId },
        { selected: true }
      );
    }
    if (selected.center) {
      mapBase.flyTo({
        center: selected.center,
        zoom: 14,
      });
    }
  }, [selected, mapBase]);

  useEffect(() => {
    if (!mapBase) return;
    let opacity;
    if (showLayers && Object.keys(layers).length) {
      const x = 1 / LAYER_SLIDERS.length;
      const add = Object.entries(layers).map(([k, v]) => {
        const feature = ['to-number', ['get', k]];
        const between = ['all', ['>=', feature, v[0]], ['<=', feature, v[1]]];
        return ['case', between, x, 0];
      });
      opacity = ['+', ...add];
    } else {
      opacity = 0;
    }
    mapBase.setPaintProperty('socioeconomic-layer', 'fill-opacity', opacity);
  }, [layers, showLayers, mapBase]);

  useEffect(() => {
    if (!mapBase) return;
    mapBase.setLayoutProperty(
      'pantry-layer',
      'visibility',
      showPantries ? 'visible' : 'none'
    );
  }, [showPantries, mapBase]);

  return (
    <div>
      <div ref={mapRef} style={{ height: '70vh' }} />
    </div>
  );
};

export default Map;
