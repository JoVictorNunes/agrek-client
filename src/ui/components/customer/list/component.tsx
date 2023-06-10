import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import {
  AppBar,
  Toolbar,
  IconButton,
  Dialog,
  Fab,
  TextField,
  Stack,
  Avatar,
  Card,
  CardHeader,
  Tooltip,
  CardActionArea,
  Grid,
  useMediaQuery,
} from '@mui/material';
import { Close, Add, GridView, ViewList } from '@mui/icons-material';
import Styled from './styles';
import SlideUp from '../../../styles/transitions/slide';

const CustomerList = (props) => {
  const [query, setQuery] = useState('');
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [view, setView] = useState<boolean>(true);
  const lg = useMediaQuery('(min-width: 901px)');
  const md = useMediaQuery('(max-width: 900px) and (min-width: 599px)');
  const sm = useMediaQuery('(max-width: 600px)');
  const search = new URLSearchParams(location.search);
  const { customers } = props;
  const open = search.get('dialog') === 'customers';
  const filteredCustomers = customers.filter(
    ({ name, cpf }) =>
      name.toLowerCase().includes(query.toLowerCase()) || cpf.includes(query)
  );

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <Dialog fullScreen open={open} TransitionComponent={SlideUp}>
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => {
              navigate(-1);
            }}
          >
            <Close />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Styled.Container>
        <Styled.Actions>
          <TextField
            label="Buscar"
            placeholder="Busque por um cliente"
            variant="outlined"
            value={query}
            onChange={handleQueryChange}
            size="small"
            sx={{
              width: '100%',
            }}
          />
          <IconButton
            onClick={() => {
              setView((v) => !v);
            }}
          >
            {view ? <ViewList /> : <GridView />}
          </IconButton>
        </Styled.Actions>
        <Grid spacing={2} container>
          {filteredCustomers.map((customer) => (
            <Grid item xs={view ? 12 : sm ? 6 : md ? 4 : 3}>
              <Card>
                <CardActionArea
                  onClick={() => {
                    search.delete('dialog');
                    navigate({
                      pathname: `/customer/${customer.id}`,
                      search: '?' + search.toString(),
                      hash: '#info',
                    });
                  }}
                >
                  <CardHeader
                    avatar={
                      <Avatar
                        sx={{ bgcolor: theme.palette.secondary.main }}
                        aria-label="recipe"
                      >
                        {customer.name.slice(0, 2)}
                      </Avatar>
                    }
                    title={customer.name}
                    subheader={customer.cpf}
                    classes={{
                      title: 'no-wrap',
                      content: 'overflow-hidden'
                    }}
                  />
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Tooltip title="Novo cliente" placement="left">
          <Fab
            color="primary"
            name="Novo cliente"
            onClick={() => {
              search.set('dialog', 'add-customer');
              navigate({
                search: '?' + search.toString(),
                hash: location.hash,
              });
            }}
            sx={{
              position: 'absolute',
              right: 20,
              bottom: 30,
            }}
          >
            <Add />
          </Fab>
        </Tooltip>
      </Styled.Container>
    </Dialog>
  );
};

export default CustomerList;
