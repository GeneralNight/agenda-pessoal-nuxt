import { acceptHMRUpdate, defineStore } from "pinia";
import type { Contact, CreateContactData } from "~~/models/contact";

interface IState {
  loadingContacts: boolean;
  errorLoadContacts: boolean;
  creatingContact: boolean;
  errorCreateContact: boolean;
  savingContact: boolean;
  errorSaveContact: boolean;
  errorRemoveContact: boolean;
  removingContact: boolean;
  contacts: Contact[];
}

export const useContactStore = defineStore("CONTACTS_STORE", {
  state: (): IState => ({
    loadingContacts: false,
    errorLoadContacts: false,
    creatingContact: false,
    errorCreateContact: false,
    savingContact: false,
    errorSaveContact: false,
    errorRemoveContact: false,
    removingContact: false,
    contacts: [],
  }),
  getters: {},
  actions: {
    async loadContacts(termo?: string) {
      this.errorLoadContacts = false;
      this.loadingContacts = true;
      try {
        this.contacts = await api.getContacts({ body: { termo: termo ?? "" } });
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
    async removeContact(person: Contact) {
      this.errorRemoveContact = false;
      this.removingContact = true;
      try {
        await api.deletePerson(`${person.id}`);
        this.loadContacts();
      } catch (error) {
        this.errorRemoveContact = true;
      } finally {
        this.removingContact = false;
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useContactStore, import.meta.hot));
}
