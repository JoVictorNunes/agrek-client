import React, { useState } from 'react';
import { useFetcher } from 'react-router-dom';
import { Typography, DialogProps } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import SlideUp from '../../../styles/transitions/slide';
import { Drone } from 'api/types';

interface Props extends DialogProps {
  onClose: () => void;
  onSubmit: () => void;
  drones: Drone[];
}

const Add = React.forwardRef((props: Props, ref: React.ForwardedRef<HTMLDivElement>) => {
  const { onClose, onSubmit, drones, ...rest } = props;
  const fetcher = useFetcher();
  const [date, setDate] = useState<any | null>(null);

  return (
    <Dialog ref={ref} {...rest} fullScreen TransitionComponent={SlideUp}>
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={onClose}>
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
        <Typography variant="h5">Nova pulverização</Typography>

        <fetcher.Form
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
          method="post"
          id="new-spraying"
        >
          <input type="hidden" name="id" value="new-spraying" />
          {date && !isNaN(date.$D) && (
            <input
              type="hidden"
              name="date"
              value={`${date.$D}/${date.$M + 1}/${date.$y}`}
            />
          )}

          <DatePicker
            value={date}
            label="Data de pulverização"
            onChange={(v) => setDate(v)}
          />

          <FormControl sx={{ flexGrow: 1 }}>
            <InputLabel>Drone</InputLabel>
            <Select
              label="Drone"
              name="drone"
              variant="standard"
              disabled={false}
              required
            >
              {drones.map((drone) => {
                return (
                  <MenuItem key={drone.id} value={drone.id}>
                    {drone.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          <Button variant="contained" type="submit" onClick={() => onSubmit()}>
            Salvar
          </Button>
        </fetcher.Form>
      </div>
    </Dialog>
  );
});

export default Add;
