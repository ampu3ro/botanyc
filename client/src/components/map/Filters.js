import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilters } from '../../store/actions/filters';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';
import { CSVDownloader } from 'react-papaparse';
import { AG_TYPES, ENVIRONMENTS } from '../data';

const Filters = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);
  const location = useSelector((state) => state.location);

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

  const features = location.data.features
    .filter((d) => {
      const { type, environments } = d.properties;
      return (
        (filters.types ? filters.types.includes(type) : true) &&
        (filters.environments && environments
          ? environments.some((e) => filters.environments.includes(e))
          : true)
      );
    })
    .map((d) => {
      const { authEmails, modifiedBy, needsApproval, ...properties } =
        d.properties;
      return { ...d, properties };
    });

  const properties = features.map((d) => d.properties);

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={4}>
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
      <Grid container sx={{ marginTop: 1 }} spacing={2}>
        <Grid item>
          <Button variant="contained" startIcon={<DownloadIcon />}>
            <CSVDownloader data={properties} filename="botanyc">
              CSV
            </CSVDownloader>
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            href={
              'data:text/json;charset=utf-8,' +
              encodeURIComponent(JSON.stringify({ ...location.data, features }))
            }
            download="botanyc.geojson"
          >
            json
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Filters;
