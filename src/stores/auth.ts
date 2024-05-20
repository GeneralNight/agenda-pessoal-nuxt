import { acceptHMRUpdate, defineStore } from "pinia";
import api from "~/composables/api";
import type { LoginBody, Profile } from "~~/models";

interface IState {
  logging: boolean;
  errorLogin: boolean;
  keepConnected: boolean;
  loadingProfile: boolean;
  errorLoadProfile: boolean;
  savingProfile: boolean;
  errorSaveProfile: boolean;
}

export const useAuthStore = defineStore("AUTH_STORE", {
  state: (): IState => ({
    logging: false,
    errorLogin: false,
    keepConnected: false,
    loadingProfile: false,
    errorLoadProfile: false,
    savingProfile: false,
    errorSaveProfile: false,
  }),
  getters: {},
  actions: {
    async login(body: LoginBody, noRedirect?: boolean) {
      this.errorLogin = false;
      this.logging = true;
      try {
        const res = await api.login({ body });
        await this.loadProfile(res.id);

        this.setLocalStorageToken(`${res.accessToken}`);
        this.handleKeepConnectedState(body);

        if (!noRedirect) {
          navigateTo(useRoute().query.redirect?.toString() ?? "/dashboard");
        }
      } catch (error) {
        this.errorLogin = true;
        throw new Error(`${error}`);
      } finally {
        this.logging = false;
      }
    },
    setLocalStorageToken(token: string) {
      localStorage.setItem("token", `${token}`);
    },
    handleKeepConnectedState(body: LoginBody) {
      if (this.keepConnected) {
        localStorage.setItem("username", `${body.username}`);
        localStorage.setItem("password", `${body.password}`);
      } else {
        localStorage.removeItem("username");
        localStorage.removeItem("password");
      }
    },
    logout() {
      useProfile.profile().value = undefined;
      localStorage.removeItem("username");
      localStorage.removeItem("password");
      useRouter().push("/login");
    },
    async loadProfile(id: number) {
      if (useProfile.profile().value) {
        return;
      }
      this.errorLoadProfile = false;
      this.loadingProfile = true;
      try {
        if (!id) {
          this.logout();
          return;
        }
        const res = await api.getUserProfile(id);

        useProfile.profile().value = res.object.usuario;
        useProfile.profileType().value = res.object.tipos;
      } catch (error) {
        this.errorLoadProfile = true;
        console.log(error);
      } finally {
        this.loadingProfile = false;
      }
    },
    async saveProfile(body: Profile) {
      this.errorSaveProfile = false;
      this.savingProfile = true;
      try {
        const res = await api.saveUserProfile({ body });
        useProfile.profile().value = res.object;
      } catch (error) {
        this.errorSaveProfile = true;
      } finally {
        this.savingProfile = false;
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
