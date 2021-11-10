import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLayers, clearLayers } from '../../store/actions/layers';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { LAYER_SLIDERS } from '../data';
import { Button } from '@mui/material';
import { Box } from '@mui/system';

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

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        {LAYER_SLIDERS.map((d) => (
          <Grid item key={d.name} xs={12} md={6} lg={3}>
            <SliderControl {...d} />
          </Grid>
        ))}
      </Grid>
      <Button
        variant="outlined"
        color="secondary"
        onClick={handleReset}
        sx={{ marginTop: 2 }}
      >
        Reset
      </Button>
    </Box>
  );
};

export default Layers;
