export default defineNuxtRouteMiddleware((to, _from) => {
  const userProfile = useProfile.profile();

  if (!userProfile.value) {
    return navigateTo({ name: "login", query: { redirect: to.fullPath } });
  }
});
