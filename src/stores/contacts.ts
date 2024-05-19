import { acceptHMRUpdate, defineStore } from "pinia";
import type { Contact, CreateContactData } from "~~/models/contact";

interface IState {
  loadingContacts: boolean;
  errorLoadContacts: boolean;
  loadingFavoritesContacts: boolean;
  errorLoadFavoritesContacts: boolean;
  creatingContact: boolean;
  errorCreateContact: boolean;
  savingContact: boolean;
  errorSaveContact: boolean;
  errorRemoveContact: boolean;
  removingContact: boolean;
  contacts: Contact[];
  favorites: Contact[];
}

export const useContactStore = defineStore("CONTACTS_STORE", {
  state: (): IState => ({
    loadingContacts: false,
    errorLoadContacts: false,
    loadingFavoritesContacts: false,
    errorLoadFavoritesContacts: false,
    creatingContact: false,
    errorCreateContact: false,
    savingContact: false,
    errorSaveContact: false,
    errorRemoveContact: false,
    removingContact: false,
    contacts: [],
    favorites: [],
  }),
  getters: {},
  actions: {
    async loadContacts(termo?: string) {
      this.errorLoadContacts = false;
      this.loadingContacts = true;
      try {
        this.contacts = await api.getContacts({ body: { termo: termo ?? "" } });
        await this.loadFavorites();
      } catch (error) {
        this.errorLoadContacts = true;
        console.log(error);
      } finally {
        this.loadingContacts = false;
      }
    },
    async loadFavorites(termo?: string) {
      this.errorLoadFavoritesContacts = false;
      this.loadingFavoritesContacts = true;
      try {
        this.contacts = await api.getFavoriteContacts({
          body: { termo: termo ?? "" },
        });
      } catch (error) {
        this.errorLoadFavoritesContacts = true;
        console.log(error);
      } finally {
        this.loadingFavoritesContacts = false;
      }
    },
    async loadPersonContacts(id: string) {
      this.errorLoadContacts = false;
      this.loadingContacts = true;
      try {
        this.contacts = await api.getPersonContacts(`${id}`);
        await this.loadFavorites();
      } catch (error) {
        this.errorLoadContacts = true;
        console.log(error);
      } finally {
        this.loadingContacts = false;
      }
    },
    async createContact(body: CreateContactData) {
      this.errorCreateContact = false;
      this.creatingContact = true;
      try {
        await api.saveContact({ body });
        return "success";
      } catch (error) {
        this.errorCreateContact = true;
        console.log(error);
        return undefined;
      } finally {
        this.creatingContact = false;
      }
    },
    async saveContact(body: Contact) {
      this.savingContact = true;
      this.errorSaveContact = false;
      try {
        await api.saveContact({ body });
        return "success";
      } catch (error) {
        this.errorSaveContact = true;
        console.log(error);
        return undefined;
      } finally {
        this.savingContact = false;
      }
    },
    async removeContact(contact: Contact) {
      this.errorRemoveContact = false;
      this.removingContact = true;
      try {
        await api.removeContact(`${contact.id}`);
        return "success";
      } catch (error) {
        this.errorRemoveContact = true;
        return undefined;
      } finally {
        this.removingContact = false;
      }
    },
    async handleFavoriteContact(contact: Contact) {
      try {
        let index = this.favorites.findIndex((v) => v.id === contact.id);
        if (index > -1) {
          await api.removeFavoriteContact(`${contact.id}`);
          this.favorites.splice(index, 1);
        } else {
          await api.favoriteContact({ body: { id: contact.id } });
          this.favorites.push(contact);
        }
      } catch (error) {}
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useContactStore, import.meta.hot));
}
