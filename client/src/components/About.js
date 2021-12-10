import React from 'react';
import Header from './Header';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import { useTheme } from '@mui/styles';
import { PROFILES, DATA_SOURCES } from './data';

const AvatarProfile = ({ name, school, src, profileUrl, width }) => {
  const theme = useTheme();
  const widthSm = width * 0.75;
  const widthAv = width * 0.85;
  const widthSmAv = widthAv * 0.75;

  return (
    <Stack alignItems="center">
      <IconButton
        href={profileUrl}
        sx={{
          width,
          height: width,
          [theme.breakpoints.down('sm')]: { width: widthSm, height: widthSm },
        }}
      >
        <Avatar
          src={src}
          alt={name}
          sx={{
            width: widthAv,
            height: widthAv,
            [theme.breakpoints.down('sm')]: {
              width: widthSmAv,
              height: widthSmAv,
            },
          }}
        >
          {name.substring(0, 1)}
        </Avatar>
      </IconButton>
      <Typography align="center">{name}</Typography>
      <Typography variant="body2" align="center">
        {school}
      </Typography>
    </Stack>
  );
};

const SimpleProfile = ({ name, employer }) => {
  return (
    <Stack alignItems="center">
      <Typography align="center" sx={{ fontSize: '10pt' }}>
        {name}
      </Typography>
      <Typography align="center" sx={{ fontSize: '8pt' }}>
        {employer}
      </Typography>
    </Stack>
  );
};

const ProfileSection = ({ category, people, avatarWidth }) => {
  return (
    <Stack spacing={2} alignItems="center">
      <Typography variant="h5" align="center">
        {category}
      </Typography>
      <Grid container justifyContent="center">
        {people.map(({ name, school, src, profileUrl, employer }) => {
          if (avatarWidth) {
            return (
              <Grid item key={name} xs={4} sm={3} md={2}>
                <AvatarProfile
                  name={name}
                  school={school}
                  src={src}
                  profileUrl={profileUrl}
                  width={avatarWidth}
                />
              </Grid>
            );
          } else {
            return (
              <Grid item key={name} sx={{ padding: 2 }}>
                <SimpleProfile name={name} employer={employer} />
              </Grid>
            );
          }
        })}
      </Grid>
    </Stack>
  );
};

