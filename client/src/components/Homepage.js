import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Map from './map/Map';
import Search from './map/Search';
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
  const [showPantries, setShowPantries] = useState(false);
  const currentUser = useSelector((state) => state.currentUser);
  const location = useSelector((state) => state.location);

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
      {location.data && (
        <div>
          <div style={{ position: 'relative' }}>
            <Map {...{ showLayers, showPantries }} />
            <Search />
            <Sidebar />
          </div>
          <Grid container spacing={2} sx={{ marginTop: 2 }}>
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
                    checked={showPantries}
                    onChange={() => setShowPantries(!showPantries)}
                  />
                }
                label="Show food pantries"
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
          {showFilters && <Filters />}
          {showLayers && <Layers />}
        </div>
      )}
    </div>
  );
};

export default Homepage;
