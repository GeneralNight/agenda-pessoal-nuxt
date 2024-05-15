<script lang="ts" setup>
definePageMeta({
  layout: "dashboard",
});

const authStore = useAuthStore();
const { profile, loadingProfile, errorLoadProfile } = storeToRefs(authStore);

onMounted(async () => {
  await authStore.loadProfile();
});
</script>

<template>
  <div class="flex flex-col w-full">
    <div class="flex flex-col items-center gap-2" v-if="loadingProfile">
      <Loading :color="'text-custom-black'" :size="'h-6 w-6'" />
      <span class="text-xl font-semibold border-custom-black">
        Carregando informações...
      </span>
    </div>
    <div
      class="flex flex-col w-full"
      v-if="!loadingProfile && !errorLoadProfile && profile"
    >
      <div class="flex flex-col w-full gap-6 py-6">
        <span class="text-xl font-semibold text-custom-black">
          Informações básicas
        </span>
        <div class="grid grid-cols-2 gap-6 w-full">
          <div class="col-span flex flex-col gap-1">
            <label
              for="profile.nome"
              class="text-sm text-custom-black-100 font-semibold"
            >
              Nome
            </label>
            <input
              type="text"
              class="defaultInput w-full"
              v-model="profile.nome"
              :id="`profile.nome`"
            />
          </div>
          <div class="col-span flex flex-col gap-1">
            <label
              for="profile.cpf"
              class="text-sm text-custom-black-100 font-semibold"
            >
              CPF
            </label>
            <input
              type="text"
              class="defaultInput w-full"
              v-model="profile.cpf"
              :id="`profile.cpf`"
            />
          </div>
          <div class="col-span flex flex-col gap-1">
            <label
              for="profile.email"
              class="text-sm text-custom-black-100 font-semibold"
            >
              Email
            </label>
            <input
              type="email"
              class="defaultInput w-full"
              v-model="profile.email"
              :id="`profile.email`"
            />
          </div>
          <div class="col-span flex flex-col gap-1">
            <label
              for="profile.dataNascimento"
              class="text-sm text-custom-black-100 font-semibold"
            >
              Data de nascimento
            </label>
            <input
              type="date"
              class="defaultInput w-full"
              v-model="profile.dataNascimento"
              :id="`profile.dataNascimento`"
            />
          </div>
          <div class="col-span flex flex-col gap-1">
            <label
              for="profile.telefone"
              class="text-sm text-custom-black-100 font-semibold"
            >
              Telefone
            </label>
            <input
              type="tel"
              class="defaultInput w-full"
              v-model="profile.telefone"
              :id="`profile.telefone`"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
