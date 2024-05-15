import { acceptHMRUpdate, defineStore } from "pinia";
import api from "~/composables/api";
import type { LoginBody, Profile, RoleTypes } from "~~/models";

interface IState {
  logging: boolean;
  errorLogin: boolean;
  keepConnected: boolean;
  roles: RoleTypes[];
  username: string;
  id?: number;
  loadingProfile: boolean;
  errorLoadProfile: boolean;
  profile?: Profile;
}

export const useAuthStore = defineStore("AUTH_STORE", {
  state: (): IState => ({
    roles: [],
    logging: false,
    errorLogin: false,
    keepConnected: false,
    username: "",
    loadingProfile: false,
    errorLoadProfile: false,
    profile: undefined,
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
        this.username = body.username;
        this.id = res.id;
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
    async loadProfile() {
      this.errorLoadProfile = false;
      this.loadingProfile = true;
      try {
        if (!this.id) {
          this.logout();
          return;
        }
        const res = await api.getUserProfile(this.id);
        this.profile = res.object.usuario;
      } catch (error) {
        this.errorLoadProfile = true;
        console.log(error);
      } finally {
        this.loadingProfile = false;
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
