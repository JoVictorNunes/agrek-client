import React, { useCallback, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import type { Area } from 'api/types';

type Props = {
  area: Area
}

const Edit: React.FC<Props> = (props) => {
  const { area: areaProp } = props;
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('');
  const [area, setArea] = useState('');
  const [color, setColor] = useState('');
  const theme = useTheme();

  const reset = useCallback(() => {
    setName(areaProp.name);
    setArea(String(areaProp.area));
    setColor(areaProp.color);
  }, [areaProp]);

  useEffect(() => {
    reset();
  }, [reset]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAreaChange = (e) => {
    setArea(e.target.value);
  };

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  return (
    <div
      style={{
        padding: '20px',
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
            label="Área"
            type="text"
            variant="outlined"
            disabled={!editing}
            onChange={handleAreaChange}
            value={area}
            required
          />
          <TextField
            label="Cor"
            type="text"
            variant="outlined"
            disabled={!editing}
            onChange={handleColorChange}
            value={color}
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
