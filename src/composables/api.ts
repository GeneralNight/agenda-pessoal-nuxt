import type { FetchOptions } from "ohmyfetch";
import type { GetProfileResponseBody, LoginResponseBody } from "~~/models";

export default {
  async booktoneFetch<T>(path: string, options?: FetchOptions) {
    const token = localStorage?.getItem("token") || "";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const finalOptions: any = {
      headers: { Authorization: `Bearer ${token}` },
      ...options,
    };
    return $fetch<T>(
      `${useRuntimeConfig().public.BASE_URL}${path}`,
      finalOptions
    );
  },
  register(options?: FetchOptions): Promise<void> {
    return this.booktoneFetch(`auth/register`, { method: "POST", ...options });
  },
  login(options?: FetchOptions): Promise<LoginResponseBody> {
    return this.booktoneFetch(`auth/login`, { method: "POST", ...options });
  },
  getUserProfile(
    id: number,
    options?: FetchOptions
  ): Promise<GetProfileResponseBody> {
    return this.booktoneFetch(`usuario/buscar/${id}`, {
      method: "GET",
      ...options,
    });
  },
};
