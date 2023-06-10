import React, { useEffect, useState, useContext } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Outlet,
  useLocation,
  Link,
  useNavigate,
  redirect,
  useLoaderData,
  useActionData,
  json,
} from 'react-router-dom';
import {
  Button,
  AppBar,
  Toolbar,
  IconButton,
  ButtonGroup,
  Breadcrumbs,
  Divider,
  Box,
  Menu,
  MenuItem,
  Typography,
  useMediaQuery,
} from '@mui/material';
import {
  Brightness7,
  Brightness4,
  AccountCircle,
  ArrowDropUp,
  AdminPanelSettings,
  NavigateNext,
  Person,
} from '@mui/icons-material';
import CustomerList from 'ui/components/customer/list/component';
import AddCustomer from 'ui/components/customer/add/component';
import { ColorModeContext } from 'ui/styles/theme/index';
import {
  getCustomer,
  createCustomer,
  getAreaById,
  getCustomers,
  type Customer,
  type Area,
  type Spraying,
} from 'api';

const customerRegEx = /customer\/(?<customerId>[A-Za-z0-9-]+)/;
const areaRegEx = /area\/(?<areaId>[A-Za-z0-9-]+)/;
const sprayingRegEx = /sprayingId\/(?<sprayingId>[A-Za-z0-9-]+)/;
const phoneRegEx = /^\([0-9]{2}\) [0-9]{5}-[0-9]{4}$/;
const cpfRegEx = /^[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}$/;

type CreateCustomerData = {
  name: string;
  cpf: string;
  phone: string;
  address?: {
    address: string;
    number: string;
    neighborhood: string;
    cep: string;
    city: string;
    state: string;
  };
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data: Record<string, string> = Object.fromEntries(formData);

  if (data.id === 'add-customer') {
    const body: CreateCustomerData = {
      name: data.name,
      cpf: data.cpf,
      phone: data.phone,
    };

    if (data.withAddress) {
      body.address = {
        address: data.address,
        number: data.number,
        neighborhood: data.neighborhood,
        cep: data.cep,
        city: data.city,
        state: data.state,
      };
    }

    const errors = {};

    if (!cpfRegEx.test(body.cpf)) {
      errors['cpf'] = 'CPF inválido';
    }

    if (!phoneRegEx.test(body.phone)) {
      errors['phone'] = 'Telefone inválido';
    }

    if (Object.keys(errors).length) {
      return { errors };
    }

    const response = await createCustomer(body);
    return response;
  }
};

export const loader = async () => {
  const customers = await getCustomers();

  if (customers.status === 401) {
    return redirect('/login');
  }

  return customers;
};

const App = () => {
  const { customers } = useLoaderData() as { customers: Customer[] };
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [area, setArea] = useState<Area | null>(null);
  const [spraying, setSpraying] = useState<Spraying | null>(null);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const sm = useMediaQuery('(max-width: 600px)');
  const search = new URLSearchParams(location.search);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      return navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    if (customerRegEx.test(location.pathname)) {
      const result = customerRegEx.exec(location.pathname);
      const customerId = result?.groups?.customerId;

      if (customerId) {
        getCustomer(customerId)
          .then((response) => {
            if (response.status === 200) {
              return response.json();
            }

            if (response.status === 401) {
              navigate('/login');
            }
          })
          .then(({ customer }) => {
            setCustomer(customer);
          });
      }
    } else {
      setCustomer(null);
    }

    if (areaRegEx.test(location.pathname)) {
      const result = areaRegEx.exec(location.pathname);
      const areaId = result?.groups?.areaId;

      if (areaId) {
        getAreaById(areaId)
          .then(async (response) => {
            if (response.status === 200) {
              return response.json();
            }

            if (response.status === 401) {
              navigate('/login');
            }
          })
          .then(({ area }) => {
            setArea(area);
          });
      }
    } else {
      setArea(null);
    }

    if (sprayingRegEx.test(location.pathname)) {
      const result = sprayingRegEx.exec(location.pathname);
      const sprayingId = result?.groups?.sprayingId;

      if (sprayingId) {
        // CustomerService.getSpraying(sprayingId)
        //   .then((response) => {
        //     if (response.status === 200) {
        //       return response.json();
        //     }
        //     if (response.status === 401) {
        //       navigate('/login');
        //     }
        //   })
        //   .then(({ spraying }) => {
        //     setSpraying(spraying);
        //   });
      }
    } else {
      setSpraying(null);
    }
  }, [location.pathname, navigate]);

  const handleMenu = (e) => {
    setMenuAnchor(e.target);
  };

  const handleCloseMenu = () => {
    setMenuAnchor(null);
  };

  return (
    <Box
      id="app"
      sx={{
        backgroundColor: 'background.default',
        color: 'text.primary',
      }}
    >
      <AppBar position="static">
        <Toolbar
          sx={{
            justifyContent: 'space-between',
          }}
        >
          <img
            src="/agriculture_light.png"
            alt="app icon"
            height={32}
            width={32}
          />
          <Breadcrumbs separator={<NavigateNext fontSize="small" />}>
            <ButtonGroup>
              <Button
                size="small"
                color={theme.palette.mode === 'light' ? 'secondary' : 'primary'}
                disabled={!customer}
                onClick={() => {
                  navigate(`/customer/${customer?.id}`);
                }}
                sx={{
                  width: '278px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  justifyContent: 'left',
                  display: 'block',
                }}
              >
                {customer ? customer.name : 'Nenhum cliente selecionado'}
              </Button>
              <Button
                size="small"
                onClick={() => {
                  search.set('dialog', 'customers');
                  navigate({
                    search: '?' + search.toString(),
                    hash: location.hash,
                  });
                }}
                color={theme.palette.mode === 'light' ? 'secondary' : 'primary'}
              >
                <ArrowDropUp />
              </Button>
            </ButtonGroup>
            {area && (
              <Button
                size="small"
                component={Link}
                to={`/customer/${customer?.id}/area/${area.id}`}
                variant="outlined"
                color={theme.palette.mode === 'light' ? 'secondary' : 'primary'}
              >
                {area.name}
              </Button>
            )}
            {spraying && (
              <Button
                size="small"
                component={Link}
                to={`/customer/${customer?.id}/area/${area?.id}/spraying/${spraying.id}`}
                variant="outlined"
                color={theme.palette.mode === 'light' ? 'secondary' : 'primary'}
              >
                Pulverização
              </Button>
            )}
          </Breadcrumbs>

          <Box>
            <IconButton
              onClick={() => {
                navigate('/panel');
              }}
            >
              <AdminPanelSettings />
            </IconButton>

            <IconButton
              sx={{ ml: 1 }}
              onClick={colorMode.toggleColorMode}
              color="inherit"
            >
              {theme.palette.mode === 'dark' ? (
                <Brightness7 />
              ) : (
                <Brightness4 />
              )}
            </IconButton>

            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={menuAnchor}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(menuAnchor)}
              onClose={handleCloseMenu}
            >
              <MenuItem
                key={1}
                onClick={() => {
                  handleCloseMenu();
                  navigate('/user');
                }}
              >
                <Typography textAlign="center">Perfil</Typography>
              </MenuItem>
              <MenuItem
                key={2}
                onClick={() => {
                  handleCloseMenu();
                  localStorage.removeItem('token');
                  navigate('/login');
                }}
              >
                <Typography textAlign="center">Sair</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Divider />
      <Outlet />
      <CustomerList customers={customers} />
      <AddCustomer />
    </Box>
  );
};

export default App;
