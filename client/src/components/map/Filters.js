import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  useFormContext,
  Controller,
  useForm,
  FormProvider,
} from 'react-hook-form';
import { setFilters } from '../../store/actions/filters';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { AG_TYPES, FARM_PROPS, FILTER_DEFAULT } from '../data';

const TYPES = AG_TYPES.filter((d) => d.checked !== undefined).map(
  ({ value }) => value
);

const renderValue = (selected) => {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
      {selected.map((item) => (
        <Chip key={item.name || item} label={item.label || item} />
      ))}
    </Box>
  );
};

const SelectForm = ({ name }) => {
  const { control } = useFormContext();

  const prop = FARM_PROPS[name];
  if (!prop) return <div />;

  let { label, options, fields } = prop;
  options = name === 'type' ? TYPES : fields || options;
  const labelId = `${name}-label`;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormControl fullWidth>
          <InputLabel id={labelId}>{label}</InputLabel>
          <Select
            labelId={labelId}
            label={label}
            multiple
            renderValue={renderValue}
            {...field}
          >
            {options.map((item) => (
              <MenuItem key={item.name || item} value={item}>
                {item.label || item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    />
  );
};

const Filters = () => {
  const dispatch = useDispatch();
  const methods = useForm({ defaultValues: FILTER_DEFAULT });
  const { watch, reset } = methods;

  const filters = watch();

  return (
    <FormProvider {...methods}>
      <Stack sx={{ padding: 2 }} spacing={2}>
        <Typography variant="body2">
          Filter farm and garden locations based on user submitted responses to
          our farm survey (or publicly available data) stored in the M.A.P. NYC
          database. All filters selected apply together after <em>Set</em> is
          clicked below.
        </Typography>
        <Grid container spacing={2}>
          {Object.keys(FILTER_DEFAULT).map((k) => (
            <Grid item key={k} xs={12} md={6}>
              <SelectForm name={k} />
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          <Grid item>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => dispatch(setFilters(filters))}
            >
              Set
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => reset()}
            >
              Reset
            </Button>
          </Grid>
        </Grid>
      </Stack>
    </FormProvider>
  );
};

export default Filters;
