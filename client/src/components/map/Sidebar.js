import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelected } from '../../store/actions/locations';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

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
    <Drawer anchor="right" open={selected !== null} onClose={closeDrawer}>
      <Box sx={{ width: 300, padding: '2ch' }} onClick={closeDrawer}>
        <Stack spacing={2}>
          {Object.keys(selected).map((k) => {
            let v = selected[k];
            if (v[0] === '[' && v.at(-1) === ']') {
              // mapbox stores arrays as strings
              v = JSON.parse(v).join(', ');
            }
            return v === '' ? undefined : <Typography key={k}>{v}</Typography>;
          })}
        </Stack>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
