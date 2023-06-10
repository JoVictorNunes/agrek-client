const SERVER_URL = process.env.REACT_APP_SERVER;

export const signUp = async (data: {
  email: string;
  password: string;
  name?: string;
  avatarId?: string;
}) => {
  const { email, password, avatarId, name } = data;
  const body = {
    email,
    password,
    name,
    avatarId,
  };

  return fetch(`${SERVER_URL}/users/signUp`, {
    body: JSON.stringify(body),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const signIn = async (data: { email: string; password: string }) => {
  const { email, password } = data;
  const body = {
    email,
    password,
  };

  return fetch(`${SERVER_URL}/users/signIn`, {
    body: JSON.stringify(body),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const me = async () => {
  return fetch(`${SERVER_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

export const getUsers = async () => {
  return fetch(`${SERVER_URL}/users`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

export const getUser = async (userId: string) => {
  return fetch(`${SERVER_URL}/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

export const deleteUser = async (userId: string) => {
  return fetch(`${SERVER_URL}/users/${userId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

export const updateUser = async (
  userId: string,
  data: {
    name?: string;
    avatarId?: string;
  }
) => {
  const { avatarId, name } = data;
  const body = {
    name,
    avatarId,
  };

  return fetch(`${SERVER_URL}/users/${userId}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

export const getCustomers = async (search?: {
  address?: boolean;
  areas?: boolean;
  sprayings?: boolean;
}) => {
  const s = new URLSearchParams();

  if (search) {
    Object.keys(search).forEach((key) => {
      if (search[key] === true) {
        s.append('include', key);
      }
    });
  }

  return fetch(`${SERVER_URL}/customers?${s.toString()}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

export const getCustomer = async (
  customerId: string,
  search?: {
    address?: boolean;
    areas?: boolean;
    sprayings?: boolean;
  }
) => {
  const s = new URLSearchParams();

  if (search) {
    Object.keys(search).forEach((key) => {
      if (search[key] === true) {
        s.append('include', key);
      }
    });
  }

  return fetch(`${SERVER_URL}/customers/${customerId}?${s.toString()}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

export const createCustomer = async (data: {
  name: string;
  cpf: string;
  phone: string;
  address?: {
    address: string;
    neighborhood: string;
    number: string;
    city: string;
    state: string;
    cep: string;
  };
}) => {
  const { cpf, name, phone, address } = data;
  const body = {
    cpf,
    name,
    phone,
    address,
  };

  return fetch(`${SERVER_URL}/customers`, {
    body: JSON.stringify(body),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

export const updateCustomer = async (
  customerId: string,
  data: {
    name?: string;
    cpf?: string;
    phone?: string;
    address?: {
      address: string;
      neighborhood: string;
      number: string;
      city: string;
      state: string;
      cep: string;
    };
  }
) => {
  const { cpf, name, phone, address } = data;
  const body = {
    cpf,
    name,
    phone,
    address,
  };

  return fetch(`${SERVER_URL}/customers/${customerId}`, {
    body: JSON.stringify(body),
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

export const deleteCustomer = async (customerId: string) => {
  return fetch(`${SERVER_URL}/customers/${customerId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

export const getAreaById = async (areaId: string) => {
  return fetch(`${SERVER_URL}/areas/${areaId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

export const getAreasByCustomer = async (customerId: string) => {
  return fetch(`${SERVER_URL}/areas/customer/${customerId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

export const createArea = async (
  customerId: string,
  data: {
    name: string;
    area: number;
    color: string;
    path: {
      lat: number;
      lng: number;
    }[];
  }
) => {
  const { area, color, name, path } = data;
  const body = {
    area,
    color,
    name,
    path,
  };

  return fetch(`${SERVER_URL}/areas/${customerId}`, {
    body: JSON.stringify(body),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

export const updateArea = async (
  customerId: string,
  data: {
    name?: string;
    area?: number;
    color?: string;
    path?: {
      lat: number;
      lng: number;
    }[];
  }
) => {
  const { area, color, name, path } = data;
  const body = {
    area,
    color,
    name,
    path,
  };

  return fetch(`${SERVER_URL}/areas/${customerId}`, {
    body: JSON.stringify(body),
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

export const deleteArea = async (areaId: string) => {
  return fetch(`${SERVER_URL}/areas/${areaId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

export const createSpraying = async (
  areaId: string,
  data: {
    date: number;
    droneId: string;
    percentage?: number;
  }
) => {
  const { date, droneId, percentage } = data;
  const body = {
    date,
    droneId,
    percentage,
  };

  return fetch(`${SERVER_URL}/sprayings/${areaId}`, {
    body: JSON.stringify(body),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

export const updateSpraying = async (
  sprayingId: string,
  data: {
    date?: number;
    percentage?: number;
  }
) => {
  const { date, percentage } = data;
  const body = {
    date,
    percentage,
  };

  return fetch(`${SERVER_URL}/sprayings/${sprayingId}`, {
    body: JSON.stringify(body),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

export const deleteSpraying = async (sprayingId: string) => {
  return fetch(`${SERVER_URL}/sprayings/${sprayingId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

export const createDrone = async (data: {
  name: string;
  model: string;
  manufacturer: string;
  year: string;
  price: number;
  date: number;
}) => {
  const { date, manufacturer, model, name, price, year } = data;
  const body = {
    date,
    manufacturer,
    model,
    name,
    price,
    year,
  };

  return fetch(`${SERVER_URL}/drones`, {
    body: JSON.stringify(body),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

export const getDrones = async () => {
  return fetch(`${SERVER_URL}/drones`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

export * from './types';
