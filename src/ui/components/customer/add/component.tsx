import React, { useEffect, useRef, useState } from 'react';
import {
  Form,
  useActionData,
  useLocation,
  useNavigate,
  useNavigation,
} from 'react-router-dom';
import { Add, Close } from '@mui/icons-material';
import {
  Snackbar,
  Alert,
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  SelectChangeEvent,
  Grid,
  useMediaQuery,
} from '@mui/material';
import Styled from './styles';
import SlideUp from '../../../styles/transitions/slide';
import { applyFormatedText } from 'ui/utils/string';
import { Customer } from 'api';

const SUBMIT_TIMEOUT = 5000;

const states = [
  'AC',
  'AL',
  'AP',
  'AM',
  'BA',
  'CE',
  'DF',
  'ES',
  'GO',
  'MA',
  'MT',
  'MS',
  'MG',
  'PA',
  'PB',
  'PR',
  'PE',
  'PI',
  'RJ',
  'RN',
  'RS',
  'RO',
  'RR',
  'SC',
  'SP',
  'SE',
  'TO',
];

const MASKS = {
  CPF: '___.___.___-__',
  PHONE: '(__) _____-____',
  MARKER: '_',
};

type Errors = {
  cpf: string | null;
  phone: string | null;
};

type ActionData = { errors: Errors } | { customer: Customer } | undefined;

function usePrevious(value: any) {
  const v = useRef<any>();
  useEffect(() => {
    v.current = value;
  });
  return v.current;
}

