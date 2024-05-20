import { RoleTypes } from "~~/models";

export default defineNuxtRouteMiddleware((to, _from) => {
  const profileType = useProfile.profileType();
  const profile = useProfile.profile();

  if (!profile.value) {
    return navigateTo({
      name: "login",
      query: { redirect: to.fullPath },
    });
  }

  if (!profileType.value?.includes(RoleTypes.ADMIN)) {
    return _from ? navigateTo(_from.path) : navigateTo("/dashboard");
  }
});
