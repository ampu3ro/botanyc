import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelected } from '../../store/actions/locations';
import { FARM_PROPS } from '../location/dataTypes';
import Bar from './Bar';
import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

const Sidebar = () => {
  const selected = useSelector((state) => state.selected);
  const dispatch = useDispatch();

  const closeDrawer = (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    )
      return;
    dispatch(setSelected(null));
  };

  if (selected === null) return <div />;

  return (
    <Drawer
      anchor="right"
      open={selected !== null}
      onClose={closeDrawer}
      BackdropProps={{ invisible: true }}
      sx={{ opacity: 0.8 }}
    >
      <Box sx={{ width: 300, padding: '2ch' }} onClick={closeDrawer}>
        <Stack spacing={2}>
          {Object.keys(FARM_PROPS)
            .filter((k) => k !== 'floors')
            .map((k) => {
              const { label, fields, adorn, int } = FARM_PROPS[k];
              if (fields) {
                const data = fields
                  .map((d) => ({ ...d, value: selected[d.name] }))
                  .filter((d) => !!d.value);
                if (!data.length) return undefined;

                return (
                  <Stack key={k}>
                    <Typography>{`${label} (${adorn})`}</Typography>
                    <Bar data={data} />
                  </Stack>
                );
              }
              let v = selected[k];
              if (!label || !v) return undefined;

              if (v[0] === '[' && v.at(-1) === ']') {
                // mapbox stores arrays as strings
                v = JSON.parse(v).join(', ');
              }
              const name = k === 'name';
              const time = k === 'updatedAt';

              return (
                <Stack key={k}>
                  {time && <Divider sx={{ marginBottom: 2 }} />}
                  {!name && <Typography>{label}</Typography>}
                  <Typography variant={name ? 'h4' : 'h6'}>
                    {time
                      ? new Date(v).toDateString()
                      : int
                      ? parseInt(v).toLocaleString('en')
                      : v}
                  </Typography>
                </Stack>
              );
            })}
        </Stack>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
