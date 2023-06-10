import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

const CustomerCard = (props) => {
  const { customer } = props;
  const { address } = customer;
  const theme = useTheme();
  return (
    <Card>
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
      />
      {address && (
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {`${address.address}, ${address.neighborhood}, ${address.number}, ${address.city} - ${address.state}, ${address.cep}`}
          </Typography>
        </CardContent>
      )}
    </Card>
  );
};

export default CustomerCard;
