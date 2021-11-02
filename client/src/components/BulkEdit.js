import { React, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { editBulk, setBulkEdit } from '../store/actions/farm';
import { setAlert } from '../store/actions/alert';
import { CSVReader } from 'react-papaparse';
import Header from './Header';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

const BulkEdit = () => {
  const [loaded, setLoaded] = useState([]);
  const [open, setOpen] = useState(false);
  const currentUser = useSelector((state) => state.currentUser);
  const edits = useSelector((state) => state.edits);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleOnDrop = (data) => {
    setLoaded(data);
  };

  const handleOnError = (err) => {
    dispatch(setAlert({ severity: 'error', message: err.message }));
  };

  const handleOnRemoveFile = (data) => {
    setLoaded([]);
  };

  const handleSubmit = () => {
    const data = loaded
      .filter((d) => !d.errors.length)
      .map((d) => d.data)
      .filter((d) => d.name !== '');
    dispatch(editBulk({ currentUser, data }));
  };

  useEffect(() => {
    if (Object.keys(edits).length) {
      setOpen(true);
    }
  }, [edits]);

  const handleClose = () => {
    setOpen(false);
    dispatch(setBulkEdit({}));
    history.push('/');
  };

  return (
    <div>
      <Header text="Bulk Edit Locations" />
      <CSVReader
        onDrop={handleOnDrop}
        onError={handleOnError}
        addRemoveButton
        onRemoveFile={handleOnRemoveFile}
        config={{ header: true }}
      >
        <span>Drop .csv file here or click to upload</span>
      </CSVReader>
      <Button
        disabled={!loaded.length}
        onClick={handleSubmit}
        variant="contained"
        sx={{ marginTop: 2 }}
      >
        Write!
      </Button>
      {!!Object.keys(edits).length && (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Bulk upload results</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {`${edits.nInserted} inserted`}
              <br />
              {`${edits.nModified} updated`}
              <br />
              {`${edits.nRemoved} removed`}
              <br />
              {`${edits.writeErrors?.length} errors`}
            </DialogContentText>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default BulkEdit;
