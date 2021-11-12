import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setColorBy, setSizeBy, setPoi } from '../../store/actions/toggles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Checkbox from '@mui/material/Checkbox';

const COLOR_BY = [
  { name: 'type', label: 'Type' },
  { name: 'none', label: 'None' },
];
const SIZE_BY = [
  { name: 'area', label: 'Lot area (sqft)' },
  { name: 'production', label: 'Total production (lbs)' },
  { name: 'none', label: 'None' },
];

const Toggles = () => {
  const colorBy = useSelector((state) => state.colorBy);
  const sizeBy = useSelector((state) => state.sizeBy);
  const poi = useSelector((state) => state.poi);
  const dispatch = useDispatch();

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={4}>
        <Grid item>
          <FormControl>
            <FormLabel>Color farms/gardens by</FormLabel>
            <RadioGroup
              value={colorBy}
              onChange={(e) => dispatch(setColorBy(e.target.value))}
            >
              {COLOR_BY.map((d) => (
                <FormControlLabel
                  key={d.name}
                  value={d.name}
                  label={d.label}
                  control={<Radio />}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl>
            <FormLabel>Size farms/gardens by</FormLabel>
            <RadioGroup
              value={sizeBy}
              onChange={(e) => dispatch(setSizeBy(e.target.value))}
            >
              {SIZE_BY.map((d) => (
                <FormControlLabel
                  key={d.name}
                  value={d.name}
                  label={d.label}
                  control={<Radio />}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl>
            <FormLabel>Show points of interest</FormLabel>
            <FormControlLabel
              label="Food pantry locations"
              control={
                <Checkbox
                  checked={poi.pantry}
                  onChange={() => dispatch(setPoi({ pantry: !poi.pantry }))}
                />
              }
            />
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Toggles;
