import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { Link, Typography } from '@mui/material';
import { signIn } from 'api';
import useMediaQuery from '@mui/material/useMediaQuery';

type ActionData =
  | {
      statusCode: number;
      error: string;
      message: string | string[];
    }
  | undefined;

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data: Record<string, string> = Object.fromEntries(formData);

  const body = {
    email: data.email,
    password: data.password,
  };

  const loginRequest = signIn(body);
  const loginResponse = await loginRequest;

  if (loginResponse.status === 200) {
    const responseBody = await loginResponse.json();
    const { token } = responseBody;
    localStorage.setItem('token', token);
    return redirect('/');
  }

  return loginResponse;
};

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const error = useActionData() as ActionData;
  const navigation = useNavigation();
  const submitting = navigation.state === 'submitting';
  const lg = useMediaQuery('(min-width: 901px)');
  const md = useMediaQuery('(max-width: 900px) and (min-width: 599px)');
  const sm = useMediaQuery('(max-width: 600px)');

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        color: 'text.primary',
        height: '100%',
        display: 'flex',
      }}
    >
      {lg && (
        <Box
          sx={{
            flexGrow: 1,
            flexShrink: 1,
            width: '65%',
            backgroundImage: 'url(drone.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'black',
              opacity: '0.5',
            }}
          />
        </Box>
      )}
      <Box
        sx={{
          flexGrow: 1,
          flexShrink: 1,
          width: '35%',
          padding: '40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '50px',
        }}
      >
        <div
          style={{
            fontSize: '48px',
          }}
        >
          Agrek
        </div>
        <Form
          method="post"
          id="login-form"
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: sm || lg ? '100%' : '70%',
          }}
        >
          <TextField
            label="Email"
            name="email"
            type="text"
            variant="outlined"
            disabled={submitting}
            onChange={handleEmailChange}
            value={email}
            required
            size="small"
            sx={{
              width: '100%',
            }}
          />
          {error && Array.isArray(error.message) && error.statusCode === 400 ? (
            <Typography
              color="error"
              sx={{
                fontSize: '0.85rem',
                marginTop: '8px',
                marginBottom: '8px',
              }}
            >
              {error.message[0]}
            </Typography>
          ) : (
            <Typography
              sx={{
                fontSize: '0.85rem',
                marginTop: '8px',
                marginBottom: '8px',
                visibility: 'hidden',
              }}
            >
              {'hidden'}
            </Typography>
          )}
          <TextField
            label="Senha"
            name="password"
            type="password"
            variant="outlined"
            disabled={submitting}
            onChange={handlePasswordChange}
            value={password}
            required
            size="small"
            sx={{
              marginTop: '20px',
              width: '100%',
            }}
          />
          {error && Array.isArray(error.message) && error.statusCode === 400 ? (
            <Typography
              color="error"
              sx={{
                fontSize: '0.85rem',
                marginTop: '8px',
                marginBottom: '8px',
              }}
            >
              {error.message[1]}
            </Typography>
          ) : (
            <Typography
              sx={{
                fontSize: '0.85rem',
                marginTop: '8px',
                marginBottom: '8px',
                visibility: 'hidden',
              }}
            >
              {'hidden'}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            disabled={submitting}
            sx={{
              marginTop: '20px',
              width: '100%',
            }}
          >
            Entrar
          </Button>
        </Form>
        <div style={{ display: 'flex' }}>
          <Typography>Não está registrado?</Typography>
          &nbsp;
          <Link color="primary">
            <Typography>Crie uma conta</Typography>
          </Link>
        </div>
      </Box>
    </Box>
  );
};

export default Login;
