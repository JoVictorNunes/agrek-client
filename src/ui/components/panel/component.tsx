import React, { useState, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Divider from '@mui/material/Divider';
import { Link, useLocation, Form, useLoaderData } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Stack from '@mui/material/Stack';
import { TbDrone } from 'react-icons/tb';
import SlideUp from 'ui/styles/transitions/slide';
import { Drone } from 'api/types';

export const action = async ({ request }) => {
  const data = await request.formData();
  switch (data.get('id')) {
    case 'new-machine': {
      const day = data.get('date').split('/')[0];
      const month = data.get('date').split('/')[1];
      const year = data.get('date').split('/')[2];
      const date = new Date();
      date.setDate(Number(day));
      date.setMonth(Number(month));
      date.setFullYear(Number(year));
      const body = {
        name: data.get('name'),
        model: data.get('model'),
        manufacturer: data.get('manufacturer'),
        year: data.get('year'),
        price: Number(data.get('price').replace('.', '')),
        date: date.getTime(),
      };

      const response = await fetch(`${process.env.REACT_APP_SERVER}/drones`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(body),
      });

      if (response.status === 201) {
        return response;
      }
      break;
    }
    default: {
    }
  }
  return null;
};

export const loader = async () => {
  const response = fetch(`${process.env.REACT_APP_SERVER}/drones`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response;
};

const Panel = () => {
  const [tab, setTab] = useState(0);
  const [showAddMachine, setShowAddMachine] = useState(false);
  const location = useLocation();
  const [name, setName] = useState('');
  const [type, setType] = useState('drone');
  const [model, setModel] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [year, setYear] = useState('');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState('');
  const [disableActions, setDisableActions] = useState(false);
  const { drones } = useLoaderData() as {
    drones: Drone[]
  };
  const [droneListOpen, setDroneListOpen] = useState(false);
  const [selectedDrone, setSelectedDrone] = useState(-1);

  useEffect(() => {
    if (location.hash === '#assets') return setTab(0);
    if (location.hash === '#financial') return setTab(1);
  }, [location.hash]);

  const renderAddMachineForm = () => {
    return (
      <Dialog
        fullScreen
        onClose={() => {
          setShowAddMachine(false);
        }}
        open={showAddMachine}
        TransitionComponent={SlideUp}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => {
                setShowAddMachine(false);
              }}
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6">Nova máquina</Typography>

          <Form
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
            method="post"
            id="new-machine"
          >
            <input type="hidden" name="id" value="new-machine" />
            <TextField
              label="Nome"
              name="name"
              type="text"
              variant="standard"
              disabled={disableActions}
              helperText={' '}
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />

            <FormControl sx={{ flexGrow: 1 }}>
              <InputLabel>Tipo</InputLabel>
              <Select
                label="Tipo"
                name="type"
                variant="standard"
                disabled={disableActions}
                // helperText={' '}
                onChange={(e) => setType(e.target.value)}
                value={type}
                required
              >
                <MenuItem value={'drone'}>Drone</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Modelo"
              name="model"
              type="text"
              variant="standard"
              disabled={disableActions}
              helperText={' '}
              onChange={(e) => setModel(e.target.value)}
              value={model}
              required
            />

            <TextField
              label="Fabricante"
              name="manufacturer"
              type="text"
              variant="standard"
              disabled={disableActions}
              helperText={' '}
              onChange={(e) => setManufacturer(e.target.value)}
              value={manufacturer}
              required
            />

            <TextField
              label="Ano de fabricação"
              name="year"
              type="text"
              variant="standard"
              disabled={disableActions}
              helperText={' '}
              onChange={(e) => setYear(e.target.value)}
              value={year}
              required
            />

            <TextField
              label="Valor de aquisição"
              name="price"
              type="text"
              variant="standard"
              disabled={disableActions}
              helperText={' '}
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              required
            />

            <TextField
              label="Data de aquisição"
              name="date"
              type="text"
              variant="standard"
              disabled={disableActions}
              helperText={' '}
              onChange={(e) => setDate(e.target.value)}
              value={date}
              required
            />

            <button
              type="submit"
              onClick={() => {
                setShowAddMachine(false);
              }}
            >
              Salvar
            </button>
          </Form>
        </div>
      </Dialog>
    );
  };

  const renderAssets = () => {
    return (
      <Stack direction="row" spacing={8}>
        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Máquinas
            </ListSubheader>
          }
        >
          <ListItemButton
            onClick={() => {
              setDroneListOpen((prev) => !prev);
            }}
          >
            <ListItemIcon>
              <TbDrone />
            </ListItemIcon>
            <ListItemText primary="Drones" />
            {droneListOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={droneListOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {drones.map((drone, index) => {
                return (
                  <ListItemButton
                    selected={selectedDrone === index}
                    sx={{ pl: 4 }}
                    key={drone.id}
                    onClick={() => {
                      setSelectedDrone(index);
                    }}
                  >
                    <ListItemIcon>
                      <TbDrone />
                    </ListItemIcon>
                    <ListItemText primary={drone.name} />
                  </ListItemButton>
                );
              })}
            </List>
          </Collapse>
        </List>

        <div>
          {selectedDrone !== -1 && (
            <>
              <div>
                <span>Nome:</span>
                <span>{drones[selectedDrone].name}</span>
              </div>
              <div>
                <span>Modelo:</span>
                <span>{drones[selectedDrone].model}</span>
              </div>
              <div>
                <span>Fabricante:</span>
                <span>{drones[selectedDrone].manufacturer}</span>
              </div>
              <div>
                <span>Ano:</span>
                <span>{drones[selectedDrone].year}</span>
              </div>
              <div>
                <span>Valor de aquisição:</span>
                <span>{drones[selectedDrone].price}</span>
              </div>
              <div>
                <span>Data de aquisição:</span>
                <span>{drones[selectedDrone].date}</span>
              </div>
            </>
          )}
        </div>
      </Stack>
    );
  };

  return (
    <div>
      <Tabs value={tab} centered>
        <Tab
          iconPosition="start"
          label="Patrimônio"
          to="#assets"
          component={Link}
          // icon={<InfoIcon />}
          value={0}
        />
        <Tab
          iconPosition="start"
          label="Financeiro"
          to="#financial"
          component={Link}
          // icon={<MapIcon />}
          value={1}
        />
      </Tabs>
      <Divider />

      {tab === 0 && renderAssets()}

      <Tooltip title="Nova máquina" placement="left">
        <Fab
          color="primary"
          name="Novo cliente"
          onClick={() => {
            setShowAddMachine(true);
          }}
          sx={{
            position: 'absolute',
            right: 20,
            bottom: 30,
          }}
        >
          <AddIcon />
        </Fab>
      </Tooltip>
      {renderAddMachineForm()}
    </div>
  );
};

export default Panel;
