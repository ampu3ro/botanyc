import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setSelected } from '../../store/actions/farms';
import { setEdit } from '../../store/actions/farms';
import { FARM_PROPS, DENSITY_BY } from '../data';
import Bar from './Bar';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import LanguageIcon from '@mui/icons-material/Language';
import Tooltip from '@mui/material/Tooltip';
import { useTheme } from '@mui/styles';

const FarmContent = ({ selected }) => {
  const currentUser = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleEdit = () => {
    dispatch(setEdit(selected));
    history.push('/farm');
  };

  return (
    <Stack spacing={2}>
      {Object.keys(FARM_PROPS)
        .filter((k) => !['floors', 'website', 'socials'].includes(k))
        .map((k) => {
          const { label, fields, adorn, int } = FARM_PROPS[k];
          const { properties } = selected;
          if (fields) {
            const data = fields
              .map((d) => ({ ...d, value: properties[d.name] }))
              .filter((d) => !!d.value);
            if (!data.length) return undefined;

            return (
              <Stack key={k}>
                <Typography>{`${label} (${adorn})`}</Typography>
                <Bar data={data} />
              </Stack>
            );
          }
          let v = properties[k];
          if (!label || !v) return undefined;
          if (k === 'name') {
            const { website } = properties;
            return (
              <div key={k}>
                <Typography variant="h4">{v}</Typography>
                <Grid container>
                  {currentUser.isAdmin && (
                    <Grid item>
                      <Tooltip title="Edit">
                        <IconButton onClick={handleEdit}>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                  )}
                  {website && (
                    <Grid item>
                      <Tooltip title="Website">
                        <IconButton href={website}>
                          <LanguageIcon />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                  )}
                </Grid>
              </div>
            );
          }
          if (!Array.isArray(v)) {
            v = [v];
          }
          return (
            <Stack key={k}>
              {k === 'updatedAt' && <Divider sx={{ marginBottom: 2 }} />}
              <Typography variant="subtitle2">{label}</Typography>
              {v.map((x, i) => (
                <Typography key={i}>
                  {['updatedAt', 'leaseStart', 'leaseEnd'].includes(k)
                    ? new Date(x).toDateString()
                    : int
                    ? `${parseInt(x).toLocaleString()}${
                        k === 'percentFood' ? '%' : ''
                      }`
                    : x}
                </Typography>
              ))}
            </Stack>
          );
        })}
    </Stack>
  );
};

const DistrictContent = ({ district, selected }) => {
  const { id, name, boroName, population } = selected.properties;

  return (
    <Stack spacing={2}>
      <Typography variant="h4">{name}</Typography>
      <Stack>
        <Typography>Borough</Typography>
        <Typography variant="h6">{boroName}</Typography>
      </Stack>
      <Stack>
        <Typography>Population</Typography>
        <Typography variant="h6">
          {parseInt(population).toLocaleString()}
        </Typography>
      </Stack>
      {DENSITY_BY.map(({ name, label, title, scale }) => {
        if (!title) {
          return (
            <Stack key={name}>
              <Typography>{label}</Typography>
              <Typography variant="h6">
                {parseInt(selected.properties[name]).toLocaleString()}
              </Typography>
            </Stack>
          );
        } else {
          const data = district.features
            .map(({ properties }) => ({
              label: properties.name,
              value: properties[name] * (scale || 1),
              selected: properties.id === id,
            }))
            .filter(({ value }) => value > 0);

          console.log(data);
          if (!data.length) return <div />;

          return (
            <Stack key={name}>
              <Typography>{title}</Typography>
              <Bar data={data} condensed />
            </Stack>
          );
        }
      })}
    </Stack>
  );
};

const Sidebar = () => {
  const district = useSelector((state) => state.district);
  const selected = useSelector((state) => state.selected);
  const dispatch = useDispatch();
  const theme = useTheme();

  const closeDrawer = (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    )
      return;
    const tip = document.getElementById('tooltip');
    if (tip) tip.remove();
    dispatch(setSelected(null));
  };

  if (!selected || !selected.properties) return <div />;

  return (
    <Drawer
      anchor="right"
      open={selected !== null}
      onClose={closeDrawer}
      BackdropProps={{ invisible: true }}
      sx={{ opacity: 0.8 }}
    >
      <Box
        sx={{
          padding: '2ch',
          width: 400,
          [theme.breakpoints.down('md')]: { width: 350 },
        }}
      >
        {selected.properties.boroName ? (
          <DistrictContent district={district} selected={selected} />
        ) : (
          <FarmContent selected={selected} />
        )}
      </Box>
    </Drawer>
  );
};

export default Sidebar;
