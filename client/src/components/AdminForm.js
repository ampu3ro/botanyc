import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import Header from './Header';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';
import { CSVDownloader } from 'react-papaparse';
import { editUser, fetchUsers } from '../store/actions/users';
import { fetchApprovals } from '../store/actions/farms';

const AdminForm = () => {
  const [search, setSearch] = useState('');
  const [match, setMatch] = useState({});
  const [admin, setAdmin] = useState(false);

  const users = useSelector((state) => state.users);
  const approvals = useSelector((state) => state.approvals);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchApprovals());
  }, [dispatch]);

  const handleSearch = (event, value) => {
    setSearch(value);
    setMatch({});

    if (!value || value === '') return;

    setSearch(value);

    const matches = users.filter((d) => d.email === value);
    if (!matches.length) return;

    setMatch(matches[0]);
    setAdmin(matches[0].admin);
  };

  const handleChange = (event) => {
    const admin = event.target.checked;
    const user = { ...match, admin };
    setAdmin(admin);
    dispatch(editUser(user));
  };

  return (
    <div>
      <Header text="Admin Settings" />
      <Grid container direction="column" spacing={2}>
        {!!users.length && (
          <Grid item>
            <Autocomplete
              id="search"
              options={users.map((d) => d.email)}
              freeSolo
              value={search}
              onChange={handleSearch}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search Users to Toggle Priveleges"
                />
              )}
              fullWidth
            />
          </Grid>
        )}
        {!!Object.keys(match).length && (
          <Grid item>
            <FormControlLabel
              control={<Switch checked={admin} onChange={handleChange} />}
              label="Admin priveleges"
            />
          </Grid>
        )}
        {!!approvals.length && (
          <Grid item>
            <Button variant="contained" startIcon={<DownloadIcon />}>
              <CSVDownloader data={approvals} filename="botanyc_approvals">
                Approvals
              </CSVDownloader>
            </Button>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default AdminForm;
