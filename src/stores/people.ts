import { acceptHMRUpdate, defineStore } from "pinia";
import type { CreatePersonData, Person } from "~~/models";

interface IState {
  loadingPeople: boolean;
  errorLoadPeople: boolean;
  creatingPeople: boolean;
  errorCreatePeople: boolean;
  savingPeople: boolean;
  errorSavePeople: boolean;
  people: Person[];
}

export const usePeopleStore = defineStore("PEOPLE_STORE", {
  state: (): IState => ({
    loadingPeople: false,
    errorLoadPeople: false,
    creatingPeople: false,
    errorCreatePeople: false,
    savingPeople: false,
    errorSavePeople: false,
    people: [],
  }),
  getters: {},
  actions: {
    async loadPeople(nome?: string) {
      this.errorLoadPeople = false;
      this.loadingPeople = true;
      try {
        this.people = await api.getPeople({ body: { nome: nome ?? "" } });
      } catch (error) {
        this.errorLoadPeople = true;
        console.log(error);
      } finally {
        this.loadingPeople = false;
      }
    },
    async createPeople(body: CreatePersonData) {
      this.errorCreatePeople = false;
      this.creatingPeople = true;
      try {
        await api.createPerson({ body });
        return "success";
      } catch (error) {
        this.errorCreatePeople = true;
        console.log(error);
        return undefined;
      } finally {
        this.creatingPeople = false;
      }
    },
    // async savePeople(body: Profile) {
    //   this.savingPeople = true;
    //   this.errorSavePeople = false;
    //   try {
    //     this.people = await api.createPeople({ body });
    //   } catch (error) {
    //     this.errorSavePeople = true;
    //     console.log(error);
    //   } finally {
    //     this.savingPeople = false;
    //   }
    // },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePeopleStore, import.meta.hot));
}
