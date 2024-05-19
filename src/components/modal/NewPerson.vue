<script lang="ts" setup>
import type { CreatePersonData } from "~~/models";
import { brazilianStates, worldCountries } from "~~/models";

const emits = defineEmits<{
  (e: "close"): void;
  (e: "refresh"): void;
}>();

const peopleStore = usePeopleStore();
const { creatingPeople, errorCreatePeople } = storeToRefs(peopleStore);

const newPerson = ref<CreatePersonData>({
  nome: "",
  cpf: "",
  endereco: {
    bairro: "",
    cep: "",
    cidade: "",
    estado: "",
    logradouro: "",
    numero: 0,
    pais: "",
  },
});

const createPerson = async () => {
  try {
    const res = await peopleStore.createPeople(newPerson.value);
    if (res === "success") {
      emits("refresh");
    }
  } catch (e) {
    console.log(e);
  }
};

const close = () => {
  if (creatingPeople.value) return;
  emits("close");
};

watch(
  () => newPerson.value.endereco.cep,
  useDebounceFn(async () => {
    if (newPerson.value.endereco.cep.length) {
      await fetch(
        `https://brasilapi.com.br/api/cep/v2/${newPerson.value.endereco.cep}`
      )
        .then((res) => res.json())
        .then((data) => {
          newPerson.value.endereco.bairro = data.neighborhood ?? "";
          newPerson.value.endereco.cidade = data.city ?? "";
          newPerson.value.endereco.estado = data.state ?? "";
          newPerson.value.endereco.logradouro = data.street ?? "";
          newPerson.value.endereco.pais = "BR";
        });
    }
  }, 1500)
);
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
        <span class="text-xl font-bold">Nova pessoa</span>
        <button @click="close">
          <i class="fi fi-br-cross flex"></i>
        </button>
      </div>
      <form class="grid grid-cols-2 gap-8 p-6" @submit.prevent="createPerson()">
        <div class="col-span flex flex-col gap-1">
          <InputsText
            v-model="newPerson.nome"
            :label="'Nome'"
            :id="'newPerson.nome'"
            :required="true"
            :disabled="false"
          />
        </div>
        <div class="col-span flex flex-col gap-1">
          <InputsText
            v-model="newPerson.cpf"
            :label="'CPF'"
            :id="'newPerson.cpf'"
            :required="true"
            :disabled="false"
          />
        </div>
        <div class="col-span-2">
          <span class="text-xl text-custom-black font-bold">Endereço</span>
        </div>
        <div class="col-span flex flex-col gap-1">
          <InputsText
            v-model="newPerson.endereco.cep"
            :label="'CEP'"
            :id="'newPerson.endereco.cep'"
            :required="true"
            :disabled="false"
          />
        </div>
        <div class="col-span flex flex-col gap-1">
          <InputsSelect
            v-model="newPerson.endereco.pais"
            :label="'País'"
            :id="'newPerson.endereco.cidade'"
            :required="true"
            :disabled="false"
            :items="worldCountries"
          />
        </div>
        <div class="col-span flex flex-col gap-1">
          <InputsSelect
            v-model="newPerson.endereco.estado"
            :label="'Estado'"
            :id="'newPerson.endereco.estado'"
            :required="true"
            :disabled="false"
            :items="brazilianStates"
          />
        </div>
        <div class="col-span flex flex-col gap-1">
          <InputsText
            v-model="newPerson.endereco.cidade"
            :label="'Cidade'"
            :id="'newPerson.endereco.cidade'"
            :required="true"
            :disabled="false"
          />
        </div>
        <div class="col-span flex flex-col gap-1">
          <InputsText
            v-model="newPerson.endereco.bairro"
            :label="'Bairro'"
            :id="'newPerson.endereco.bairro'"
            :required="true"
            :disabled="false"
          />
        </div>
        <div class="col-span flex flex-col gap-1">
          <InputsText
            v-model="newPerson.endereco.logradouro"
            :label="'Logradouro'"
            :id="'newPerson.endereco.logradouro'"
            :required="true"
            :disabled="false"
          />
        </div>
        <div class="col-span flex flex-col gap-1">
          <InputsNumber
            v-model="newPerson.endereco.numero"
            :label="'Numero'"
            :id="'newPerson.endereco.numero'"
            :required="true"
            :disabled="false"
          />
        </div>
        <div
          class="col-span-2 flex justify-end gap-4"
          :class="{
            'pointer-events-none opacity-50 cursor-not-allowed': creatingPeople,
          }"
        >
          <button
            class="defaultButton secondary"
            type="button"
            @click="close()"
            :disabled="creatingPeople"
          >
            Cancelar
          </button>
          <button
            class="defaultButton"
            type="submit"
            :disabled="creatingPeople"
          >
            Criar usuário
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
