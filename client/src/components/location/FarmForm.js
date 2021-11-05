import React, { useEffect, useState, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { geocode, setGeocoded } from '../../store/actions/maps';
import { submitOne, editOne, deleteOne } from '../../store/actions/farm';
import { FARM_PROPS, FARM_DEFAULT, ENVIRONMENTS } from './dataTypes';
import Header from '../Header';
import SectionHeader from './SectionHeader';
import { TextForm, SelectForm, DateForm, NumericGridForm } from './Inputs';
import { SelectDialog, DeleteDialog } from './Dialogs';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Slider from '@mui/material/Slider';

const FarmForm = () => {
  const [search, setSearch] = useState('');
  const [match, setMatch] = useState({});
  const [selected, setSelected] = useState('');
  const [verified, setVerified] = useState('');
  const [openVerify, setOpenVerify] = useState(false);
  const [edit, setEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [positions, setPositions] = useState({});
  const [wages, setWages] = useState({});
  const [jobsCount, setJobsCount] = useState(1);

  const currentUser = useSelector((state) => state.currentUser);
  const locations = useSelector((state) => state.locations);
  const geocoded = useSelector((state) => state.geocoded);

  const history = useHistory();
  const dispatch = useDispatch();
  const methods = useForm({ defaultValues: FARM_DEFAULT });
  const { getValues, setValue, watch, reset, control } = methods;

  const watchEnviro = watch('environments', []);
  const watchEnviroDetails = watch('enviroDetails', []);
  const watchGrowMethods = watch('growMethods', []);
  const watchCompost = watch('compost', '');

  const { features } = locations;
  let searchOptions = features
    ? features
        .map((d) => d.properties)
        .filter((d, i, a) => a.findIndex((t) => t.label === d.label) === i) // remove duplicates
    : [];
  if (!currentUser.isAdmin && searchOptions) {
    searchOptions = searchOptions.filter((d) =>
      d.authEmails.includes(currentUser.user.email)
    );
  }

  const handleSearch = (event, value) => {
    setSearch(value);
    let match = {};
    if (value && value.id !== '') {
      const matches = searchOptions.filter((d) => d.id === value.id);

      if (matches.length) {
        match = matches[0];
        const { environments } = match;
        if (typeof environments === 'string') {
          match.environments = environments ? environments.split(',') : [];
        }
        Object.entries(match).forEach(([k, v]) => setValue(k, v));
      }
    } else {
      reset();
    }
    setMatch(match);
  };

  const handleClear = () => {
    setSearch('');
    setJobsCount(1);
    reset();
  };

  const handleDelete = () => {
    const data = getValues();
    dispatch(deleteOne({ data }));
    handleClear();
    setOpenDelete(false);
  };

  const onSubmit = (data) => {
    const { address } = data;
    if (!match || match.address !== address) {
      setEdit(false);
      dispatch(geocode({ address }));
    } else {
      setEdit(true);
    }
  };

  const handleSelect = () => {
    setVerified(selected);
    setOpenVerify(false);
    setEdit(true);
  };

  useEffect(() => {
    if (geocoded.length) {
      setSelected(geocoded[0].formattedAddress);
      setOpenVerify(true);
    }
  }, [geocoded]);

  useEffect(() => {
    if (!edit) return;

    let data = getValues();

    const area =
      (data.areaCellar || 0) +
      (data.areaGround || 0) +
      (data.areaFloor1 || 0) +
      (data.areaFloor2 || 0) +
      (data.areaRoof || 0) +
      (data.areaOther || 0);
    if (area > 0) {
      data.area = area;
    }

    data.positions = Object.values(positions).filter((d) => d !== '');

    data.wages = Object.values(wages)
      .map(parseFloat)
      .filter((d) => !isNaN(d));

    data.modifiedBy = currentUser.user.email;

    if (geocoded.length && verified !== '') {
      const g = geocoded.filter((d) => d.formattedAddress === verified)[0];
      data.locations = [
        {
          // need to refactor for multi-loc
          address: g.formattedAddress,
          lat: g.latitude,
          lon: g.longitude,
        },
      ];
    }
    dispatch(setGeocoded([]));

    if (
      currentUser.isAdmin ||
      (match.authEmails && match.authEmails.includes(currentUser.user.email))
    ) {
      dispatch(editOne({ currentUser, data }));
    } else {
      dispatch(submitOne(data));
    }
    history.push('/');
  }, [
    edit,
    match,
    getValues,
    dispatch,
    history,
    currentUser,
    wages,
    positions,
    geocoded,
    verified,
  ]);

  const floors = FARM_PROPS.floors.fields.filter((d) => {
    let re = new RegExp(d.pattern, 'i');
    return (
      watchEnviro.some((x) => re.test(x)) ||
      watchEnviroDetails.some((x) => re.test(x))
    );
  });

  const marks = Array(5)
    .fill()
    .map((d, i) => i * 20 + 20)
    .map((d) => ({ value: d, label: `${d}%` }));

  return (
    <FormProvider {...methods}>
      <Header text=" Add New or Edit Existing Farm/Garden Location" />
      {!!searchOptions.length && (
        <FormControl fullWidth>
          <Autocomplete
            id="search"
            options={searchOptions}
            freeSolo
            value={search}
            onChange={handleSearch}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search Existing Locations to Edit"
              />
            )}
          />
          <FormHelperText>
            Leave blank to create a new farm/garden location
          </FormHelperText>
        </FormControl>
      )}
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Button variant="outlined" color="secondary" onClick={handleClear}>
            Clear Form
          </Button>
        </Grid>
      </Grid>
      <Stack spacing={2} sx={{ maxWidth: '90%' }}>
        <SectionHeader text="Farm/Garden Characteristics" />
        <TextForm name="address" match={match} />
        <TextForm name="name" />
        <TextForm name="orgName" />
        <SelectForm name="type" />
        <SelectForm name="environments" />
        {!!watchEnviro.length && (
          <SelectForm
            name="enviroDetails"
            label="Location detail"
            options={watchEnviro.map((d) => ENVIRONMENTS[d]).flat()}
            multiple
          />
        )}
        {!!floors.length && (
          <NumericGridForm name="floors" fields={floors} adorn="sqft" />
        )}
        <Controller
          name="percentFood"
          control={control}
          defaultValue={80}
          render={({ field }) => (
            <FormControl>
              <FormLabel>
                How much of your space is dedicated to food production?
              </FormLabel>
              <Slider
                step={1}
                min={0}
                max={100}
                valueLabelDisplay="auto"
                valueLabelFormat={(v) => `${v}%`}
                marks={marks}
                sx={{ width: '50%' }}
                {...field}
              />
            </FormControl>
          )}
        />
        <SelectForm name="orgType" />
        <Controller
          name="bCorp"
          control={control}
          defaultValue={false}
          render={({ field }) => (
            <FormControlLabel
              control={<Switch {...field} />}
              label="Toggle on if you are you a certified B corp (benefit corporation)"
            />
          )}
        />
        <SelectForm name="priorities" />
        <SelectForm name="accessibility" />
        <SelectForm name="adModes" />
        <SectionHeader text="Food Production" />
        <SelectForm name="growMethods" />
        {watchGrowMethods.join(',').includes('Aqua') && (
          <SelectForm name="aquaType" />
        )}
        {watchGrowMethods.join(',').includes('ponics') && (
          <SelectForm name="ponicType" />
        )}
        {watchGrowMethods.join(',').includes('soil)') && (
          <SelectForm name="waterType" />
        )}
        <SelectForm name="iotTypes" />
        <SelectForm name="pestManagement" />
        <SelectForm name="usdaOrganic" />
        <SelectForm name="compost" />
        {watchCompost === 'Off-site' && <SelectForm name="compostOffsite" />}
        {watchCompost === 'On-site' && <SelectForm name="compostOnsite" />}
        <SelectForm name="dischargeMethods" />
        <SelectForm name="dischargePermit" />
        <SectionHeader text="Harvest, processing, and distribution" />
        <NumericGridForm name="crops" adorn="lbs" />
        <NumericGridForm name="distros" adorn="lbs" />
        <SelectForm name="distroRegion" />
        <SectionHeader text="Land ownership and use" />
        <DateForm name="founding" views={['year']} sx={{ width: '50%' }} />
        <FormControl>
          <FormLabel sx={{ marginBottom: 1 }}>
            What is the start and end date of your current lease agreement?
          </FormLabel>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <DateForm name="leaseStart" />
            </Grid>
            <Grid item xs={6}>
              <DateForm name="leaseEnd" />
            </Grid>
          </Grid>
        </FormControl>
        <TextForm name="rent" />
        <TextForm name="landValue" />
        <SectionHeader text="Labor" />
        <FormControl>
          <FormLabel sx={{ marginBottom: 1 }}>
            Please list the positions you offer and estimated hourly wages for
            each.
          </FormLabel>
          <Grid container spacing={2}>
            {Array(jobsCount)
              .fill()
              .map((d, i) => {
                return (
                  <Fragment key={i}>
                    <Grid item xs={12} sm={8}>
                      <TextField
                        label="Position"
                        value={positions[i] || ''}
                        onChange={(e) =>
                          setPositions({ ...positions, [i]: e.target.value })
                        }
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        label="Wage"
                        value={wages[i] || ''}
                        onChange={(e) =>
                          setWages({ ...wages, [i]: e.target.value })
                        }
                        fullWidth
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              $/hr
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                  </Fragment>
                );
              })}
          </Grid>
          <Stack direction="row" spacing={1}>
            <IconButton onClick={() => setJobsCount(jobsCount + 1)}>
              <AddIcon />
            </IconButton>
          </Stack>
        </FormControl>
        <TextForm name="employees" />
        <TextForm name="volunteers" />
        <TextForm name="volunteerHours" />
        <SelectForm name="localWorkers" />
        <SectionHeader text="Enrichment opportunities" />
        <SelectForm name="studentPrograms" />
        <SelectForm name="skillsPrograms" />
        <TextForm name="outreachHours" />
        {currentUser.isAdmin && (
          <Stack spacing={2}>
            <SectionHeader text="Database Admin" />
            <TextForm name="authEmails" label="Emails Authorized to Edit" />
          </Stack>
        )}
        <Stack direction="row" spacing={2}>
          {!!Object.keys(match).length && (
            <Button
              variant="outlined"
              color="error"
              onClick={() => setOpenDelete(true)}
            >
              Delete
            </Button>
          )}
          <Button variant="contained" onClick={methods.handleSubmit(onSubmit)}>
            Submit
          </Button>
        </Stack>
      </Stack>
      <SelectDialog
        open={openVerify}
        selected={selected}
        setSelected={setSelected}
        handleClose={() => setOpenVerify(false)}
        handleSelect={handleSelect}
      />
      <DeleteDialog
        open={openDelete}
        handleClose={() => setOpenDelete(false)}
        handleDelete={handleDelete}
      />
    </FormProvider>
  );
};

export default FarmForm;
