import React from 'react';
import Header from './Header';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';

const SOURCES = [
  {
    name: 'GreenThumb',
    href: 'https://data.cityofnewyork.us/browse?Data-Collection_Data-Collection=GreenThumb+Gardens&q=greenthumb',
    description:
      'GreenThumb is a Park Department program that provides support to over 550 community gardens in NYC',
    use: 'Community garden names, locations, and attributes',
  },
  {
    name: 'GrowNYC',
    href: 'https://www.grownyc.org/gardens/our-community-gardens',
    description: `GrowNYC has built more than 135 new gardens, including GreenThumb community gardens; 
    gardens in public housing developments, daycares, and senior centers; and an urban farm on Governors Island`,
    use: 'Community and school garden names and locations',
  },
  {
    name: 'Brooklyn Queens Land Trust',
    href: 'https://bqlt.org/',
    description: `BQLT gardens provide opportunities for diverse groups of people to meet and work 
    together cooperatively`,
    use: 'Community garden names, locations, and attributes',
  },
  {
    name: 'NYC DOHMH',
    href: 'https://data.cityofnewyork.us/dataset/DOHMH-Farmers-Markets/8vwk-6iz2',
    description: `The Department of Health and Mental Hygiene (DOHMH) is the NYC's public health agency`,
    use: 'Farmers market vendor locations, products, and EBT acceptance',
  },
  {
    name: '???',
    href: '',
    description: '',
    use: 'Food pantry locations and schedules',
  },
  {
    name: 'Mapbox',
    href: 'https://www.mapbox.com/maps/streets',
    description: `Mapbox Streets is a comprehensive, general-purpose map that emphasizes accurate, 
    legible styling of road and transit networks`,
    use: 'NYC Subway stops',
  },
  {
    name: 'NYC DCP',
    href: 'https://www1.nyc.gov/site/planning/data-maps/open-data/districts-download-metadata.page',
    description:
      'The Department of City Planning (DCP) is NYC’s primary land use agency',
    use: 'Community District boundaries',
  },
  {
    name: 'Data2Go',
    href: 'https://data2go.nyc/map/#10/40.8276/-73.9588',
    description: `DATA2GO.NYC brings together federal, state, and city data on a broad range of issues critical 
      to the well-being of all New Yorkers`,
    use: 'Select socioeconomic indicators originally sourced from the American Community Survey',
  },
];

const DEVELOPERS = [
  { name: 'Jeremy Rucker', href: 'https://www.linkedin.com/in/jeremyr327/' },
  { name: 'Nico Ampuero', href: 'https://www.linkedin.com/in/ampu3ro/' },
  { name: 'Xiaolin Li', href: '' },
];

const SPONSORS = [
  {
    name: 'Alice Reznickova',
    href: 'https://www.linkedin.com/in/anna-alice-reznickova-09541379/',
  },
  { name: 'Whythe Marschall', href: 'https://www.linkedin.com/in/wythe/' },
];

const Source = ({ name, href, use, description }) => {
  return (
    <Stack>
      <Typography variant="h6">
        <Link href={href} target="_blank">
          {name}
        </Link>
      </Typography>
      <Typography variant="subtitle1">{use}</Typography>
      <Typography variant="body2">{description}</Typography>
    </Stack>
  );
};

const Profile = ({ name, href, width }) => {
  return (
    <Stack spacing={2} alignItems="center">
      <IconButton href={href} sx={{ width, height: width }}>
        <Avatar sx={{ width: width * 0.9, height: width * 0.9 }}>
          {name.substring(0, 1)}
        </Avatar>
      </IconButton>
      <Typography>{name}</Typography>
    </Stack>
  );
};

const About = () => {
  return (
    <div>
      <Header text="About" />
      <Stack spacing={4}>
        <Typography>
          Mapping Aggricultural Production in NYC (MAP NYC) is a project led by
          the&nbsp;
          <Link
            href="https://www.stern.nyu.edu/experience-stern/about/departments-centers-initiatives/centers-of-research/center-sustainable-business"
            target="_blank"
          >
            NYU Stern Center for Sustainable Business
          </Link>
          &nbsp;that aims to help the city and its partners reach equity and
          sustainability goals by cataloging all food growers within the city.
          This platform was created by graduate students at the&nbsp;
          <Link href="https://cusp.nyu.edu/" target="_blank">
            NYU Center for Urban Science and Progress
          </Link>
          &nbsp;and is intended to serve as a centralized repository for
          crowdsourced data related to agriculutral production. The live,
          interative map offers a multi-facetted view of the current state of
          urban agriculture in NYC. We hope it encourages data sharing for
          social engagement, academic research, and policy initiatives that help
          grow the blossoming ecosystem.
        </Typography>
        <Divider />
        <Stack spacing={2} alignItems="center">
          <Typography variant="h5">Development team</Typography>
          <Grid container justifyContent="center">
            {DEVELOPERS.map(({ name, href }) => (
              <Grid item key={name} xs={4} sm={3} md={2}>
                <Profile name={name} href={href} width={100} />
              </Grid>
            ))}
          </Grid>
        </Stack>
        <Stack spacing={2} alignItems="center">
          <Typography variant="h5">Project sponsors</Typography>
          <Grid container justifyContent="center">
            {SPONSORS.map(({ name, href }) => (
              <Grid item key={name} xs={4} sm={3} md={2}>
                <Profile name={name} href={href} width={80} />
              </Grid>
            ))}
          </Grid>
        </Stack>
        <Stack spacing={2} alignItems="center">
          <Typography variant="h5">Advisory board</Typography>
          <Typography>...</Typography>
        </Stack>
        <Divider />
        <Typography variant="h5">Data sources</Typography>
        <Stack spacing={2}>
          {SOURCES.map((d) => (
            <Source {...d} />
          ))}
        </Stack>
      </Stack>
    </div>
  );
};

export default About;
