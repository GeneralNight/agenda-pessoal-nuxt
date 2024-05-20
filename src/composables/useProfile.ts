import type { Profile, RoleTypes } from "~~/models";

export default {
  profile() {
    return useState<Profile | undefined>(
      "useLoggedUserProfile",
      () => undefined
    );
  },
  profileType() {
    return useState<RoleTypes[] | undefined>("useLoggedUserRoles", () => []);
  },
};