const CustomerForm = () => {
  const [showAlert, setShowAlert] = useState(false);
  const actionData = useActionData() as ActionData;
  const location = useLocation();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');

  // Address
  const [withAdress, setWithAddress] = useState(false);
  const [address, setAddress] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [number, setNumber] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [cep, setCep] = useState('');

  const cpfInputRef = useRef<HTMLInputElement | null>(null);
  const phoneInputRef = useRef<HTMLInputElement | null>(null);

  const md = useMediaQuery('(max-width: 900px) and (min-width: 599px)');
  const sm = useMediaQuery('(max-width: 600px)');

  const disableActions = navigation.state === 'submitting';
  const search = new URLSearchParams(location.search);
  const prevNavigationState = usePrevious(navigation.state);

  useEffect(() => {
    const alert =
      prevNavigationState === 'loading' &&
      navigation.state === 'idle' &&
      actionData &&
      'customer' in actionData;

    if (alert) setShowAlert(true);
  }, [actionData, navigation.state, prevNavigationState]);

  useEffect(() => {
    const firstEmptyPosition = cpf.indexOf(MASKS.MARKER);
    if (cpfInputRef.current) {
      cpfInputRef.current.setSelectionRange(
        firstEmptyPosition,
        firstEmptyPosition
      );
    }
  }, [cpf]);

  useEffect(() => {
    const firstEmptyPosition = phone.indexOf(MASKS.MARKER);
    if (phoneInputRef.current) {
      phoneInputRef.current.setSelectionRange(
        firstEmptyPosition,
        firstEmptyPosition
      );
    }
  }, [phone]);

  const handleCpfChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (actionData && 'errors' in actionData) {
      actionData.errors.cpf = null;
    }

    const event = e.nativeEvent as InputEvent;

    if (event.inputType === 'insertText') {
      const data = event.data;

      if (data) {
        applyFormatedText(data, cpf, MASKS.CPF, MASKS.MARKER, setCpf);
        return;
      }
    }

    if (event.inputType === 'deleteContentBackward') {
      const chars = cpf.split('');
      const numbers = chars.filter((n) => {
        const code = n.charCodeAt(0);
        return code >= 48 && code <= 57;
      });

      numbers.pop();
      let value = MASKS.CPF;

      if (numbers.length === 0) {
        value = '';
      } else {
        numbers.forEach((n) => {
          value = value.replace(MASKS.MARKER, n);
        });
      }

      setCpf(value);
    }
  };

  const handlePhoneChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (actionData && 'errors' in actionData) {
      actionData.errors.phone = null;
    }

    const event = e.nativeEvent as InputEvent;

    if (event.inputType === 'insertText') {
      const data = event.data;

      if (data) {
        applyFormatedText(data, phone, MASKS.PHONE, MASKS.MARKER, setPhone);
        return;
      }
    }

    if (event.inputType === 'deleteContentBackward') {
      const chars = phone.split('');
      const numbers = chars.filter((n) => {
        const code = n.charCodeAt(0);
        return code >= 48 && code <= 57;
      });

      numbers.pop();
      let value = MASKS.PHONE;

      if (numbers.length === 0) {
        value = '';
      } else {
        numbers.forEach((n) => {
          value = value.replace(MASKS.MARKER, n);
        });
      }

      setPhone(value);
    }
  };

  const handleChange = (
    setter: (value: string) => void,
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>
  ) => {
    setter(e.target.value);
  };

  return (
    <Dialog
      fullScreen
      open={search.get('dialog') === 'add-customer'}
      TransitionComponent={SlideUp}
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => {
              navigate(-1);
            }}
          >
            <Close />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Styled.Container>
        <Form method="post" style={{ width: sm ? '90%' : md ? '70%' : '38.5%' }}>
          <input type="hidden" name="id" value="add-customer" />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">Dados</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Nome"
                name="name"
                type="text"
                variant="standard"
                disabled={disableActions}
                helperText={' '}
                onChange={handleChange.bind(this, setName)}
                value={name}
                required
                inputProps={{
                  maxlength: 40,
                  minlength: 2,
                }}
                sx={{
                  width: '100%',
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                inputRef={cpfInputRef}
                onPaste={(e) => {
                  const data = e.clipboardData.getData('text');
                  applyFormatedText(data, cpf, MASKS.CPF, MASKS.MARKER, setCpf);
                }}
                label="CPF"
                name="cpf"
                placeholder="999.999.999-99"
                type="text"
                variant="standard"
                disabled={disableActions}
                error={
                  actionData &&
                  'errors' in actionData &&
                  !!actionData.errors.cpf
                }
                helperText={
                  actionData &&
                  'errors' in actionData &&
                  !!actionData.errors.cpf
                    ? actionData.errors.cpf
                    : ' '
                }
                onChange={handleCpfChange}
                value={cpf}
                required
                sx={{
                  width: '100%',
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                inputRef={phoneInputRef}
                onPaste={(e) => {
                  const data = e.clipboardData.getData('text');
                  applyFormatedText(
                    data,
                    phone,
                    MASKS.PHONE,
                    MASKS.MARKER,
                    setPhone
                  );
                }}
                label="Telefone"
                name="phone"
                placeholder="(99) 99999-9999"
                type="text"
                variant="standard"
                disabled={disableActions}
                error={
                  actionData &&
                  'errors' in actionData &&
                  !!actionData.errors.phone
                }
                helperText={
                  actionData &&
                  'errors' in actionData &&
                  !!actionData.errors.phone
                    ? actionData.errors.phone
                    : ' '
                }
                onChange={handlePhoneChange}
                value={phone}
                required
                sx={{
                  width: '100%',
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Cadastrar endereço"
                  onChange={(e, checked) => setWithAddress(checked)}
                  name="withAddress"
                />
              </FormGroup>
            </Grid>
            {withAdress && (
              <>
                <Grid item xs={12}>
                  <Typography variant="h6">Endereço</Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Endereço"
                    name="address"
                    placeholder="Rua ..."
                    type="text"
                    variant="standard"
                    disabled={disableActions}
                    helperText={' '}
                    onChange={handleChange.bind(this, setAddress)}
                    value={address}
                    required
                    sx={{
                      width: '100%',
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Número"
                    name="number"
                    placeholder=""
                    type="number"
                    variant="standard"
                    disabled={disableActions}
                    helperText={' '}
                    onChange={handleChange.bind(this, setNumber)}
                    value={number}
                    required
                  />
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    label="Bairro"
                    name="neighborhood"
                    placeholder=""
                    type="text"
                    variant="standard"
                    disabled={disableActions}
                    helperText={' '}
                    onChange={handleChange.bind(this, setNeighborhood)}
                    value={neighborhood}
                    required
                    sx={{
                      width: '100%',
                    }}
                  />
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    label="Cidade"
                    name="city"
                    placeholder=""
                    type="text"
                    variant="standard"
                    disabled={disableActions}
                    helperText={' '}
                    onChange={handleChange.bind(this, setCity)}
                    value={city}
                    required
                    sx={{
                      width: '100%',
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <FormControl
                    sx={{
                      width: '100%',
                    }}
                  >
                    <InputLabel>Estado</InputLabel>
                    <Select
                      label="Estado"
                      name="state"
                      variant="standard"
                      disabled={disableActions}
                      onChange={handleChange.bind(this, setState)}
                      value={state}
                      required
                    >
                      <MenuItem value={''}>-</MenuItem>
                      {states.map((state) => {
                        return <MenuItem value={state}>{state}</MenuItem>;
                      })}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="CEP"
                    name="cep"
                    placeholder=""
                    type="text"
                    variant="standard"
                    disabled={disableActions}
                    helperText={' '}
                    onChange={handleChange.bind(this, setCep)}
                    value={cep}
                    required
                    sx={{
                      width: '100%',
                    }}
                  />
                </Grid>
              </>
            )}
          </Grid>
          <Button
            type="submit"
            variant="contained"
            startIcon={<Add />}
            disabled={disableActions}
            sx={{
              marginTop: '20px',
            }}
          >
            Adicionar
          </Button>
        </Form>
        <Snackbar
          autoHideDuration={SUBMIT_TIMEOUT}
          onClose={() => {
            setShowAlert(false);
          }}
          open={showAlert}
        >
          <Alert severity="success">Cliente adicionado!</Alert>
        </Snackbar>
      </Styled.Container>
    </Dialog>
  );
};

export default CustomerForm;
