import { acceptHMRUpdate, defineStore } from "pinia";
import type { Profile, RoleTypes } from "~~/models";

interface IState {
  loadingUsers: boolean;
  errorLoadUsers: boolean;
  creatingUsers: boolean;
  errorCreateUsers: boolean;
  users: Profile[];
}

export const useUserStore = defineStore("USERS_STORE", {
  state: (): IState => ({
    loadingUsers: false,
    errorLoadUsers: false,
    creatingUsers: false,
    errorCreateUsers: false,
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
      } catch (error) {
        this.errorCreateUsers = true;
        console.log(error);
      } finally {
        this.creatingUsers = false;
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
