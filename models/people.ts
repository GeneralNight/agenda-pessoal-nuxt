export type Person = {
  cpf: string;
  endereco: PersonAddress;
  foto: PersonPhoto;
  id: number;
  nome: string;
};

export type PersonPhoto = {
  id: string;
  name: string;
  type: string;
};
export type PersonAddress = {
  bairro: string;
  cep: string;
  cidade: string;
  estado: string;
  id: number;
  logradouro: string;
  numero: number;
  pais: string;
};

export type PhotoData = {
  byteArray: string;
  description: string;
  filename: string;
  inputStream: {};
  open: boolean;
  readable: boolean;
  uri: string;
  url: string;
};

export type CreatePersonData = {
  nome: string;
  cpf: string;
  endereco: Omit<PersonAddress, "id">;
  foto?: PersonPhoto;
};
