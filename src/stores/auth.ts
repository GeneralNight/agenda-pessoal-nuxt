import { acceptHMRUpdate, defineStore } from "pinia";
import api from "~/composables/api";
import type { LoginBody, RoleTypes } from "~~/models";

interface IState {
  logging: boolean;
  errorLogin: boolean;
  keepConnected: boolean;
  roles: RoleTypes[];
}

export const useAuthStore = defineStore("AUTH_STORE", {
  state: (): IState => ({
    roles: [],
    logging: false,
    errorLogin: false,
    keepConnected: false,
  }),
  getters: {},
  actions: {
    async login(body: LoginBody) {
      this.errorLogin = false;
      this.logging = true;
      try {
        const res = await api.login({ body });

        localStorage.setItem("token", `${res.accessToken}`);
        this.roles = res.tipos;

        if (this.keepConnected) {
          localStorage.setItem("username", `${body.username}`);
          localStorage.setItem("password", `${body.password}`);
        } else {
          localStorage.removeItem("username");
          localStorage.removeItem("password");
        }
        localStorage.setItem("keepConnected", `${this.keepConnected}`);
        useRouter().push("/dashboard");
      } catch (error) {
        this.errorLogin = true;
        console.log(error);
        useRouter().push("/login");
      } finally {
        this.logging = false;
      }
    },
    logout() {
      localStorage.removeItem("username");
      localStorage.removeItem("password");
      useRouter().push("/login");
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
