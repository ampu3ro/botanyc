import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Map from './map/Map';
import Search from './map/Search';
import Filters from './map/Filters';
import Sidebar from './map/Sidebar';
import Header from './Header';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const Homepage = () => {
  const [showFilters, setShowFilters] = useState(false);
  const currentUser = useSelector((state) => state.currentUser);
  const locations = useSelector((state) => state.locations);

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
      {locations && (
        <div>
          <div style={{ position: 'relative' }}>
            <Map />
            <Search />
            <Sidebar />
          </div>
          <FormControlLabel
            control={
              <Switch
                checked={showFilters}
                onChange={() => setShowFilters(!showFilters)}
              />
            }
            label="Show filters"
            sx={{ marginTop: 2 }}
          />
          {showFilters && <Filters />}
        </div>
      )}
    </div>
  );
};

export default Homepage;
