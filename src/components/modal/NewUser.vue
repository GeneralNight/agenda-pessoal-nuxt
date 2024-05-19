<script lang="ts" setup>
import { MaskTypes, RoleTypeList, RoleTypes } from "~~/models";
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
  tipo: "",
});

const close = () => {
  if (creatingUsers.value) return;
  emits("close");
};

const createUser = async () => {
  if (!validate()) return;
  try {
    const res = await userStore.createUser({
      tipos: [newUser.value.tipo as RoleTypes],
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
    if (res === "success") {
      emits("refresh");
    }
  } catch (e) {
    console.log(e);
  }
};

const validate = () => {
  if (newUser.value.password.length < 7) {
    return false;
  }
  if (newUser.value.password !== newUser.value.confirmPassword) {
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
          <InputsText
            v-model="newUser.nome"
            :label="'Nome'"
            :id="'newUser.nome'"
            :required="true"
            :disabled="false"
          />
        </div>
        <div class="col-span flex flex-col gap-1">
          <InputsText
            v-model="newUser.cpf"
            :label="'CPF'"
            :id="'newUser.cpf'"
            :required="true"
            :disabled="false"
            :mask="MaskTypes.CPF"
          />
        </div>
        <div class="col-span-2 flex flex-col gap-1">
          <InputsText
            v-model="newUser.email"
            :label="'Email'"
            :id="'newUser.email'"
            :required="true"
            :disabled="false"
          />
        </div>
        <div class="col-span flex flex-col gap-1">
          <InputsText
            v-model="newUser.telefone"
            :label="'Telefone'"
            :id="'newUser.telefone'"
            :required="true"
            :disabled="false"
            :mask="MaskTypes.CELULAR"
          />
        </div>
        <div class="col-span flex flex-col gap-1">
          <InputsText
            v-model="newUser.username"
            :label="'Usuário'"
            :id="'newUser.username'"
            :required="true"
            :disabled="false"
          />
        </div>
        <div class="col-span flex flex-col gap-1">
          <InputsPassword
            v-model="newUser.password"
            :label="'Senha'"
            :id="'newUser.password'"
            :required="true"
            :disabled="false"
          />
        </div>
        <div class="col-span flex flex-col gap-1">
          <InputsPassword
            v-model="newUser.confirmPassword"
            :label="'Confirme a senha'"
            :id="'newUser.confirmPassword'"
            :required="true"
            :disabled="false"
          />
        </div>
        <div class="col-span flex flex-col gap-1">
          <InputsDate
            v-model="newUser.dataNascimento"
            :label="'Data de nascimento'"
            :id="'newUser.dataNascimento'"
            :required="true"
            :disabled="false"
          />
        </div>
        <div class="col-span flex flex-col gap-1">
          <InputsSelect
            v-model="newUser.tipo"
            :label="'Tipo'"
            :id="'newUser.tipo'"
            :required="true"
            :disabled="false"
            :items="RoleTypeList"
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
