import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setDisplay,
  setColorBy,
  setSizeBy,
  setPoi,
} from '../../store/actions/toggles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Checkbox from '@mui/material/Checkbox';
import { POI_PROPS } from '../data';

const DISPLAY = [
  { name: 'farms', label: 'Point locations' },
  { name: 'community', label: 'Community district density' },
];

const COLOR_BY = [
  { name: 'type', label: 'Type' },
  { name: 'distro1', label: 'Primary distribution channel' },
  { name: 'none', label: 'None' },
];
const SIZE_BY = [
  { name: 'area', label: 'Lot area (sqft)' },
  { name: 'production', label: 'Total production (lbs)' },
  { name: 'none', label: 'None' },
];

const RadioGroupControl = ({ label, value, options, setter }) => {
  const dispatch = useDispatch();

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <RadioGroup
        value={value}
        onChange={(e) => dispatch(setter(e.target.value))}
      >
        {options.map(({ name, label }) => (
          <FormControlLabel
            key={name}
            value={name}
            label={label}
            control={<Radio />}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

const Toggles = () => {
  const display = useSelector((state) => state.display);
  const colorBy = useSelector((state) => state.colorBy);
  const sizeBy = useSelector((state) => state.sizeBy);
  const poi = useSelector((state) => state.poi);

  const dispatch = useDispatch();

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={4}>
        <Grid item>
          <RadioGroupControl
            label="Display data as"
            value={display}
            options={DISPLAY}
            setter={setDisplay}
          />
        </Grid>
        {display === 'farms' && (
          <Grid item>
            <RadioGroupControl
              label="Color farms/gardens by"
              value={colorBy}
              options={COLOR_BY}
              setter={setColorBy}
            />
          </Grid>
        )}
        {display === 'farms' && (
          <Grid item>
            <RadioGroupControl
              label="Size farms/gardens by"
              value={sizeBy}
              options={SIZE_BY}
              setter={setSizeBy}
            />
          </Grid>
        )}
        <Grid item>
          <FormControl>
            <FormLabel>Show points of interest</FormLabel>
            <FormGroup>
              {POI_PROPS.map(({ id, label }) => (
                <FormControlLabel
                  key={id}
                  label={label}
                  control={
                    <Checkbox
                      checked={poi[id]}
                      onChange={() => dispatch(setPoi({ [id]: !poi[id] }))}
                    />
                  }
                />
              ))}
            </FormGroup>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Toggles;
