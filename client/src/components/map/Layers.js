import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLayers, clearLayers } from '../../store/actions/layers';
import Box from '@mui/material/Box';
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
    <FormControl fullWidth>
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
  const handleFill = (iqr = false) => {
    const arr = LAYER_SLIDERS.map(({ name, min, max, marks }) => {
      const value = iqr ? [marks[0], marks[2]] : [min || 0, max || 100];
      return [name, value];
    });
    dispatch(setLayers(Object.fromEntries(arr)));
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container rowSpacing={1} columnSpacing={6}>
        {LAYER_SLIDERS.map((d) => (
          <Grid item key={d.name} xs={12} md={6} lg={3}>
            <SliderControl
              {...d}
              marks={d.marks.map((v, i) => ({ value: v, label: `Q${i + 1}` }))}
            />
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        <Grid item>
          <Button variant="outlined" color="secondary" onClick={handleFill}>
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
    </Box>
  );
};

export default Layers;