const SourcesSection = ({ category, data }) => {
  return (
    <Stack spacing={2}>
      <Typography variant="h6">
        <b>{category}</b>
      </Typography>
      {data.map(({ description, sources }, i) => (
        <Stack key={i}>
          <Typography variant="subtitle1">{description}</Typography>
          <Typography variant="body2">
            {sources.map(({ name, href }, i) => (
              <span key={i}>
                {i > 0 && ', '}
                {href ? <Link href={href}>{name}</Link> : name}
              </span>
            ))}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
};

const About = () => {
  return (
    <div>
      <Header text="About" />
      <Stack spacing={4}>
        <Stack spacing={2}>
          <Typography variant="h5">What is M.A.P. NYC?</Typography>
          <Typography>
            Mapping Agricultural Production in New York City (M.A.P. NYC) is an
            interactive map that showcases food production in the city. The map
            not only points out farm and garden locations, but also provides
            information on food production and distribution, technologies,
            labor, services to the community, and other information. M.A.P. NYC
            is crowdsourced, meaning that each entry is editable by growers
            themselves. (To become a verified user for a specific farm or
            garden, see below.) In addition, the map can also display layers of
            basic socioeconomic data, to aid food-systems research.
            <p>
              M.A.P. NYC aims to help New York City reach its equity and
              sustainability goals by cataloging all food grown in the city in
              dedicated agricultural spaces (i.e., not backyards or window
              sills). Specifically, M.A.P. NYC was created to understand how
              much food is being produced in the Five Boroughs, where, by whom,
              and for what purpose. Creating this baseline of the city’s food
              production will help inform policy recommendations, stimulate
              local food production, and promote interest in urban agriculture.
              While this project is focused on food, M.A.P. NYC recognizes that
              urban agriculture plays many vital roles beyond food production,
              including education, the creation of safe and inclusive community
              spaces, and ecosystem services.
            </p>
            As a public data tool, M.A.P. NYC is designed to support growers
            (commercial, non-profit, community, and school-based), policymakers,
            researchers, and others interested in urban agriculture. Along with
            making visible the impressive work of urban growers, the map serves
            to help understand gaps and opportunities in the local food
            landscape, and to analyze possible links between urban agriculture
            and food security, health outcomes, and land use.
          </Typography>
        </Stack>
        <Stack spacing={2}>
          <Typography variant="h5">
            How do I edit or add my farm or garden?
          </Typography>
          <Typography>
            You can submit changes without becoming a verified user, but those
            changes will not be made unless a project administrator can
            independently validate their accuracy.
            <p style={{ marginBottom: 0 }}>
              To become a verified user for a farm or garden, please email{' '}
              <Link href="mailto:mapnyc@stern.nyu.edu">
                mapnyc@stern.nyu.edu
              </Link>
              .
            </p>
          </Typography>
        </Stack>
        <Stack spacing={2}>
          <Typography variant="h5">
            Who developed and maintains M.A.P. NYC?
          </Typography>
          <Typography>
            The{' '}
            <Link href="https://www.stern.nyu.edu/experience-stern/about/departments-centers-initiatives/centers-of-research/center-sustainable-business">
              NYU Stern Center for Sustainable Business (CSB)
            </Link>{' '}
            launched M.A.P. NYC in 2021 as part of its multi-year{' '}
            <Link href="https://www.stern.nyu.edu/experience-stern/about/departments-centers-initiatives/centers-of-research/center-sustainable-business/research/research-initiatives/invest-nyc-sdg-initiative">
              Invest NYC SDG
            </Link>{' '}
            initiative, in collaboration with the{' '}
            <Link href="https://engineering.nyu.edu/">
              NYU Tandon School of Engineering
            </Link>
            , the{' '}
            <Link href="https://cusp.nyu.edu/">
              NYU Center for Urban Science and Progress (CUSP)
            </Link>
            , and{' '}
            <Link href="https://harvestny.cce.cornell.edu/">
              Cornell Cooperative Extension–Harvest New York (CCE)
            </Link>
            .
            <p style={{ marginBottom: 0 }}>
              The project is led by Dr. Alice Reznickova (Tandon) and Wythe
              Marschall (CSB) and developed by graduate data science students at
              CUSP, with support from Tandon undergraduate students who are
              majoring in Sustainable Urban Environments. The web application
              and map were developed by Nico Ampuero (CUSP), with supporting
              research from Jeremy Rucker and Xiaolin Li (CUSP), as well as
              Gianna White and Christina Curry (Tandon).
            </p>
          </Typography>
        </Stack>
        {PROFILES.filter(({ avatarWidth }) => avatarWidth).map((d, i) => (
          <ProfileSection key={i} {...d} />
        ))}
        <Divider />
        <Typography>
          The project team is grateful to all contributors of data for the map,
          including the growers of New York City, CCE, the New York City
          Department of Parks & Recreation (Parks) GreenThumb, GrowNYC, and City
          Harvest.
          <p>
            Financial support to create M.A.P. NYC came from the Mother Cabrini
            Health Foundation, The New York Community Trust, and NYU Tandon.
          </p>
          M.A.P. NYC’s advisory board includes:
        </Typography>
        {PROFILES.filter(({ avatarWidth }) => !avatarWidth).map((d, i) => (
          <ProfileSection key={i} {...d} />
        ))}
        <Typography>
          If you would like to join the M.A.P. NYC advisory board, please email
          [TBD].
        </Typography>
        <Divider />
        <Stack spacing={2}>
          <Typography variant="h5">
            What data sets does M.A.P. NYC use?
          </Typography>
          <Typography>
            The current datasets that power M.A.P. NYC include:
          </Typography>
          <Stack spacing={4}>
            {DATA_SOURCES.map((d, i) => (
              <SourcesSection key={i} {...d} />
            ))}
          </Stack>
        </Stack>
      </Stack>
    </div>
  );
};

export default About;
