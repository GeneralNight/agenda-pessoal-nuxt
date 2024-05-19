import type { Profile } from "./auth";
import type { Person } from "./people";

export type Contact = {
  email: string;
  id: number;
  pessoa: Person;
  privado: boolean;
  tag: string;
  telefone: string;
  tipoContato: ContactType;
  usuario: Profile;
};

export enum ContactType {
  CELULAR = "CELULAR",
  EMAIL = "EMAIL",
  TELEFONE = "TELEFONE",
}

export type CreateContactData = {
  email: string;
  pessoa: Pick<Person, "id">;
  privado: boolean;
  tag: string;
  telefone: string;
  tipoContato: ContactType;
  usuario: Pick<Profile, "id">;
};
