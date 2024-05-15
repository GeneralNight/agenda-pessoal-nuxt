<script lang="ts" setup>
const authStore = useAuthStore();
const { username } = storeToRefs(authStore);

const menu = ref([
  {
    label: "Home",
    path: "/dashboard/",
    icon: "fi fi-ss-house-chimney",
  },
  {
    label: "Contatos",
    path: "/dashboard/contacts",
    icon: "fi fi-sr-phone-flip",
  },
  {
    label: "Pessoas",
    path: "/dashboard/people",
    icon: "fi fi-ss-user",
  },
  {
    label: "Usuários",
    path: "/dashboard/users",
    icon: "fi fi-sr-users-alt",
  },
  {
    label: "Meu cadastro",
    path: "/dashboard/profile",
    icon: "fi fi-rs-circle-user",
  },
]);
</script>

<template>
  <div
    class="flex flex-col h-full min-h-screen w-[300px] border-r border-[#70707050] justify-between overflow-hidden"
  >
    <div
      class="h-full max-h-full overflow-y-scroll hide-scrollbar py-6 flex flex-col gap-4"
    >
      <div class="flex flex-col items-center">
        <span class="text-xl font-semibold text-custom-black"
          >Seja bem vindo!</span
        >
      </div>
      <div class="flex flex-col">
        <NuxtLink
          :to="item.path"
          class="w-full py-6 border-b border-[#70707050] bg-white px-6 flex items-center gap-3 text-custom-black font-medium transition-all hover:brightness-95 duration-[.2s]"
          :active-class="'font-bold !text-custom-blue'"
          v-for="item in menu"
        >
          <i :class="[item.icon]" class="flex"></i>
          <span class="">{{ item.label }}</span>
        </NuxtLink>
      </div>
    </div>
    <div class="flex flex-col gap-1 items-start p-4 py-6 customShadow">
      <span class="font-semibold">Olá, {{ username }}</span>
      <button
        class="text-[#e74c3c] text-sm transition-all hover:brightness-90 duration-[.2s]"
        @click="authStore.logout"
      >
        Sair
      </button>
    </div>
  </div>
</template>

<style>
.customShadow {
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
}
</style>
