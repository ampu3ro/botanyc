import React, { useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useSelector } from 'react-redux';
/* eslint import/no-webpack-loader-syntax: off */
import mapboxgl from '!mapbox-gl';
import Popup from './Popup';
import { AG_TYPES } from '../location/dataTypes';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;

const PAINT_COLOR = [
  ...AG_TYPES.filter((d) => d.label)
    .map((d) => [d.option, d.color])
    .flat(),
  '#ccc',
];

const Map = () => {
  const mapRef = useRef(null);
  const [mapBase, setMapBase] = useState(null);
  const popupRef = useRef(new mapboxgl.Popup({ offset: 15 }));

  const locations = useSelector((state) => state.locations);
  const filters = useSelector((state) => state.filters);
  const search = useSelector((state) => state.search);

  useEffect(() => {
    if (!Object.keys(locations).length) return;

    const map = new mapboxgl.Map({
      container: mapRef.current,
      style: 'mapbox://styles/ampu3ro/cktki8cej537c17mikqn1tp1n',
      center: [-73.98, 40.7],
      zoom: 10,
    });

    map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

    map.on('load', () => {
      map.addSource('points-data', {
        type: 'geojson',
        data: locations,
      });

      const areaRoot = ['sqrt', ['number', ['get', 'area'], 10000]];

      map.addLayer({
        id: 'points-layer',
        source: 'points-data',
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
              [10, 0.6],
              [15, 1],
            ],
          },
        },
      });

      map.on('click', 'points-layer', (e) => {
        if (!e.features.length) return;

        const feature = e.features[0];
        const popupNode = document.createElement('div');
        ReactDOM.render(<Popup properties={feature.properties} />, popupNode);

        popupRef.current
          .setLngLat(feature.geometry.coordinates)
          .setDOMContent(popupNode)
          .addTo(map);
      });

      map.on('mouseenter', 'points-layer', (e) => {
        if (e.features.length) {
          map.getCanvas().style.cursor = 'pointer';
        }
      });

      map.on('mouseleave', 'points-layer', () => {
        map.getCanvas().style.cursor = '';
      });

      setMapBase(map);
    });

    return () => map.remove();
  }, [locations]);

  useEffect(() => {
    if (!mapBase || !filters.types || !filters.environments) return;

    const pointFilters = [
      'all',
      ['in', 'type', ...filters.types],
      ['in', 'environments', ...filters.environments],
    ];

    mapBase.setFilter('points-layer', pointFilters);
  }, [filters, mapBase]);

  useEffect(() => {
    if (!mapBase || !search || !search.locations) return;

    const { lon, lat } = search.locations[0];
    const center = [lon, lat];

    mapBase.flyTo({
      center,
      zoom: 14,
    });

    const popupNode = document.createElement('div');
    ReactDOM.render(<Popup properties={search} />, popupNode);
    popupRef.current.setLngLat(center).setDOMContent(popupNode).addTo(mapBase);
  }, [search, mapBase]);

  return (
    <div>
      <div ref={mapRef} style={{ height: '75vh' }} />
    </div>
  );
};

export default Map;
