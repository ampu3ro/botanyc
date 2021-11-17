import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
/* eslint import/no-webpack-loader-syntax: off */
import mapboxgl from '!mapbox-gl';
import { POI_PROPS, SOCIOECONOMIC_URL, PAINT_COLOR } from '../data';
import { purple, green, grey } from '@mui/material/colors';
import { setSelected } from '../../store/actions/farms';
import './styles.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;

const Map = () => {
  const mapRef = useRef(null);
  const [mapBase, setMapBase] = useState(null);
  const [farmId, setFarmId] = useState('');
  const farmRef = useRef();
  const districtRef = useRef();

  const market = useSelector((state) => state.market);
  const farmFiltered = useSelector((state) => state.farmFiltered);
  const districtCollected = useSelector((state) => state.districtCollected);
  const layers = useSelector((state) => state.layers);
  const selected = useSelector((state) => state.selected);
  const display = useSelector((state) => state.display);
  const colorBy = useSelector((state) => state.colorBy);
  const sizeBy = useSelector((state) => state.sizeBy);
  const densityBy = useSelector((state) => state.densityBy);
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
      map.addSource('district-data', {
        type: 'geojson',
        data: null, // can't use URL because we need to collect farm data in it. see Homepage
        promoteId: 'id',
      });

      map.addLayer({
        id: 'district',
        source: 'district-data',
        type: 'fill',
        paint: {
          'fill-opacity': 0.6,
        },
        layout: {
          visibility: 'visible',
        },
      });

      map.addLayer({
        id: 'district-line',
        source: 'district-data',
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

      map.addSource('socioeconomic-data', {
        type: 'geojson',
        data: SOCIOECONOMIC_URL,
      });

      map.addLayer({
        id: 'socioeconomic',
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

      const poiData = POI_PROPS.filter(({ data }) => data);

      poiData.forEach(({ id, data, layout }) => {
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
      });

      map.addSource('farm-data', {
        type: 'geojson',
        data: null,
        promoteId: 'id',
      });

      map.addLayer({
        id: 'farm',
        source: 'farm-data',
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

      const poiLayers = poiData.map(({ id }) => id);
      const layers = [...poiLayers, 'farm', 'district'];

      map.on('mousemove', (e) => {
        const features = map.queryRenderedFeatures(e.point, { layers });
        if (features.length) {
          map.getCanvas().style.cursor = 'pointer';
          const { geometry, properties } = features[0];
          const { name, Name, centroid } = properties;
          const latLng = centroid ? JSON.parse(centroid) : geometry.coordinates;
          hoverPopup
            .setLngLat(latLng)
            .setHTML(name || Name)
            .addTo(map);
        } else {
          map.getCanvas().style.cursor = '';
          hoverPopup.remove();
        }
      });

      map.on('click', (e) => {
        const features = map.queryRenderedFeatures(e.point, { layers });
        if (features.length) {
          const feature = features[0];
          const { layer, id, geometry, properties } = feature;
          const layerId = layer.id;

          if (layerId === 'farm') {
            farmRef.current = id;
            setFarmId(id); // use effect instead of passing feature directly because Mapbox reformats properties
          } else if (layerId === 'district') {
            districtRef.current = id;
            dispatch(setSelected(feature));
          } else if (poiLayers.includes(layerId)) {
            const { coordinates } = geometry;
            const { Lat, Lon, Zipcode, ...fields } = properties;
            const html = Object.entries(fields)
              .map(([k, v]) => `<b>${k}</b>: ${v}`)
              .join('<br>');
            popup.setLngLat(coordinates).setHTML(html).addTo(map);
          }
        } else {
          if (districtRef.current) {
            map.setFeatureState(
              { source: 'district-data', id: districtRef.current },
              { selected: false }
            );
            dispatch(setSelected(null));
          }
          districtRef.current = null;
          if (farmRef.current) {
            map.setFeatureState(
              { source: 'farm-data', id: farmRef.current },
              { selected: false }
            );
            farmRef.current = null;
            setFarmId('');
            dispatch(setSelected(null));
          }
        }
      });
      setMapBase(map);
    });
  }, [dispatch]);

  useEffect(() => {
    if (mapBase && farmFiltered.features) {
      mapBase.getSource('farm-data').setData(farmFiltered);
    }
  }, [farmFiltered, mapBase]);

  useEffect(() => {
    if (farmFiltered.features && farmId && mapBase) {
      const feature = farmFiltered.features.filter(
        ({ properties }) => properties.id === farmId
      )[0];
      dispatch(setSelected(feature));
    }
  }, [farmFiltered, farmId, mapBase, dispatch]);

  useEffect(() => {
    if (mapBase && districtCollected.features) {
      mapBase.getSource('district-data').setData(districtCollected);
    }
  }, [districtCollected, mapBase]);

  useEffect(() => {
    if (!mapBase || !districtCollected.features || !densityBy) return;

    const maxPer = Math.max(
      ...districtCollected.features.map((d) => d.properties[densityBy])
    );
    const cd = PAINT_COLOR.density;
    const fill = {
      property: densityBy,
      stops: [
        [0, cd.filter(({ name }) => name === 'low')[0].color],
        [maxPer, cd.filter(({ name }) => name === 'high')[0].color],
      ],
    };
    mapBase.setPaintProperty('district', 'fill-color', fill);
  }, [densityBy, districtCollected, mapBase]);

  useEffect(() => {
    if (mapBase) {
      mapBase.setLayoutProperty(
        'farm',
        'visibility',
        display === 'farm' ? 'visible' : 'none'
      );
      mapBase.setLayoutProperty(
        'district',
        'visibility',
        display === 'district' ? 'visible' : 'none'
      );
      mapBase.setLayoutProperty(
        'district-line',
        'visibility',
        display === 'district' ? 'visible' : 'none'
      );
    }
  }, [display, mapBase]);

  useEffect(() => {
    if (mapBase && market) {
      mapBase.getSource('market-data').setData(market);
    }
  }, [market, mapBase]);

  useEffect(() => {
    if (!mapBase || !selected) return;
    const { properties, geometry, fly } = selected;
    const { id } = properties;
    if (id) {
      let source;
      if (properties.boroName) {
        districtRef.current = id;
        source = 'district-data';
      } else {
        farmRef.current = id;
        source = 'farm-data';
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
    mapBase.setPaintProperty('farm', 'circle-color', color);
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
    mapBase.setPaintProperty('farm', 'circle-radius', radius);
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

    const id = 'socioeconomic';
    let opacity = 0;
    let visibility = 'none';
    if (Object.keys(layers).length) {
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
  }, [layers, mapBase]);

  return (
    <div>
      <div ref={mapRef} style={{ height: '70vh' }} />
    </div>
  );
};

export default Map;
