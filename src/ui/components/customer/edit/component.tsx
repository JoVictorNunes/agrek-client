import React, { useCallback, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';

const Edit = (props) => {
  const { customer } = props;
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const theme = useTheme();

  const reset = useCallback(() => {
    setName(customer.name);
    setCpf(customer.cpf);
    setPhone(customer.phone);
  }, [customer]);

  useEffect(() => {
    reset();
  }, [reset]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleCpfChange = (e) => {
    setCpf(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  return (
    <div
      style={{
        padding: '16px 0px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          flexGrow: 1,
        }}
      >
        <Stack direction="row" spacing={2}>
          <TextField
            label="Nome"
            type="text"
            variant="outlined"
            disabled={!editing}
            onChange={handleNameChange}
            value={name}
            required
          />
          <TextField
            label="CPF"
            type="text"
            variant="outlined"
            disabled={!editing}
            onChange={handleCpfChange}
            value={cpf}
            required
          />
          <TextField
            label="Telefone"
            type="text"
            variant="outlined"
            disabled={!editing}
            onChange={handlePhoneChange}
            value={phone}
            required
          />
        </Stack>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        {editing && (
          <Button
            variant="text"
            disabled={false}
            onClick={() => {
              setEditing(false);
              reset();
            }}
            color={theme.palette.mode === 'light' ? 'secondary' : 'primary'}
          >
            Cancelar
          </Button>
        )}
        <Button
          variant="contained"
          disabled={false}
          onClick={() => {
            if (editing) {
              // TODO: Save changes.
            } else {
              setEditing(true);
            }
          }}
        >
          {editing ? 'Salvar' : 'Editar'}
        </Button>
      </div>
    </div>
  );
};

export default Edit;
