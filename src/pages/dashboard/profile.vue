<script lang="ts" setup>
definePageMeta({
  layout: "dashboard",
});

const authStore = useAuthStore();
const {
  profile,
  loadingProfile,
  errorLoadProfile,
  savingProfile,
  errorSaveProfile,
} = storeToRefs(authStore);

const action = ref<"change-password" | "change-username" | undefined>();

const saveProfile = () => {
  if (profile?.value) {
    authStore.saveProfile(profile.value);
  }
};

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
        <span class="text-xl font-bold text-custom-black">
          Informações básicas
        </span>
        <form
          class="grid grid-cols-2 gap-6 w-full"
          @submit.prevent="saveProfile()"
        >
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
          <div class="col-span-2 flex justify-end">
            <button
              :class="{
                'opacity-75 !bg-custom-black cursor-not-allowed': savingProfile,
              }"
              type="submit"
              class="bg-custom-black px-4 py-2.5 rounded-lg text-white transition-all hover:bg-custom-blue duration-[.2s] font-semibold"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
      <div class="flex flex-col w-full gap-6 py-6">
        <span class="text-xl font-bold text-custom-black"> Danger zone </span>
        <div class="flex flex-col border border-custom-black/50 rounded-lg">
          <div
            class="flex items-center justify-between px-4 py-8 border-b border-custom-black/50"
          >
            <div class="flex flex-col">
              <span class="font-bold text-custom-black">Trocar username</span>
              <span class="text-custom-black-100 text-sm">
                Troque a maneira de como você acessa nossa plataforma.
              </span>
            </div>
            <button
              type="button"
              class="text-red-600 px-4 py-1.5 rounded-lg border border-custom-black/50 bg-[#f6f8fa]"
              @click="action = 'change-username'"
            >
              Trocar
            </button>
          </div>
          <div class="flex items-center justify-between px-4 py-8">
            <div class="flex flex-col">
              <span class="font-bold text-custom-black">Trocar senha</span>
              <span class="text-custom-black-100 text-sm">
                Troque a senha do seu usuário.
              </span>
            </div>
            <button
              @click="action = 'change-password'"
              type="button"
              class="text-red-600 px-4 py-1.5 rounded-lg border border-custom-black/50 bg-[#f6f8fa]"
            >
              Trocar
            </button>
          </div>
        </div>
      </div>
      <Transition name="slide-anchor-left">
        <ModalValidateCredentials
          :action="action"
          v-if="action"
          @close="action = undefined"
        />
      </Transition>
    </div>
  </div>
</template>
