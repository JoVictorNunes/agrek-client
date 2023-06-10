import React, { useState, useEffect } from 'react';
import { useLoaderData, useLocation, Link, redirect } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import InfoIcon from '@mui/icons-material/Info';
import MapIcon from '@mui/icons-material/Map';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import GrainIcon from '@mui/icons-material/Grain';
import Tooltip from '@mui/material/Tooltip';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import MapView from '../map/view';
import CustomerService from '../customer/service';
import CustomerCard from '../customer/card/component';
import Card from './card/component';
import Edit from './edit/component';
import SprayingList from '../spraying/list/component';
import SprayingAdd from '../spraying/add/component';
import Styled from './styles';
import type { Area as AreaType, Customer, Drone } from 'api/types';
import { getCustomer } from 'api';

export const action = async ({ request, params }) => {
  const data = await request.formData();
  const date = data.get('date');
  const drone = data.get('drone');
  const actualDate = new Date();
  const [day, month, year] = date.split('/');

  actualDate.setFullYear(Number(year), Number(month), Number(day));

  const body = {
    droneId: drone,
    date: actualDate.getTime(),
  };

  const response = await fetch(
    `${process.env.REACT_APP_SERVER}/areas/${params.areaId}/sprayings`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }
  );

  return response;
};

export async function loader({ params }) {
  const customerResponse = await getCustomer(
    params.customerId,
    {
      address: true,
      areas: true,
      sprayings: true,
    }
  );

  const droneResponse = await fetch(`${process.env.REACT_APP_SERVER}/drones`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  const responses = await Promise.all([customerResponse, droneResponse]);

  if (responses.some((r) => !r || r.status === 401)) {
    redirect('/login');
  }

  const { customer } = await responses[0].json();
  const { drones } = await responses[1].json();
  const area = customer.areas.find((area) => area.id === params.areaId);

  return { customer, area, drones };
}

const Area = () => {
  const { customer, area, drones } = useLoaderData() as {
    customer: Customer;
    area: AreaType;
    drones: Drone[];
  };
  const [tab, setTab] = useState(0);
  const location = useLocation();
  const [isAddingSpraying, setIsAddingSpraying] = useState(false);

  useEffect(() => {
    if (location.hash === '#info') return setTab(0);
    if (location.hash === '#map') return setTab(1);
    if (location.hash === '#sprayings') return setTab(2);
  }, [location.hash]);

  const renderNewSprayingForm = () => {
    return (
      <SprayingAdd
        onClose={() => {
          setIsAddingSpraying(false);
        }}
        onSubmit={() => {
          setIsAddingSpraying(false);
        }}
        open={isAddingSpraying}
        drones={drones}
      />
    );
  };

  const renderNewSprayingButton = () => {
    return (
      <Tooltip title="Nova pulverização" placement="left">
        <Fab
          color="primary"
          name="Nova pulverização"
          onClick={() => {
            setIsAddingSpraying(true);
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
    );
  };

  return (
    <Styled.Container>
      <Tabs value={tab}>
        <Tab
          iconPosition="start"
          label="Dados"
          to="#info"
          component={Link}
          icon={<InfoIcon />}
          value={0}
        />
        <Tab
          iconPosition="start"
          label="Mapa"
          to="#map"
          component={Link}
          icon={<MapIcon />}
          value={1}
        />
        <Tab
          iconPosition="start"
          label="Pulverizações"
          to="#sprayings"
          component={Link}
          icon={<GrainIcon />}
          value={2}
        />
      </Tabs>
      <Divider />
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        sx={{
          height: '100%',
        }}
      >
        <div
          style={{
            flexGrow: 1,
            padding: '20px',
            position: 'relative',
          }}
        >
          {tab === 0 && <Edit area={area} />}
          {tab === 1 && <MapView areas={[area]} />}
          {tab === 2 && <SprayingList sprayings={area.sprayings} />}
          {tab === 2 && renderNewSprayingButton()}
        </div>
        <div
          style={{
            padding: '20px',
          }}
        >
          <Stack spacing={2}>
            <CustomerCard customer={customer} />
            <Card area={area} />
          </Stack>
        </div>
      </Stack>
      {renderNewSprayingForm()}
    </Styled.Container>
  );
};

export default Area;
