<script lang="ts" setup>
import { useAuthStore } from "~/stores";
import { BadgeVariant } from "~~/models";

const loginFormData = ref({
  username: "",
  password: "",
});

const authStore = useAuthStore();
const { keepConnected, logging, errorLogin } = storeToRefs(authStore);

const handleLoginForm = async () => {
  await authStore.login(loginFormData.value);
};
</script>

<template>
  <div
    class="flex flex-col min-w-screen min-h-screen items-center justify-center bg-[#f9f9f9] p-4 sm:p-10 bg-cover bg-center bg-no-repeat"
  >
    <div
      class="absolute z-0 lg:hidden inset-0 customBg bg-cover bg-center bg-no-repeat opacity-50"
    ></div>
    <div
      class="bg-white flex items-center min-h-[420px] sm:min-h-[640px] w-full max-w-[1440px] rounded-lg shadow-lg overflow-hidden z-[1] relative"
    >
      <form
        class="flex flex-col w-full h-full items-center justify-center p-4 sm:p-6 gap-8"
        @submit.prevent="handleLoginForm()"
      >
        <div class="flex flex-col items-center gap-2">
          <p class="text-lg sm:text-2xl font-bold text-custom-black">
            Welcome back!
          </p>
          <p class="text-[#404040] text-center text-sm sm:text-base">
            Use your credentials to access our platform
          </p>
        </div>
        <div class="flex flex-col gap-6 max-w-[360px] w-full relative">
          <Transition name="slide-anchor-top">
            <Badge
              :variant="BadgeVariant.DANGER"
              :text="'Invalid credentials'"
              v-if="errorLogin"
            />
          </Transition>
          <input
            type="text"
            v-model="loginFormData.username"
            placeholder="Username"
            class="defaultInput w-full"
            :disabled="logging"
            required
          />
          <div class="flex flex-col gap-3.5">
            <input
              type="password"
              v-model="loginFormData.password"
              placeholder="Password"
              class="defaultInput w-full"
              :disabled="logging"
              required
            />
            <div class="flex w-full justify-between items-center">
              <button
                type="button"
                @click="keepConnected = !keepConnected"
                class="text-custom-black font-bold self-end text-sm transition-all duration-[.2s] hover:text-custom-blue flex items-center gap-1.5"
                :disabled="logging"
                :class="{
                  ' cursor-not-allowed': logging,
                }"
              >
                <div
                  class="w-5 h-5 rounded-md border border-custom-black flex items-center justify-center text-sm"
                  :class="{ 'bg-custom-black': keepConnected }"
                >
                  <i
                    class="fi fi-br-check text-white h-4"
                    v-if="keepConnected"
                  ></i>
                </div>
                <span> Keep connected </span>
              </button>
              <button
                type="button"
                class="text-custom-black font-bold self-end transition-all duration-[.2s] hover:text-custom-blue text-sm"
                :disabled="logging"
                :class="{
                  ' cursor-not-allowed': logging,
                }"
              >
                Forgot password?
              </button>
            </div>
          </div>
          <button
            :class="{
              'opacity-75 !bg-custom-black cursor-not-allowed': logging,
            }"
            class="bg-custom-black text-white sm:text-xl font-semibold py-2.5 px-4 rounded-lg transition-all hover:bg-custom-blue duration-[.2s] flex items-center justify-center"
            :disabled="logging"
          >
            {{ logging ? "Login..." : "Login" }}
          </button>
        </div>
      </form>
      <div
        class="w-full h-[640px] bg-cover bg-no-repeat bg-center customBg hidden lg:block"
      ></div>
    </div>
  </div>
</template>

<style>
.customBg {
  background-image: url("~/assets/imgs/bg.jpg");
}
</style>
