import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { styled, alpha } from '@mui/material/styles';

const LegendPaper = styled(Paper)(({ theme }) => ({
  position: 'absolute',
  left: theme.spacing(2),
  top: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.7),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.9),
  },
  padding: theme.spacing(1.5),
}));

const Legend = ({ colors }) => {
  const [expanded, setExpanded] = useState(true);

  if (!colors || colors.length <= 1) return <div />;

  return (
    <LegendPaper elevation={0}>
      <Grid container alignItems="center">
        <Grid item>
          <IconButton size="small" onClick={() => setExpanded(!expanded)}>
            {expanded ? <RemoveIcon /> : <AddIcon />}
          </IconButton>
        </Grid>
        {expanded && (
          <Grid item>
            <Typography variant="h6">Legend</Typography>
          </Grid>
        )}
      </Grid>
      {expanded && (
        <Stack>
          {colors.map(({ name, color, label }) => (
            <Grid
              container
              key={name}
              rowSpacing={2}
              columnSpacing={1}
              alignItems="center"
            >
              <Grid item>
                <Avatar sx={{ width: 10, height: 10, bgcolor: color }}>
                  <img />
                </Avatar>
              </Grid>
              <Grid item>
                <Typography sx={{ fontSize: '10pt' }}>{label}</Typography>
              </Grid>
            </Grid>
          ))}
        </Stack>
      )}
    </LegendPaper>
  );
};

export default Legend;
