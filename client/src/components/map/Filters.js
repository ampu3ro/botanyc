import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilters } from '../../store/actions/filters';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';
import { CSVDownloader } from 'react-papaparse';
import { AG_TYPES, ENVIRONMENTS } from '../location/dataTypes';

const Filters = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);
  const locations = useSelector((state) => state.locations);

  const handleChecks = (event, key) => {
    const { name, checked } = event.target;
    let values = filters[key];
    if (!checked) {
      values = values.filter((d) => d !== name);
    } else if (!values.includes(name)) {
      values = [...values, name];
    }
    dispatch(setFilters({ [key]: values }));
  };

  const data = locations.features
    .map((d) => {
      const { authorized, ...props } = d.properties;
      const [lat, lon] = d.geometry.coordinates;
      return { ...props, lat, lon };
    })
    .filter((d) => {
      return (
        (filters.types ? filters.types.includes(d.type) : true) &&
        (filters.environments
          ? filters.environments.includes(d.environments)
          : true)
      );
    });

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item>
          <FormControl>
            <FormLabel>Producer type selection</FormLabel>
            {AG_TYPES.filter((d) => d.label).map((d) => (
              <FormControlLabel
                key={d.option}
                label={d.label}
                control={
                  <Checkbox
                    name={d.option}
                    checked={
                      filters.types ? filters.types.includes(d.option) : false
                    }
                    sx={{ '&.Mui-checked': { color: d.color }, height: 35 }}
                    onChange={(e) => handleChecks(e, 'types')}
                  />
                }
              />
            ))}
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl>
            <FormLabel>Environment selection</FormLabel>
            {Object.keys(ENVIRONMENTS).map((d) => (
              <FormControlLabel
                key={d}
                label={d}
                control={
                  <Checkbox
                    name={d}
                    checked={
                      filters.environments
                        ? filters.environments.includes(d)
                        : false
                    }
                    sx={{ height: 35 }}
                    onChange={(e) => handleChecks(e, 'environments')}
                  />
                }
              />
            ))}
          </FormControl>
        </Grid>
      </Grid>
      <Button
        variant="contained"
        startIcon={<DownloadIcon />}
        sx={{ marginTop: 1 }}
      >
        <CSVDownloader data={data} filename="botanyc">
          Data
        </CSVDownloader>
      </Button>
    </div>
  );
};

export default Filters;
