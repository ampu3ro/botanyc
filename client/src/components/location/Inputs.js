import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { FARM_PROPS } from './dataTypes';
import Grid from '@mui/material/Grid';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { styled } from '@mui/material/styles';

export const TextForm = ({ name, label, helpText, int, adorn, ...props }) => {
  const { control } = useFormContext();

  const farmProps = FARM_PROPS[name] || {};
  if (!label) label = farmProps.label;
  if (!helpText) helpText = farmProps.helpText;
  if (!int) int = farmProps.int;
  if (!adorn) adorn = farmProps.adorn;

  const inputProps = int
    ? { type: 'number', min: 0, step: 1 }
    : { ...props?.inputProps };

  const startAdornment = adorn ? (
    <InputAdornment position="start">{adorn}</InputAdornment>
  ) : undefined;

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field }) => (
        <TextField
          fullWidth
          label={label}
          helperText={helpText}
          inputProps={inputProps}
          InputProps={{ ...props?.InputProps, startAdornment }}
          {...field}
          {...props}
        />
      )}
    />
  );
};

export const SelectForm = ({
  name,
  label,
  options,
  multiple,
  helpText,
  ...props
}) => {
  const { control } = useFormContext();

  const farmProps = FARM_PROPS[name] || {};
  if (!label) label = farmProps.label;
  if (!options) options = farmProps.options;
  if (!multiple) multiple = farmProps.multiple;
  if (!helpText) helpText = farmProps.helpText;

  const labelId = `${name}-label`;

  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      render={({ field }) => (
        <FormControl fullWidth>
          <InputLabel id={labelId}>{label}</InputLabel>
          <Select
            labelId={labelId}
            label={label}
            multiple={multiple}
            {...field}
            {...props}
          >
            {options.map((item) => (
              <MenuItem key={item.value || item} value={item.value || item}>
                {item.label || item}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{helpText}</FormHelperText>
        </FormControl>
      )}
    />
  );
};

export const DateForm = ({
  name,
  label,
  views = ['year', 'month', 'day'],
  ...props
}) => {
  if (!label) label = FARM_PROPS[name]?.label;

  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={null}
      render={({ field }) => (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            disableFuture
            label={label}
            openTo="year"
            views={views}
            renderInput={(params) => (
              <TextField fullWidth {...params} {...props} />
            )}
            {...field}
          />
        </LocalizationProvider>
      )}
    />
  );
};

export const NumericGridForm = ({ name, title, fields, adorn, ...props }) => {
  const farmProps = FARM_PROPS[name] || {};
  if (!title) title = farmProps.title;
  if (!fields) fields = farmProps.fields;
  if (!adorn) adorn = farmProps.adorn;

  return (
    <FormControl fullWidth>
      <FormLabel sx={{ marginBottom: 2 }}>{title}</FormLabel>
      <Grid container spacing={2}>
        {fields.map((d) => {
          return (
            <Grid item key={d.name} xs={12} sm={6} lg={4}>
              <TextForm
                name={d.name}
                label={d.label}
                helpText={d.helpText}
                int
                adorn={adorn}
                {...props}
              />
            </Grid>
          );
        })}
      </Grid>
    </FormControl>
  );
};

const FormHelper = styled(FormHelperText)(({ theme }) => ({
  color: theme.palette.secondary.main,
}));

export const FormHelp = ({ prev, curr, children }) => {
  const help = (prev, curr) => {
    const toString = (x) => (Array.isArray(x) ? x.join(',') : x);
    const prevStr = toString(prev);
    if (prevStr === toString(curr)) {
      return undefined;
    }
    return `Previously: ${prevStr === '' ? '[blank]' : prevStr}`;
  };

  const helpText = prev ? help(prev, curr) : undefined;

  return (
    <FormControl fullWidth>
      {children}
      <FormHelper>{helpText}</FormHelper>
    </FormControl>
  );
};
