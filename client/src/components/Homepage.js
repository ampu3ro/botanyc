import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { filterFarms, collectFarms } from '../store/actions/munge';
import Map from './map/Map';
import Legend from './map/Legend';
import Search from './map/Search';
import Display from './map/Display';
import Filters from './map/Filters';
import Layers from './map/Layers';
import Download from './map/Download';
import Sidebar from './map/Sidebar';
import Header from './Header';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const Homepage = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [showLayers, setShowLayers] = useState(false);
  const [showDisplay, setShowDisplay] = useState(false);

  const currentUser = useSelector((state) => state.currentUser);
  const farm = useSelector((state) => state.farm);
  const farmFiltered = useSelector((state) => state.farmFiltered);
  const district = useSelector((state) => state.district);
  const filters = useSelector((state) => state.filters);
  const display = useSelector((state) => state.display);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(filterFarms({ farm, filters }));
  }, [farm, filters, dispatch]);

  useEffect(() => {
    dispatch(collectFarms({ district, farm: farmFiltered }));
  }, [district, farmFiltered, dispatch]);

  return (
    <div>
      {!currentUser.isAuthenticated && (
        <div>
          <Header text={'Welcome to M.A.P. NYC'} />
          <Typography variant="h6">
            A catalogue of urban farms and gardens in New York City
          </Typography>
          <Typography paragraph>
            Read more about the project on the <Link to="/about">About</Link>{' '}
            page. Are you running a farm/garden in the city?{' '}
            <Link to="/signup">Sign up</Link> to show the world what you grow!
          </Typography>
        </div>
      )}
      {farm.features && (
        <div>
          <div style={{ position: 'relative' }}>
            <Map {...{ showLayers, showFilters }} />
            <Legend />
            {display === 'farm' && <Search />}
            <Sidebar />
          </div>
          <Grid container spacing={2} sx={{ marginTop: 2 }}>
            <Grid item>
              <FormControlLabel
                control={
                  <Switch
                    checked={showDisplay}
                    onChange={() => setShowDisplay(!showDisplay)}
                  />
                }
                label="Show display options"
              />
            </Grid>
            <Grid item>
              <FormControlLabel
                control={
                  <Switch
                    checked={showFilters}
                    onChange={() => setShowFilters(!showFilters)}
                  />
                }
                label="Show data filters"
              />
            </Grid>
            <Grid item>
              <FormControlLabel
                control={
                  <Switch
                    checked={showLayers}
                    onChange={() => setShowLayers(!showLayers)}
                  />
                }
                label="Show socioeconomic layers"
              />
            </Grid>
          </Grid>
          {showDisplay && <Display />}
          {showFilters && <Filters />}
          {showLayers && <Layers />}
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Download />
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
};

export default Homepage;
