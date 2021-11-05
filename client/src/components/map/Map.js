import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
/* eslint import/no-webpack-loader-syntax: off */
import mapboxgl from '!mapbox-gl';
import { AG_TYPES } from '../location/dataTypes';
import { setSelected } from '../../store/actions/locations';

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

  const locations = useSelector((state) => state.locations);
  const filters = useSelector((state) => state.filters);
  const selected = useSelector((state) => state.selected);

  const dispatch = useDispatch();

  const selectedId = useRef();

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

      map.on('click', 'points-layer', (e) => {
        e.preventDefault();
        if (!e.features.length) return;

        const feature = e.features[0];
        const { id, properties } = feature;
        properties.featureId = id;
        properties.center = undefined; // prevent from flying

        dispatch(setSelected(properties));
      });

      map.on('click', (e) => {
        if (e.defaultPrevented === true || !selectedId.current) return;

        map.setFeatureState(
          { source: 'points-data', id: selectedId.current },
          { selected: false }
        );

        selectedId.current = null;
        dispatch(setSelected(null));
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
  }, [locations, dispatch]);

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
    if (!mapBase || !selected) return;
    if (selected.center) {
      mapBase.flyTo({
        center: selected.center,
        zoom: 14,
      });
    }
    if (selected.featureId) {
      selectedId.current = selected.featureId;
      mapBase.setFeatureState(
        { source: 'points-data', id: selected.featureId },
        { selected: true }
      );
    }
  }, [selected, mapBase]);

  return (
    <div>
      <div ref={mapRef} style={{ height: '75vh' }} />
    </div>
  );
};

export default Map;
