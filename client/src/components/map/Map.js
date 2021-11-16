import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
/* eslint import/no-webpack-loader-syntax: off */
import mapboxgl from '!mapbox-gl';
import collect from '@turf/collect';
import { POI_PROPS, SOCIOECONOMIC_URL, PAINT_COLOR } from '../data';
import { purple, green, grey } from '@mui/material/colors';
import { setSelected } from '../../store/actions/farms';
import './styles.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;

const Map = ({ showLayers, showFilters }) => {
  const mapRef = useRef(null);
  const [mapBase, setMapBase] = useState(null);
  const [farmId, setFarmId] = useState('');
  const farmRef = useRef();
  const communityRef = useRef();

  const farm = useSelector((state) => state.farm);
  const market = useSelector((state) => state.market);
  const district = useSelector((state) => state.district);
  const filters = useSelector((state) => state.filters);
  const layers = useSelector((state) => state.layers);
  const selected = useSelector((state) => state.selected);
  const display = useSelector((state) => state.display);
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
      map.addSource('community-data', {
        type: 'geojson',
        data: null,
        promoteId: 'BoroCD',
      });

      map.addLayer({
        id: 'community-layer',
        source: 'community-data',
        type: 'fill',
        paint: {
          'fill-opacity': 0.4,
        },
        layout: {
          visibility: 'visible',
        },
      });

      map.addLayer({
        id: 'community-line',
        source: 'community-data',
        type: 'line',
        paint: {
          'line-color': '#000',
          'line-width': [
            'case',
            ['boolean', ['feature-state', 'selected'], false],
            1.5,
            0.1,
          ],
        },
      });

      map.addSource('borough-data', {
        type: 'geojson',
        data: null,
        promoteId: 'BoroCode',
      });

      map.addLayer({
        id: 'borough-line',
        source: 'borough-data',
        type: 'line',
        paint: {
          'line-color': '#000',
          'line-width': 0.1,
        },
      });

      map.on('click', 'community-layer', (e) => {
        e.preventDefault();
        if (e.features.length) {
          const feature = e.features[0];
          communityRef.current = feature.id;
          dispatch(setSelected(feature));
        }
      });

      map.on('click', (e) => {
        if (!e.defaultPrevented && communityRef.current) {
          map.setFeatureState(
            { source: 'community-data', id: communityRef.current },
            { selected: false }
          );
          communityRef.current = null;
          dispatch(setSelected(null));
        }
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
        promoteId: 'id',
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
        if (e.features.length) {
          const { id } = e.features[0];
          farmRef.current = id;
          setFarmId(id); // use effect instead of passing feature directly because Mapbox reformats properties
        }
      });

      map.on('click', (e) => {
        if (e.defaultPrevented || !farmRef.current) return;
        map.setFeatureState(
          { source: 'farms-data', id: farmRef.current },
          { selected: false }
        );
        farmRef.current = null;
        setFarmId('');
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
    let farmData = JSON.parse(JSON.stringify(farm)); // deep copy for mutation below
    if (mapBase && farmData && farmData.features) {
      farmData.features.forEach(({ properties }) => {
        properties.environments = String(properties.environments); // mapbox won't filter an array
      });
      mapBase.getSource('farms-data').setData(farmData);
    }
  }, [farm, mapBase]);

  useEffect(() => {
    if (farm.features && farmId && mapBase) {
      const feature = farm.features.filter(
        ({ properties }) => properties.id === farmId
      )[0];
      dispatch(setSelected(feature));
    }
  }, [farm, farmId, mapBase]);

  useEffect(() => {
    const { borough, community } = district;
    if (!mapBase || !borough) return;

    let cd = collect(community, farm, 'production', 'prod');
    cd.features.forEach(({ properties }) => {
      const { prod } = properties;
      properties.count = prod.length;
      properties.production = prod.reduce((a, d) => a + (d || 0), 0);

      const { count, total_pop } = properties;
      properties.perCapita = total_pop > 0 ? count / total_pop : 0;
    });
    mapBase.getSource('community-data').setData(cd);

    const maxPer = Math.max(...cd.features.map((d) => d.properties.perCapita));
    const fill = {
      property: 'perCapita',
      stops: [
        [0, green[50]],
        [maxPer, green[900]],
      ],
    };
    mapBase.setPaintProperty('community-layer', 'fill-color', fill);
  }, [district, farm, mapBase]);

  useEffect(() => {
    if (mapBase) {
      mapBase.setLayoutProperty(
        'farms-layer',
        'visibility',
        display === 'farms' ? 'visible' : 'none'
      );
      mapBase.setLayoutProperty(
        'community-layer',
        'visibility',
        display === 'community' ? 'visible' : 'none'
      );
      mapBase.setLayoutProperty(
        'community-line',
        'visibility',
        display === 'community' ? 'visible' : 'none'
      );
    }
  }, [display, mapBase]);

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

    const { id, properties, geometry, fly } = selected;
    if (id) {
      let source;
      if (properties.BoroCD) {
        communityRef.current = id;
        source = 'community-data';
      } else {
        farmRef.current = id;
        source = 'farms-data';
      }
      mapBase.setFeatureState({ source, id }, { selected: true });
    }
    const center = geometry?.coordinates;
    if (fly && center) {
      mapBase.flyTo({
        center,
        zoom: 14,
      });
    }
  }, [selected, mapBase]);

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
