import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
/* eslint import/no-webpack-loader-syntax: off */
import mapboxgl from '!mapbox-gl';
import {
  POI_PROPS,
  SOCIOECONOMIC_URL,
  LAYER_SLIDERS,
  PAINT_COLOR,
} from '../data';
import { setSelected } from '../../store/actions/locations';
import './styles.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;

const Map = ({ showLayers }) => {
  const mapRef = useRef(null);
  const [mapBase, setMapBase] = useState(null);
  const [featureId, setFeatureId] = useState('');
  const selectedId = useRef();

  const location = useSelector((state) => state.location);
  const filters = useSelector((state) => state.filters);
  const layers = useSelector((state) => state.layers);
  const selected = useSelector((state) => state.selected);
  const colorBy = useSelector((state) => state.colorBy);
  const sizeBy = useSelector((state) => state.sizeBy);
  const poi = useSelector((state) => state.poi);

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

      POI_PROPS.forEach((d) => {
        const sourceId = `${d.name}-data`;
        const layerId = `${d.name}-layer`;

        map.addSource(sourceId, {
          type: 'geojson',
          data: d.url,
        });

        map.addLayer({
          id: layerId,
          source: sourceId,
          type: 'symbol',
          layout: {
            'icon-image': d.symbol,
            visibility: 'none',
          },
        });

        map.on('mouseenter', layerId, (e) => {
          map.getCanvas().style.cursor = 'pointer';
          const { coordinates } = e.features[0].geometry;
          const { Name } = e.features[0].properties;
          hoverPopup.setLngLat(coordinates).setHTML(Name).addTo(map);
        });

        map.on('mouseleave', layerId, () => {
          map.getCanvas().style.cursor = '';
          hoverPopup.remove();
        });

        map.on('click', layerId, (e) => {
          map.getCanvas().style.cursor = 'pointer';
          const { coordinates } = e.features[0].geometry;
          const { Lat, Lon, Zipcode, ...fields } = e.features[0].properties;
          const html = Object.entries(fields)
            .map(([k, v]) => `<b>${k}</b>: ${v}`)
            .join('<br>');
          popup.setLngLat(coordinates).setHTML(html).addTo(map);
        });
      });

      map.addSource('farms-data', {
        type: 'geojson',
        data: null,
      });

      map.addLayer({
        id: 'farms-layer',
        source: 'farms-data',
        type: 'circle',
        paint: {
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
    let color = '#28811e';
    if (colorBy !== 'none') {
      color = ['match', ['get', colorBy], ...PAINT_COLOR[colorBy]];
    }
    mapBase.setPaintProperty('farms-layer', 'circle-color', color);
  }, [colorBy, mapBase]);

  useEffect(() => {
    if (!mapBase) return;

    let step1 = 4;
    let step2 = 8;
    if (sizeBy === 'area') {
      const sizeRoot = ['sqrt', ['number', ['get', sizeBy], 10000]];
      step1 = ['/', sizeRoot, 20];
      step2 = ['/', sizeRoot, 10];
    }
    const radius = ['interpolate', ['linear'], ['zoom'], 10, step1, 15, step2];
    mapBase.setPaintProperty('farms-layer', 'circle-radius', radius);
  }, [sizeBy, mapBase]);

  useEffect(() => {
    if (!mapBase) return;

    Object.entries(poi).forEach(([k, v]) => {
      const vis = v ? 'visible' : 'none';
      mapBase.setLayoutProperty(`${k}-layer`, 'visibility', vis);
    });
  }, [poi, mapBase]);

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

  return (
    <div>
      <div ref={mapRef} style={{ height: '70vh' }} />
    </div>
  );
};

export default Map;
