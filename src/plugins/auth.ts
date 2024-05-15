export default defineNuxtPlugin(({ hook }) => {
  hook("app:created", async () => {
    const pinia = usePinia();
    const authStore = useAuthStore(pinia);
    if (process.client) {
      authStore.keepConnected =
        localStorage.getItem("keepConnected") !== null &&
        localStorage.getItem("keepConnected") === "true";

      if (authStore.keepConnected) {
        try {
          await authStore.login({
            username: localStorage.getItem("username") ?? "",
            password: localStorage.getItem("password") ?? "",
          });
          useRouter().push("/dashboard");
        } catch (error) {
          useRouter().push("/login");
        }
      }
    }
  });
});
