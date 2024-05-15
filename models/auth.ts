export type LoginBody = {
  password: string;
  username: string;
};

export enum RoleTypes {
  ADMIN = "ROLE_ADMIN",
  USER = "ROLE_USER",
}

export type RegisterBody = {
  tipos: string[];
  usuario: {
    cpf: string;
    dataNascimento: Date;
    email: string;
    nome: string;
    password: string;
    telefone: string;
    username: string;
  };
};

export type LoginResponseBody = {
  accessToken: string;
  id: number;
  tipos: RoleTypes[];
  tokenType: string;
  username: string;
};
