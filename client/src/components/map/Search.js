import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelected, setSearch } from '../../store/actions/farms';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import { styled, alpha } from '@mui/material/styles';

const SearchDiv = styled('div')(({ theme }) => ({
  position: 'absolute',
  right: theme.spacing(2),
  top: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.4),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.8),
  },
  marginLeft: theme.spacing(1),
  width: 'auto',
}));

const AutoSearch = styled(Autocomplete)(({ theme }) => ({
  color: 'inherit',
  '& .MuiAutocomplete-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '10ch',
    '&:focus': {
      width: '50ch',
    },
    [theme.breakpoints.down('sm')]: {
      '&:focus': {
        width: '30ch',
      },
    },
  },
}));

const Search = () => {
  const [open, setOpen] = React.useState(false);

  const farm = useSelector((state) => state.farm);
  const search = useSelector((state) => state.search);

  const dispatch = useDispatch();

  const handleSearch = (event, value) => {
    dispatch(setSearch(value));
    dispatch(setSelected({ ...value, fly: true }));
  };

  const { features } = farm;
  if (!features) return <div />;

  const startAdornment = (
    <InputAdornment position="start">
      <SearchIcon />
    </InputAdornment>
  );

  return (
    <SearchDiv>
      <AutoSearch
        options={features}
        freeSolo
        open={open}
        onClose={() => setOpen(false)}
        onInputChange={(e, v) => setOpen(v !== '')}
        value={search}
        onChange={handleSearch}
        renderInput={(params) => (
          <TextField
            {...params}
            InputProps={{ ...params.InputProps, startAdornment }}
          />
        )}
      />
    </SearchDiv>
  );
};

export default Search;
