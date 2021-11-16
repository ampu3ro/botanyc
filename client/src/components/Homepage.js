import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Map from './map/Map';
import Legend from './map/Legend';
import Search from './map/Search';
import Toggles from './map/Toggles';
import Filters from './map/Filters';
import Layers from './map/Layers';
import Sidebar from './map/Sidebar';
import Header from './Header';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const Homepage = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [showLayers, setShowLayers] = useState(false);
  const [showToggles, setShowToggles] = useState(false);

  const currentUser = useSelector((state) => state.currentUser);
  const farm = useSelector((state) => state.farm);
  const display = useSelector((state) => state.display);
  const colorBy = useSelector((state) => state.colorBy);

  return (
    <div>
      {!currentUser.isAuthenticated && (
        <div>
          <Header text={'Welcome to bot\u0101NYC'} />
          <Typography variant="h5">
            A catalogue of urban farms and gardens in New York City
          </Typography>
          <Typography paragraph>
            Are you running a farm/garden in the city?&nbsp;
            <Link to="/signup">Sign up</Link>
            &nbsp;to show the world what you grow!
          </Typography>
        </div>
      )}
      {farm.features && (
        <div>
          <div style={{ position: 'relative' }}>
            <Map {...{ showLayers, showFilters }} />
            <Legend colorId={display === 'farms' ? colorBy : 'density'} />
            <Search />
            <Sidebar />
          </div>
          <Grid container spacing={2} sx={{ marginTop: 2 }}>
            <Grid item>
              <FormControlLabel
                control={
                  <Switch
                    checked={showToggles}
                    onChange={() => setShowToggles(!showToggles)}
                  />
                }
                label="Show data toggles"
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
                label="Show farm/garden filters"
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
          {showToggles && <Toggles />}
          {showFilters && <Filters />}
          {showLayers && <Layers />}
        </div>
      )}
    </div>
  );
};

export default Homepage;
