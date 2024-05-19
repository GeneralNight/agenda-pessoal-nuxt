<script lang="ts" setup>
import type { Person } from "~~/models";
import { brazilianStates, worldCountries } from "~~/models";

const emits = defineEmits<{
  (e: "close"): void;
  (e: "refresh"): void;
}>();

const props = defineProps<{
  person: Person;
}>();

const peopleStore = usePeopleStore();
const { savingPeople, errorSavePeople } = storeToRefs(peopleStore);

const currentPerson = ref(props.person);

const editPerson = async () => {
  if (savingPeople.value) return;
  try {
    const res = await peopleStore.savePeople(currentPerson.value);
    if (res === "success") {
      emits("refresh");
    }
  } catch (e) {
    console.log(e);
  }
};

const close = () => {
  if (savingPeople.value) return;
  emits("close");
};

watch(
  () => currentPerson.value.endereco.cep,
  useDebounceFn(async () => {
    if (currentPerson.value.endereco.cep.length) {
      await fetch(
        `https://brasilapi.com.br/api/cep/v2/${currentPerson.value.endereco.cep}`
      )
        .then((res) => res.json())
        .then((data) => {
          currentPerson.value.endereco.bairro = data.neighborhood ?? "";
          currentPerson.value.endereco.cidade = data.city ?? "";
          currentPerson.value.endereco.estado = data.state ?? "";
          currentPerson.value.endereco.logradouro = data.street ?? "";
          currentPerson.value.endereco.pais = "BR";
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
        <span class="text-xl font-bold">Editar pessoa</span>
        <button @click="close">
          <i class="fi fi-br-cross flex"></i>
        </button>
      </div>
      <form class="grid grid-cols-2 gap-8 p-6" @submit.prevent="editPerson()">
        <div class="col-span flex flex-col gap-1">
          <InputsText
            v-model="currentPerson.nome"
            :label="'Nome'"
            :id="'currentPerson.nome'"
            :required="true"
            :disabled="false"
          />
        </div>
        <div class="col-span flex flex-col gap-1">
          <InputsText
            v-model="currentPerson.cpf"
            :label="'CPF'"
            :id="'currentPerson.cpf'"
            :required="true"
            :disabled="false"
          />
        </div>
        <div class="col-span-2">
          <span class="text-xl text-custom-black font-bold">Endereço</span>
        </div>
        <div class="col-span flex flex-col gap-1">
          <InputsText
            v-model="currentPerson.endereco.cep"
            :label="'CEP'"
            :id="'currentPerson.endereco.cep'"
            :required="true"
            :disabled="false"
          />
        </div>
        <div class="col-span flex flex-col gap-1">
          <InputsSelect
            v-model="currentPerson.endereco.pais"
            :label="'País'"
            :id="'currentPerson.endereco.cidade'"
            :required="true"
            :disabled="false"
            :items="worldCountries"
          />
        </div>
        <div class="col-span flex flex-col gap-1">
          <InputsSelect
            v-model="currentPerson.endereco.estado"
            :label="'Estado'"
            :id="'currentPerson.endereco.estado'"
            :required="true"
            :disabled="false"
            :items="brazilianStates"
          />
        </div>
        <div class="col-span flex flex-col gap-1">
          <InputsText
            v-model="currentPerson.endereco.cidade"
            :label="'Cidade'"
            :id="'currentPerson.endereco.cidade'"
            :required="true"
            :disabled="false"
          />
        </div>
        <div class="col-span flex flex-col gap-1">
          <InputsText
            v-model="currentPerson.endereco.bairro"
            :label="'Bairro'"
            :id="'currentPerson.endereco.bairro'"
            :required="true"
            :disabled="false"
          />
        </div>
        <div class="col-span flex flex-col gap-1">
          <InputsText
            v-model="currentPerson.endereco.logradouro"
            :label="'Logradouro'"
            :id="'currentPerson.endereco.logradouro'"
            :required="true"
            :disabled="false"
          />
        </div>
        <div class="col-span flex flex-col gap-1">
          <InputsNumber
            v-model="currentPerson.endereco.numero"
            :label="'Numero'"
            :id="'currentPerson.endereco.numero'"
            :required="true"
            :disabled="false"
          />
        </div>
        <div
          class="col-span-2 flex justify-end gap-4"
          :class="{
            'pointer-events-none opacity-50 cursor-not-allowed': savingPeople,
          }"
        >
          <button
            class="defaultButton secondary"
            type="button"
            @click="close"
            :disabled="savingPeople"
          >
            Cancelar
          </button>
          <button class="defaultButton" type="submit" :disabled="savingPeople">
            Salvar pessoa
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
