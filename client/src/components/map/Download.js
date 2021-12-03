import React from 'react';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';
import { CSVDownloader } from 'react-papaparse';
import Grid from '@mui/material/Grid';

const Download = () => {
  const farmFiltered = useSelector((state) => state.farmFiltered);

  const features = farmFiltered.features.map((feature) => {
    const { authUsers, modifiedBy, needsApproval, distro1, ...properties } =
      feature.properties;
    return { ...feature, properties };
  });

  const properties = features.map((d) => d.properties);

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
