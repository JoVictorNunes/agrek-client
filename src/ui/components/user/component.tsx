import React, { useState, useRef, useEffect } from 'react';
import { redirect, useLoaderData, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { type User as UserType, me } from 'api';

function usePrevious(value: any) {
  const previous = useRef(null);
  useEffect(() => {
    previous.current = value;
  });
  return previous.current;
}

export async function loader() {
  const response = await me();
  if (response.status === 401) {
    redirect('/login');
  }
  return response;
}

const User = () => {
  const { user } = useLoaderData() as { user: UserType };
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const [submitting, setSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();
  const prevSubmitting = usePrevious(submitting);

  useEffect(() => {
    if (prevSubmitting && !submitting) {
      setShowToast(true);
    }
  }, [prevSubmitting, submitting]);

  const save = () => {
    
  };

  if (submitting) {
    return (
      <Box
        sx={{
          backgroundColor: 'background.default',
          color: 'text.primary',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        color: 'text.primary',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'stretch',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px',
        }}
      >
        <IconButton
          onClick={() => {
            navigate(-1);
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Button
          variant="contained"
          disabled={true}
          onClick={save}
          // sx={{
          //   marginTop: '20px',
          // }}
        >
          Salvar
        </Button>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          // justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          padding: '20px 0',
        }}
      >
        <Avatar
          sx={{
            width: 150,
            height: 150,
            cursor: 'pointer',
          }}
          onClick={() => {
            if (avatarInputRef.current) {
              avatarInputRef.current.click();
            }
          }}
        >
          {user.email.substring(0, 2)}
        </Avatar>
        <TextField
          label="Email"
          name="email"
          type="text"
          variant="outlined"
          disabled={true}
          value={user.email}
          required
          size="small"
          sx={{
            width: '25%',
            marginTop: '20px',
          }}
        />
      </Box>
      <Snackbar
        open={showToast}
        autoHideDuration={6000}
        onClose={() => {
          setShowToast(false);
        }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Salvo!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default User;
