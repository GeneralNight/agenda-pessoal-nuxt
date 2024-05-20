export default defineNuxtPlugin(({ hook }) => {
  hook("app:mounted", async () => {
    const pinia = usePinia();
    const route = useRoute();
    const authStore = useAuthStore(pinia);
    if (process.client) {
      if (
        localStorage.getItem("keepConnected") !== null &&
        localStorage.getItem("keepConnected") === "true"
      ) {
        try {
          if (
            localStorage.getItem("username") !== null &&
            localStorage.getItem("password") !== null
          ) {
            await authStore.login({
              username: localStorage.getItem("username") ?? "",
              password: localStorage.getItem("password") ?? "",
            });
          }
        } catch (error) {
          if (route.name !== "login") {
            navigateTo(
              useRoute().query.redirect?.toString() ??
                `/login?redirect=${route.fullPath}`
            );
          }
        }
      } else {
        navigateTo(
          useRoute().query.redirect?.toString() ??
            `/login?redirect=${route.fullPath}`
        );
      }
    }
  });
});
