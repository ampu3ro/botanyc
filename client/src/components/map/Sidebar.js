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
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

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
        .filter((k) => k !== 'floors')
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
            return (
              <Typography variant="h4" key={k}>
                {v}
                {currentUser.isAdmin && (
                  <IconButton
                    sx={{
                      display: 'inline-flex',
                      verticalAlign: 'middle',
                    }}
                    onClick={handleEdit}
                  >
                    <EditIcon />
                  </IconButton>
                )}
              </Typography>
            );
          }
          if (Array.isArray(v)) {
            v = v.join(', ');
          }
          const time = k === 'updatedAt';
          return (
            <Stack key={k}>
              {time && <Divider sx={{ marginBottom: 2 }} />}
              <Typography>{label}</Typography>
              <Typography variant="h6">
                {time
                  ? new Date(v).toDateString()
                  : int
                  ? parseInt(v).toLocaleString()
                  : v}
              </Typography>
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
            <Stack>
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

  const closeDrawer = (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    )
      return;
    document.getElementById('tooltip').remove();
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
      <Box sx={{ width: 300, padding: '2ch' }} onClick={closeDrawer}>
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
