import React from 'react';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';
import { CSVDownloader } from 'react-papaparse';
import Grid from '@mui/material/Grid';
import { FARM_DEFAULT } from '../data';

const Download = () => {
  const farmFiltered = useSelector((state) => state.farmFiltered);

  if (!farmFiltered.features) return <div />;

  const features = farmFiltered.features.map((feature) => {
    const { authUsers, modifiedBy, needsApproval, distro1, ...properties } =
      feature.properties;
    return { ...feature, properties };
  });

  const fields = ['id', 'createdAt', 'updatedAt', ...Object.keys(FARM_DEFAULT)];
  const properties = features
    .map((d) => d.properties)
    .map((p) => Object.fromEntries(fields.map((d) => [d, p[d] || ''])));

  return (
    <Grid container spacing={2}>
      <Grid item>
        <Button variant="outlined" startIcon={<DownloadIcon />}>
          <CSVDownloader data={properties} filename="mapnyc">
            CSV
          </CSVDownloader>
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="outlined"
          startIcon={<DownloadIcon />}
          href={
            'data:text/json;charset=utf-8,' +
            encodeURIComponent(JSON.stringify({ ...farmFiltered, features }))
          }
          download="mapnyc.geojson"
        >
          json
        </Button>
      </Grid>
    </Grid>
  );
};

export default Download;
