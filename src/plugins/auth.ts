export default defineNuxtPlugin(({ hook }) => {
  hook("app:created", async () => {
    const pinia = usePinia();
    const route = useRoute();
    const authStore = useAuthStore(pinia);
    if (process.client) {
      authStore.keepConnected =
        localStorage.getItem("keepConnected") !== null &&
        localStorage.getItem("keepConnected") === "true";

      if (useRoute().name?.toString().includes("dashboard")) {
        navigateTo(`/loading?redirect=${useRoute().path}`);
      }

      if (authStore.keepConnected) {
        try {
          await authStore.login(
            {
              username: localStorage.getItem("username") ?? "",
              password: localStorage.getItem("password") ?? "",
            },
            true
          );
          navigateTo("/dashboard");
        } catch (error) {
          navigateTo("/login");
        }
      } else {
        authStore.logout();
        navigateTo("/login");
      }
    }
  });
});
