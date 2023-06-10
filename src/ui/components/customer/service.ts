const getCustomer = async (customerId, params = {}) => {
  if (!customerId) return Promise.resolve(null);

  const query = new URLSearchParams();

  Object.keys(params).forEach((param) => {
    const value = params[param];
    query.append(param, value);
  });

  return fetch(
    `${
      process.env.REACT_APP_SERVER
    }/customers/${customerId}?${query.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
  );
};

const getCustomers = async (params = {}) => {
  const query = new URLSearchParams();

  Object.keys(params).forEach((param) => {
    const value = params[param];
    query.append(param, value);
  });

  return fetch(
    `${process.env.REACT_APP_SERVER}/customers?${query.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
  );
};

const getArea = async (areaId) => {
  if (!areaId) return Promise.resolve(null);

  return fetch(`${process.env.REACT_APP_SERVER}/areas/${areaId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

const getCustomerAreas = async (customerId) => {
  if (!customerId) return Promise.resolve(null);

  return fetch(`${process.env.REACT_APP_SERVER}/areas/customer/${customerId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

const getSpraying = async (sprayingId) => {
  if (!sprayingId) return Promise.resolve(null);

  return Promise.resolve(null);
};

const service = {
  getCustomer,
  getArea,
  getCustomerAreas,
  getSpraying,
  getCustomers,
};

export default service;
