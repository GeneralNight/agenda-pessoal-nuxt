<script lang="ts" setup>
import { type Profile } from "~~/models";
const props = defineProps<{
  user: Profile;
}>();

const emits = defineEmits<{
  (e: "close"): void;
  (e: "refresh"): void;
}>();

const userStore = useUserStore();
const { savingUsers, errorSaveUser } = storeToRefs(userStore);

const currentUser = ref(props.user);

const close = () => {
  if (savingUsers.value) return;
  emits("close");
};

const saveUser = async () => {
  if (!validate()) return;
  try {
    await userStore.saveUser(currentUser.value);
    emits("refresh");
  } catch (e) {
    console.log(e);
  }
};

const validate = () => {
  if (currentUser.value.password.length < 8) {
    return false;
  }
  return true;
};
</script>

<template>
  <div
    class="fixed bg-black/50 backdrop-blur-lg flex items-center justify-center px-4 py-10 inset-0 h-full w-full"
  >
    <div
      class="flex flex-col bg-white rounded-lg overflow-hidden w-full max-w-[640px]"
    >
      <div
        class="flex items-center justify-between border-b border-custom-black/50 p-4 w-full"
      >
        <span class="text-xl font-bold">Novo usuário</span>
        <button @click="close">
          <i class="fi fi-br-cross flex"></i>
        </button>
      </div>
      <form class="grid grid-cols-2 gap-8 p-6" @submit.prevent="saveUser()">
        <div class="col-span flex flex-col gap-1">
          <label
            for="currentUser.nome"
            class="text-sm text-custom-black-100 font-semibold"
          >
            Nome
          </label>
          <input
            type="text"
            class="defaultInput w-full"
            v-model="currentUser.nome"
            required
            :id="`currentUser.nome`"
          />
        </div>
        <div class="col-span flex flex-col gap-1">
          <label
            for="currentUser.cpf"
            class="text-sm text-custom-black-100 font-semibold"
          >
            CPF
          </label>
          <input
            type="text"
            class="defaultInput w-full"
            v-model="currentUser.cpf"
            required
            :id="`currentUser.cpf`"
          />
        </div>
        <div class="col-span-2 flex flex-col gap-1">
          <label
            for="currentUser.email"
            class="text-sm text-custom-black-100 font-semibold"
          >
            Email
          </label>
          <input
            type="email"
            class="defaultInput w-full"
            v-model="currentUser.email"
            required
            :id="`currentUser.email`"
          />
        </div>
        <div class="col-span flex flex-col gap-1">
          <label
            for="currentUser.telefone"
            class="text-sm text-custom-black-100 font-semibold"
          >
            Telefone
          </label>
          <input
            type="tel"
            class="defaultInput w-full"
            v-model="currentUser.telefone"
            required
            :id="`currentUser.telefone`"
          />
        </div>
        <div class="col-span flex flex-col gap-1">
          <label
            for="currentUser.username"
            class="text-sm text-custom-black-100 font-semibold"
          >
            Usuário
          </label>
          <input
            type="text"
            class="defaultInput w-full"
            v-model="currentUser.username"
            required
            :id="`currentUser.username`"
          />
        </div>
        <div class="col-span flex flex-col gap-1">
          <label
            for="currentUser.dataNascimento"
            class="text-sm text-custom-black-100 font-semibold"
          >
            Data de Nascimento
          </label>
          <input
            type="date"
            class="defaultInput w-full"
            v-model="currentUser.dataNascimento"
            required
            :id="`currentUser.dataNascimento`"
          />
        </div>
        <div
          class="col-span-2 flex justify-end gap-4"
          :class="{
            'pointer-events-none opacity-50 cursor-not-allowed': savingUsers,
          }"
        >
          <button
            class="defaultButton secondary"
            type="button"
            @click="close"
            :disabled="savingUsers"
          >
            Cancelar
          </button>
          <button class="defaultButton" type="submit" :disabled="savingUsers">
            Salvar usuário
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
