export type User = {
  id: string;
  email: string;
  avatarId?: string;
  name?: string;
};

export type Address = {
  id: string;
  customerId: string;
  address: string;
  cep: string;
  city: string;
  neighborhood: string;
  number: string;
  state: string;
};

export type Point = {
  id: string;
  areaId: string;
  lat: number;
  lng: number;
};

export type Spraying = {
  id: string;
  areaId: string;
  droneId: string;
  date: string;
  percentage: number;
};

export type Area = {
  id: string;
  customerId: string;
  area: number;
  color: string;
  name: string;
  path: Point[];
  sprayings?: Spraying[];
};

export type Customer = {
  id: string;
  name: string;
  cpf: string;
  phone: string;
  address?: Address;
  areas?: Area[];
};

export type Drone = {
  id: string;
  name: string;
  model: string;
  manufacturer: string;
  year: string;
  price: number;
  date: string;
};
