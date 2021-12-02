import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilters } from '../../store/actions/filters';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';
import { CSVDownloader } from 'react-papaparse';
import { AG_TYPES, FARM_PROPS } from '../data';

const TYPES = AG_TYPES.filter((d) => d.checked !== undefined).map(
  ({ value }) => value
);

const renderValue = (selected) => {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
      {selected.map((value) => (
        <Chip key={value} label={value} />
      ))}
    </Box>
  );
};

const Selects = ({ k }) => {
  // can't use "key" prop
  const filters = useSelector((state) => state.filters);
  const dispatch = useDispatch();

  const prop = FARM_PROPS[k];
  if (!prop) return <div />;
  const options = k === 'type' ? TYPES : prop.fields || prop.options;

  const handleChange = (event) => {
    dispatch(setFilters({ [k]: event.target.value }));
  };

  return (
    <FormControl fullWidth>
      <InputLabel id={k}>{prop.label}</InputLabel>
      <Select
        labelId={k}
        label={prop.label}
        multiple
        value={filters[k] || []}
        onChange={handleChange}
        renderValue={renderValue}
      >
        {options.map((d) => {
          const name = prop.fields ? d.name : d;
          const label = prop.fields ? d.label : d;
          return (
            <MenuItem key={name} value={name}>
              {label}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

const Filters = () => {
  const farmFiltered = useSelector((state) => state.farmFiltered);

  const features = farmFiltered.features.map((feature) => {
    const { authUsers, modifiedBy, needsApproval, distro1, ...properties } =
      feature.properties;
    return { ...feature, properties };
  });

  const properties = features.map((d) => d.properties);

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        {Object.keys(FARM_PROPS)
          .filter((k) => FARM_PROPS[k].filter)
          .map((k, i) => (
            <Grid item key={i} xs={12} md={6}>
              <Selects k={k} />
            </Grid>
          ))}
      </Grid>
      <Grid container sx={{ marginTop: 1 }} spacing={2}>
        <Grid item>
          <Button variant="contained" startIcon={<DownloadIcon />}>
            <CSVDownloader data={properties} filename="mapnyc">
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
              encodeURIComponent(JSON.stringify({ ...farmFiltered, features }))
            }
            download="mapnyc.geojson"
          >
            json
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Filters;
