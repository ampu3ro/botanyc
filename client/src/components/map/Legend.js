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
import Tooltip from '@mui/material/Tooltip';
import Link from '@mui/material/Link';
import { styled, alpha } from '@mui/material/styles';
import { PAINT_COLOR, COLOR_BY, DENSITY_BY } from '../data';

const TypeHelp = (
  <Typography>
    Per Local Law 46 (2018), the Primary Land Use Tax Lot Output (“PLUTO”)
    database is changing: GreenThumb community gardens will no longer be
    classified as vacant lots, but as community gardens. (More information from{' '}
    <Link href="https://www.citylandnyc.org/community-gardens-to-be-classified-as-open-space-on-city-planning-database/">
      New York Law School
    </Link>
    .) Sites listed as "potential" are lots to be developed as community
    gardens.
  </Typography>
);

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
          <Tooltip
            title={expanded ? 'Hide legend' : 'Show legend'}
            placement="top"
          >
            <IconButton size="small" onClick={() => setExpanded(!expanded)}>
              {expanded ? <RemoveIcon /> : <AddIcon />}
            </IconButton>
          </Tooltip>
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
                {name === 'Potential' && (
                  <Tooltip title={TypeHelp} placement="right">
                    <Link
                      color="textPrimary"
                      sx={{
                        fontSize: '10pt',
                        textDecorationStyle: 'dotted',
                      }}
                    >
                      {label}
                    </Link>
                  </Tooltip>
                )}
                {name !== 'Potential' && (
                  <Typography sx={{ fontSize: '10pt' }}>{label}</Typography>
                )}
              </Grid>
            </Grid>
          ))}
        </Stack>
      )}
    </LegendPaper>
  );
};

export default Legend;
