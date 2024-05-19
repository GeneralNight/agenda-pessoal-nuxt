import type { FetchOptions } from "ohmyfetch";
import type {
  GetProfileResponseBody,
  LoginResponseBody,
  Person,
  Profile,
  PutProfileResponseBody,
} from "~~/models";
import type { Contact } from "~~/models/contact";

export default {
  async booktoneFetch<T>(path: string, options?: FetchOptions) {
    const token = localStorage?.getItem("token") || "";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const finalOptions: any = {
      headers: { Authorization: `Bearer ${token}` },
      ...options,
    };
    return $fetch<T>(
      `${useRuntimeConfig().public.BASE_URL}${path}`,
      finalOptions
    );
  },
  register(options?: FetchOptions): Promise<void> {
    return this.booktoneFetch(`auth/register`, { method: "POST", ...options });
  },
  login(options?: FetchOptions): Promise<LoginResponseBody> {
    return this.booktoneFetch(`auth/login`, { method: "POST", ...options });
  },
  getUserProfile(
    id: number,
    options?: FetchOptions
  ): Promise<GetProfileResponseBody> {
    return this.booktoneFetch(`usuario/buscar/${id}`, {
      method: "GET",
      ...options,
    });
  },
  saveUserProfile(options?: FetchOptions): Promise<PutProfileResponseBody> {
    return this.booktoneFetch(`usuario/atualizar`, {
      method: "PUT",
      ...options,
    });
  },
  getUsers(options?: FetchOptions): Promise<Profile[]> {
    return this.booktoneFetch(`usuario/pesquisar`, {
      method: "POST",
      ...options,
    });
  },
  createUser(options?: FetchOptions): Promise<Profile[]> {
    return this.booktoneFetch(`usuario/salvar`, {
      method: "POST",
      ...options,
    });
  },
  getPeople(options?: FetchOptions): Promise<Person[]> {
    return this.booktoneFetch(`pessoa/pesquisar`, {
      method: "POST",
      ...options,
    });
  },
  getPerson(id: string, options?: FetchOptions): Promise<Person> {
    return this.booktoneFetch(`pessoa/buscar/${id}`, {
      method: "GET",
      ...options,
    });
  },
  getPhoto(id: string, options?: FetchOptions): Promise<File> {
    return this.booktoneFetch(`foto/download/${id}`, {
      method: "GET",
      ...options,
    });
  },
  createPerson(options?: FetchOptions): Promise<Person> {
    return this.booktoneFetch(`pessoa/salvar`, {
      method: "POST",
      ...options,
    });
  },
  deletePerson(id: string, options?: FetchOptions): Promise<void> {
    return this.booktoneFetch(`pessoa/remover/${id}`, {
      method: "DELETE",
      ...options,
    });
  },
  getContacts(options?: FetchOptions): Promise<Contact[]> {
    return this.booktoneFetch(`contato/pesquisar`, {
      method: "POST",
      ...options,
    });
  },
  getFavoriteContacts(options?: FetchOptions): Promise<Contact[]> {
    return this.booktoneFetch(`favorito/pesquisar`, {
      method: "POST",
      ...options,
    });
  },
  saveContact(options?: FetchOptions): Promise<Contact> {
    return this.booktoneFetch(`contato/salvar`, {
      method: "POST",
      ...options,
    });
  },
  getPersonContacts(id: string, options?: FetchOptions): Promise<Contact[]> {
    return this.booktoneFetch(`contato/listar/${id}`, {
      method: "GET",
      ...options,
    });
  },
  removeContact(id: string, options?: FetchOptions): Promise<void> {
    return this.booktoneFetch(`contato/remover/${id}`, {
      method: "DELETE",
      ...options,
    });
  },
  favoriteContact(options?: FetchOptions): Promise<void> {
    return this.booktoneFetch(`favorito/salvar`, {
      method: "POST",
      ...options,
    });
  },
  removeFavoriteContact(id: string, options?: FetchOptions): Promise<void> {
    return this.booktoneFetch(`favorito/remover/${id}`, {
      method: "DELETE",
      ...options,
    });
  },
};
