import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setSelected } from '../../store/actions/locations';
import { setEdit } from '../../store/actions/farm';
import { FARM_PROPS } from '../data';
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

  return Object.keys(FARM_PROPS)
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
      const time = k === 'updatedAt';
      if (v[0] === '[' && v.at(-1) === ']') {
        // mapbox stores arrays as strings
        v = JSON.parse(v).join(', ');
      }
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
    });
};

const BoroughContent = ({ selected }) => {
  return <div>Boro</div>;
};

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
          {selected.id ? (
            <FarmContent selected={selected} />
          ) : (
            <BoroughContent selected={selected} />
          )}
        </Stack>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
