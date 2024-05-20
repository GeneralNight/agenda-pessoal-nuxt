export default defineNuxtPlugin(({ hook }) => {
  hook("app:created", async () => {
    if (process.client) {
      const pinia = usePinia();
      const authStore = useAuthStore(pinia);
      if (useRoute().name?.toString().includes("dashboard")) {
        navigateTo(`/login?redirect=${useRoute().path}`);
      }

      authStore.keepConnected =
        localStorage.getItem("keepConnected") !== null &&
        localStorage.getItem("keepConnected") === "true";
    }
  });
});
