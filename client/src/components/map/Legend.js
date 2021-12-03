import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { styled, alpha } from '@mui/material/styles';
import { PAINT_COLOR, COLOR_BY, DENSITY_BY } from '../data';

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

const Legend = () => {
  const [expanded, setExpanded] = useState(true);

  const display = useSelector((state) => state.display);
  const colorBy = useSelector((state) => state.colorBy);
  const densityBy = useSelector((state) => state.densityBy);

  const density = display === 'district';
  const name = density ? 'density' : colorBy;
  const colors = PAINT_COLOR[name];
  const variant = density ? 'square' : 'circle';
  const title = density
    ? DENSITY_BY.filter((d) => d.name === densityBy).map((d) => d.label)
    : COLOR_BY.filter((d) => d.name === colorBy).map((d) => d.label);

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
            <Typography variant="subtitle">{title}</Typography>
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
                <Avatar
                  sx={{ width: 10, height: 10, bgcolor: color }}
                  variant={variant}
                >
                  <img alt="" />
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
