import { acceptHMRUpdate, defineStore } from "pinia";
import type { Profile } from "~~/models";

interface IState {
  loadingUsers: boolean;
  errorLoadUsers: boolean;
  users: Profile[];
}

export const useUserStore = defineStore("USERS_STORE", {
  state: (): IState => ({
    loadingUsers: false,
    errorLoadUsers: false,
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
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
