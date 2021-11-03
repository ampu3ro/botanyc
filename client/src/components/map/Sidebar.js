import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelected } from '../../store/actions/locations';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { FARM_PROPS } from '../location/dataTypes';

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
          {Object.keys(FARM_PROPS).map((k) => {
            const { label } = FARM_PROPS[k];
            let v = selected[k];
            if (!label || !v) return undefined;
            if (v[0] === '[' && v.at(-1) === ']') {
              // mapbox stores arrays as strings
              v = JSON.parse(v).join(', ');
            }
            return (
              <Stack key={k}>
                <Typography>{label}</Typography>
                <Typography variant="h5">{v}</Typography>
              </Stack>
            );
          })}
        </Stack>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
