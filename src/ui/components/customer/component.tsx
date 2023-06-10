import React, { useState, useEffect } from 'react';
import { useLoaderData, useLocation, Link, redirect } from 'react-router-dom';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import MapIcon from '@mui/icons-material/Map';
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import InfoIcon from '@mui/icons-material/Info';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import AreaList from '../area/list/component';
import MapAdd from '../map/add';
import MapView from '../map/view';
import Card from './card/component';
import Edit from './edit/component';
import Service from './service';
import Styled from './styles';
import { getCustomer } from 'api';
import { Customer as CustomerType } from 'api/types';

export async function loader({ params }) {
  const customer = await getCustomer(params.customerId, {
    address: true,
    areas: true,
  });
  if (customer.status === 401) {
    return redirect('/login');
  }
  return customer;
}

const Customer = () => {
  const { customer } = useLoaderData() as { customer: CustomerType };
  const [tab, setTab] = useState(0);
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#info') return setTab(0);
    if (location.hash === '#map') return setTab(1);
    if (location.hash === '#areas') return setTab(2);
    if (location.hash === '#new-areas') return setTab(3);
  }, [location.hash]);

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
          label="Áreas"
          to="#areas"
          component={Link}
          icon={<PersonPinCircleIcon />}
          value={2}
        />
        <Tab
          iconPosition="start"
          label="Novas Áreas"
          to="#new-areas"
          component={Link}
          icon={<AddLocationIcon />}
          value={3}
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
          }}
        >
          {tab === 0 && <Edit customer={customer} />}

          {tab === 1 && <MapView areas={customer.areas} />}

          {tab === 2 && <AreaList areas={customer.areas || []} />}

          {tab === 3 && <MapAdd customer={customer} />}
        </div>
        <div
          style={{
            padding: '20px',
          }}
        >
          <Card customer={customer} />
        </div>
      </Stack>
    </Styled.Container>
  );
};

export default Customer;
