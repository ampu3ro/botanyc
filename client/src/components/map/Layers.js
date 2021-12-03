import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLayers, clearLayers } from '../../store/actions/layers';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { LAYER_SLIDERS } from '../data';

const SliderControl = ({ name, label, min, format, ...props }) => {
  const layers = useSelector((state) => state.layers);
  const dispatch = useDispatch();

  if (!min) min = 0;
  if (!format) format = (v) => `${v}%`;

  const handleChange = (event, value) => dispatch(setLayers({ [name]: value }));

  return (
    <FormControl fullWidth sx={{ paddingLeft: 2, paddingRight: 2 }}>
      <FormLabel>{label}</FormLabel>
      <Slider
        value={layers[name] || [min, min]}
        onChange={handleChange}
        valueLabelDisplay="auto"
        valueLabelFormat={format}
        {...props}
      />
    </FormControl>
  );
};

const Layers = () => {
  const dispatch = useDispatch();
  const handleReset = () => dispatch(clearLayers());
  const handleFill = (iqr) => {
    const arr = LAYER_SLIDERS.map(({ name, min, max, marks }) => {
      const value = iqr ? [marks[0], marks[2]] : [min || 0, max || 100];
      return [name, value];
    });
    dispatch(setLayers(Object.fromEntries(arr)));
  };

  return (
    <Stack spacing={2} sx={{ padding: 2 }}>
      <Typography variant="body2">
        Urban agriculture is part of a complex food system. Use these layers to
        explore spatial relationships between farm/garden locations and select
        socioeconomic variables from the{' '}
        <a href="https://www.census.gov/programs-surveys/acs/about.html">
          American Community Survey
        </a>{' '}
        (all percent of Census tract populations, except income)
      </Typography>
      <Grid container>
        {LAYER_SLIDERS.map((d) => (
          <Grid item key={d.name} xs={12} md={6} lg={3}>
            <SliderControl
              {...d}
              marks={d.marks.map((v, i) => ({
                value: v,
                label: i === 1 ? '' : `Q${i + 1}`,
              }))}
            />
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        <Grid item>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => handleFill(false)}
          >
            Fill
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => handleFill(true)}
          >
            IQR
          </Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" color="secondary" onClick={handleReset}>
            Reset
          </Button>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Layers;
