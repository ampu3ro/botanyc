import React from 'react';
import { useSelector } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';

export const VerifyDialog = ({
  open,
  formatted,
  setFormatted,
  handleClose,
  handleVerify,
}) => {
  const geocoded = useSelector((state) => state.geocoded);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{`${
        geocoded.length > 1 ? 'Select' : 'Verify'
      } Location`}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {geocoded.length > 1
            ? 'Google found multiple locations for the address you entered. Please select one.'
            : 'Is this the correct location?'}
        </DialogContentText>
        <RadioGroup
          value={formatted}
          onChange={(e) => setFormatted(e.target.value)}
        >
          {geocoded.map((d) => (
            <FormControlLabel
              label={d.formattedAddress}
              value={d.formattedAddress}
              key={d.formattedAddress}
              control={<Radio />}
            />
          ))}
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleVerify}>Select</Button>
      </DialogActions>
    </Dialog>
  );
};

export const DeleteDialog = ({ open, handleClose, handleDelete }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this location from the database?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button color="error" onClick={handleDelete}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
