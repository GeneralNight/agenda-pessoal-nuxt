<script lang="ts" setup>
import { RoleTypes } from "~~/models";
const emits = defineEmits<{
  (e: "close"): void;
  (e: "refresh"): void;
}>();

const userStore = useUserStore();
const { creatingUsers, errorCreateUsers } = storeToRefs(userStore);

const newUser = ref({
  cpf: "",
  dataNascimento: new Date(),
  email: "",
  password: "",
  confirmPassword: "",
  telefone: "",
  username: "",
  nome: "",
  tipo: RoleTypes.USER,
});

const close = () => {
  if (creatingUsers.value) return;
  emits("close");
};

const createUser = async () => {
  if (!validate()) return;
  try {
    await userStore.createUser({
      tipos: [newUser.value.tipo],
      usuario: {
        cpf: newUser.value.cpf,
        dataNascimento: newUser.value.dataNascimento,
        email: newUser.value.email,
        nome: newUser.value.nome,
        password: newUser.value.password,
        telefone: newUser.value.telefone,
        username: newUser.value.username,
      },
    });
    emits("refresh");
  } catch (e) {
    console.log(e);
  }
};

const validate = () => {
  if (newUser.value.password.length < 8) {
    return false;
  }
  if (newUser.value.password === newUser.value.confirmPassword) {
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
      <form class="grid grid-cols-2 gap-8 p-6" @submit.prevent="createUser()">
        <div class="col-span flex flex-col gap-1">
          <label
            for="newUser.nome"
            class="text-sm text-custom-black-100 font-semibold"
          >
            Nome
          </label>
          <input
            type="text"
            class="defaultInput w-full"
            v-model="newUser.nome"
            required
            :id="`newUser.nome`"
          />
        </div>
        <div class="col-span flex flex-col gap-1">
          <label
            for="newUser.cpf"
            class="text-sm text-custom-black-100 font-semibold"
          >
            CPF
          </label>
          <input
            type="text"
            class="defaultInput w-full"
            v-model="newUser.cpf"
            required
            :id="`newUser.cpf`"
          />
        </div>
        <div class="col-span-2 flex flex-col gap-1">
          <label
            for="newUser.email"
            class="text-sm text-custom-black-100 font-semibold"
          >
            Email
          </label>
          <input
            type="email"
            class="defaultInput w-full"
            v-model="newUser.email"
            required
            :id="`newUser.email`"
          />
        </div>
        <div class="col-span flex flex-col gap-1">
          <label
            for="newUser.telefone"
            class="text-sm text-custom-black-100 font-semibold"
          >
            Telefone
          </label>
          <input
            type="tel"
            class="defaultInput w-full"
            v-model="newUser.telefone"
            required
            :id="`newUser.telefone`"
          />
        </div>
        <div class="col-span flex flex-col gap-1">
          <label
            for="newUser.username"
            class="text-sm text-custom-black-100 font-semibold"
          >
            Usuário
          </label>
          <input
            type="text"
            class="defaultInput w-full"
            v-model="newUser.username"
            required
            :id="`newUser.username`"
          />
        </div>
        <div class="col-span flex flex-col gap-1">
          <label
            for="newUser.password"
            class="text-sm text-custom-black-100 font-semibold"
          >
            Senha
          </label>
          <input
            type="text"
            class="defaultInput w-full"
            v-model="newUser.password"
            required
            :id="`newUser.password`"
          />
        </div>
        <div class="col-span flex flex-col gap-1">
          <label
            for="newUser.confirmPassword"
            class="text-sm text-custom-black-100 font-semibold"
          >
            Confirme a senha
          </label>
          <input
            type="text"
            class="defaultInput w-full"
            v-model="newUser.confirmPassword"
            required
            :id="`newUser.confirmPassword`"
          />
        </div>
        <div class="col-span flex flex-col gap-1">
          <label
            for="newUser.dataNascimento"
            class="text-sm text-custom-black-100 font-semibold"
          >
            Data de Nascimento
          </label>
          <input
            type="date"
            class="defaultInput w-full"
            v-model="newUser.dataNascimento"
            required
            :id="`newUser.dataNascimento`"
          />
        </div>
        <div
          class="col-span-2 flex justify-end gap-4"
          :class="{
            'pointer-events-none opacity-50 cursor-not-allowed': creatingUsers,
          }"
        >
          <button
            class="defaultButton secondary"
            type="button"
            @click="close"
            :disabled="creatingUsers"
          >
            Cancelar
          </button>
          <button class="defaultButton" type="submit" :disabled="creatingUsers">
            Criar usuário
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
