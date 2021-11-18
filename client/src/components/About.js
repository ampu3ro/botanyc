import React from 'react';
import Header from './Header';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import { PROFILES, DATA_SOURCES } from './data';

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

const AvatarProfile = ({ name, href, width }) => {
  return (
    <Stack spacing={2} alignItems="center">
      <IconButton href={href} sx={{ width, height: width }}>
        <Avatar sx={{ width: width * 0.9, height: width * 0.9 }}>
          {name.substring(0, 1)}
        </Avatar>
      </IconButton>
      <Typography align="center">{name}</Typography>
    </Stack>
  );
};

const SimpleProfile = ({ name, title, employer }) => {
  const fontSize = '8pt';
  return (
    <Stack alignItems="center">
      <Typography align="center" sx={{ fontSize }}>
        <b>{name}</b>
      </Typography>
      <Typography align="center" sx={{ fontSize }}>
        <em>{title}</em>
      </Typography>
      <Typography align="center" sx={{ fontSize }}>
        {employer}
      </Typography>
    </Stack>
  );
};

const Profile = ({ category, people, avatarWidth }) => {
  return (
    <Stack spacing={2} alignItems="center">
      <Typography variant="h5">{category}</Typography>
      <Grid container justifyContent="center">
        {people.map(({ name, href, title, employer }) => {
          if (avatarWidth) {
            return (
              <Grid item key={name} xs={4} sm={3} md={2}>
                <AvatarProfile name={name} href={href} width={avatarWidth} />
              </Grid>
            );
          } else {
            return (
              <Grid item key={name} sx={{ padding: 2 }}>
                <SimpleProfile name={name} title={title} employer={employer} />
              </Grid>
            );
          }
        })}
      </Grid>
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
        {PROFILES.map((d) => (
          <Profile {...d} />
        ))}
        <Divider />
        <Typography variant="h5">Data sources</Typography>
        <Stack spacing={2}>
          {DATA_SOURCES.map((d) => (
            <Source {...d} />
          ))}
        </Stack>
      </Stack>
    </div>
  );
};

export default About;
