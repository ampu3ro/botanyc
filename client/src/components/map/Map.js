import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
/* eslint import/no-webpack-loader-syntax: off */
import mapboxgl from '!mapbox-gl';
import collect from '@turf/collect';
import { POI_PROPS, SOCIOECONOMIC_URL, PAINT_COLOR } from '../data';
import { purple, green, grey } from '@mui/material/colors';
import { setSelected } from '../../store/actions/locations';
import './styles.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;

const Map = ({ showLayers, showFilters }) => {
  const mapRef = useRef(null);
  const [mapBase, setMapBase] = useState(null);
  const [farmId, setFarmId] = useState(null);
  const farmIdRef = useRef();
  const [boroughId, setBoroughId] = useState(null);
  const boroughIdRef = useRef();

  const location = useSelector((state) => state.location);
  const market = useSelector((state) => state.market);
  const district = useSelector((state) => state.district);
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
      map.addSource('borough-data', {
        type: 'geojson',
        data: null,
      });

      map.addLayer({
        id: 'borough-layer',
        source: 'borough-data',
        type: 'fill',
        paint: {
          'fill-opacity': 0,
        },
        layout: {
          visibility: 'visible',
        },
      });

      map.addLayer({
        id: 'borough-line',
        source: 'borough-data',
        type: 'line',
        paint: {
          'line-color': '#000',
          'line-width': 1.5,
        },
        layout: {
          visibility: 'visible',
        },
      });

      map.on('click', 'borough-layer', (e) => {
        e.preventDefault();
        if (!e.features.length) return;
        console.log(e.features);
        const { id } = e.features[0];
        boroughIdRef.current = id;
        setBoroughId(id);
      });

      map.on('click', (e) => {
        if (e.defaultPrevented || !boroughIdRef.current) return;
        map.setFeatureState(
          { source: 'borough-data', id: boroughIdRef.current },
          { selected: false }
        );
        boroughIdRef.current = null;
        dispatch(setSelected(null));
      });

      map.addSource('socioeconomic-data', {
        type: 'geojson',
        data: SOCIOECONOMIC_URL,
      });

      map.addLayer({
        id: 'socioeconomic-layer',
        source: 'socioeconomic-data',
        type: 'fill',
        paint: {
          'fill-color': purple[500],
          'fill-opacity': 0,
        },
        layout: {
          visibility: 'none',
        },
      });

      map.addSource('mapbox-streets', {
        type: 'vector',
        url: 'mapbox://mapbox.mapbox-streets-v8',
      });

      map.addLayer({
        id: 'transit_stop_label',
        source: 'mapbox-streets',
        'source-layer': 'transit_stop_label',
        type: 'symbol',
        layout: {
          'icon-image': 'new-york-subway',
          'text-field': ['get', 'name'],
          'text-anchor': 'top',
          'text-offset': [0, 1],
          'text-size': 10,
          visibility: 'none',
        },
        filter: ['==', 'stop_type', 'station'],
      });

      POI_PROPS.filter(({ data }) => data).forEach(({ id, data, layout }) => {
        const source = `${id}-data`;

        map.addSource(source, {
          type: 'geojson',
          data: data.includes('geojson') ? data : null,
        });

        map.addLayer({
          id,
          source,
          type: 'symbol',
          layout: {
            ...layout,
            visibility: 'none',
          },
        });

        map.on('mouseenter', id, (e) => {
          map.getCanvas().style.cursor = 'pointer';
          const { coordinates } = e.features[0].geometry;
          const { Name } = e.features[0].properties;
          hoverPopup.setLngLat(coordinates).setHTML(Name).addTo(map);
        });

        map.on('mouseleave', id, () => {
          map.getCanvas().style.cursor = '';
          hoverPopup.remove();
        });

        map.on('click', id, (e) => {
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
        console.log(e.features);
        const { id } = e.features[0];
        farmIdRef.current = id;
        setFarmId(id);
      });

      map.on('click', (e) => {
        if (e.defaultPrevented || !farmIdRef.current) return;
        map.setFeatureState(
          { source: 'farms-data', id: farmIdRef.current },
          { selected: false }
        );
        farmIdRef.current = null;
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
    const { borough } = district;
    if (borough && boroughId) {
      const clicked = borough.features.filter((d) => d.id === boroughId)[0];
      dispatch(setSelected({ ...clicked, fly: false }));
    }
  }, [district, boroughId, dispatch]);

  useEffect(() => {
    const { options } = location;
    if (options && farmId) {
      const clicked = options.filter((d) => d.featureId === farmId)[0];
      dispatch(setSelected({ ...clicked, fly: false }));
    }
  }, [location, farmId, dispatch]);

  useEffect(() => {
    let locData = JSON.parse(JSON.stringify(location.data)); // deep copy for mutation below
    if (!mapBase || !locData || !locData.features) return;

    locData.features.forEach(({ properties }) => {
      properties.environments = String(properties.environments); // mapbox won't filter an array
    });

    let boroData = collect(
      district.borough,
      locData,
      'production',
      'production'
    );
    const add = (a, d) => a + (d || 0);
    boroData.features.forEach(({ properties }) => {
      properties.production = properties.production.reduce(add, 0);
    });

    mapBase.getSource('farms-data').setData(locData);
    mapBase.getSource('borough-data').setData(boroData);
  }, [location, district, mapBase]);

  useEffect(() => {
    if (mapBase && market) {
      mapBase.getSource('market-data').setData(market);
    }
  }, [market, mapBase]);

  useEffect(() => {
    if (!mapBase || !filters.types || !filters.environments) return;

    const filter = showFilters
      ? [
          'all',
          ['in', 'type', ...filters.types],
          ['in', 'environments', ...filters.environments],
        ]
      : null;
    mapBase.setFilter('farms-layer', filter);
  }, [filters, showFilters, mapBase]);

  useEffect(() => {
    if (!mapBase || !selected) return;

    const { featureId } = selected;
    if (featureId !== undefined) {
      farmIdRef.current = featureId;
      mapBase.setFeatureState(
        { source: 'farms-data', id: featureId },
        { selected: true }
      );
    }
    if (selected.fly && selected.center) {
      mapBase.flyTo({
        center: selected.center,
        zoom: 14,
      });
    }
  }, [selected, location, mapBase]);

  useEffect(() => {
    if (!mapBase) return;

    let color = green[500];
    if (colorBy !== 'none') {
      const colorArr = PAINT_COLOR[colorBy]
        .map(({ name, color }) => [name, color])
        .flat();
      color = ['match', ['get', colorBy], ...colorArr, grey[500]];
    }
    mapBase.setPaintProperty('farms-layer', 'circle-color', color);
  }, [colorBy, mapBase]);

  useEffect(() => {
    if (!mapBase) return;

    let step1 = 4;
    let step2 = 8;
    const fallback = sizeBy === 'area' ? 10000 : 64;
    const root = ['sqrt', ['number', ['get', sizeBy], fallback]];
    if (sizeBy === 'area') {
      step1 = ['/', root, 20];
      step2 = ['/', root, 10];
    } else if (sizeBy === 'production') {
      step1 = ['/', root, 4];
      step2 = ['/', root, 2];
    }
    step1 = ['max', step1, 2];
    step2 = ['max', step2, 4];

    const radius = ['interpolate', ['linear'], ['zoom'], 10, step1, 15, step2];
    mapBase.setPaintProperty('farms-layer', 'circle-radius', radius);
  }, [sizeBy, mapBase]);

  useEffect(() => {
    if (!mapBase) return;

    Object.entries(poi).forEach(([k, v]) => {
      const vis = v ? 'visible' : 'none';
      mapBase.setLayoutProperty(k, 'visibility', vis);
    });
  }, [poi, mapBase]);

  useEffect(() => {
    if (!mapBase) return;

    const id = 'socioeconomic-layer';
    let opacity = 0;
    let visibility = 'none';
    if (showLayers && Object.keys(layers).length) {
      const all = Object.entries(layers).map(([k, v]) => {
        const feature = ['to-number', ['get', k]];
        return ['all', ['>=', feature, v[0]], ['<=', feature, v[1]]];
      });
      opacity = ['case', ['all', ...all], 0.3, 0];
      visibility = 'visible';
    }

    mapBase
      .setPaintProperty(id, 'fill-opacity', opacity)
      .setLayoutProperty(id, 'visibility', visibility);
  }, [layers, showLayers, mapBase]);

  return (
    <div>
      <div ref={mapRef} style={{ height: '70vh' }} />
    </div>
  );
};

export default Map;
