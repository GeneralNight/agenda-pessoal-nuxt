import { acceptHMRUpdate, defineStore } from "pinia";
import type { Profile, RoleTypes } from "~~/models";

interface IState {
  loadingUsers: boolean;
  errorLoadUsers: boolean;
  creatingUsers: boolean;
  errorCreateUsers: boolean;
  savingUsers: boolean;
  errorSaveUser: boolean;
  users: Profile[];
}

export const useUserStore = defineStore("USERS_STORE", {
  state: (): IState => ({
    loadingUsers: false,
    errorLoadUsers: false,
    creatingUsers: false,
    errorCreateUsers: false,
    savingUsers: false,
    errorSaveUser: false,
    users: [],
  }),
  getters: {},
  actions: {
    async loadUsers(termo?: string) {
      this.errorLoadUsers = false;
      this.loadingUsers = true;
      try {
        this.users = await api.getUsers({ body: { termo: termo ?? "" } });
      } catch (error) {
        this.errorLoadUsers = true;
        console.log(error);
      } finally {
        this.loadingUsers = false;
      }
    },
    async createUser(body: {
      tipos: RoleTypes[];
      usuario: Omit<Profile, "id">;
    }) {
      this.errorCreateUsers = false;
      this.creatingUsers = true;
      try {
        this.users = await api.createUser({ body });
        return "success";
      } catch (error) {
        this.errorCreateUsers = true;
        console.log(error);
        return undefined;
      } finally {
        this.creatingUsers = false;
      }
    },
    async saveUser(body: Profile) {
      this.savingUsers = true;
      this.errorSaveUser = false;
      try {
        this.users = await api.createUser({ body });
      } catch (error) {
        this.errorSaveUser = true;
        console.log(error);
      } finally {
        this.savingUsers = false;
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
