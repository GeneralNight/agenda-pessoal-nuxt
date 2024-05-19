<script lang="ts" setup>
import type { Contact } from "~~/models";
import { ContactType, ContactTypeList } from "~~/models";

const emits = defineEmits<{
  (e: "close"): void;
  (e: "refresh"): void;
}>();

const props = defineProps<{
  contact: Contact;
}>();

const contactStore = useContactStore();
const { savingContact, errorSaveContact } = storeToRefs(contactStore);

const currentContact = ref({ ...props.contact });

const saveContact = async () => {
  try {
    const res = await contactStore.saveContact(currentContact.value);
    if (res === "success") {
      emits("refresh");
    }
  } catch (e) {
    console.log(e);
  }
};

watch(
  () => currentContact.value.tipoContato,
  () => {
    if (currentContact.value.tipoContato === ContactType.EMAIL) {
      currentContact.value.telefone = "";
    } else {
      currentContact.value.email = "";
    }
  }
);

const close = () => {
  if (savingContact.value) return;
  emits("close");
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
        <span class="text-xl font-bold">Salvar Contato</span>
        <button @click="close">
          <i class="fi fi-br-cross flex"></i>
        </button>
      </div>
      <form class="grid grid-cols-2 gap-8 p-6" @submit.prevent="saveContact()">
        <div class="col-span flex flex-col gap-1">
          <InputsSelect
            v-model="currentContact.tipoContato"
            :label="'Tipo'"
            :id="'newContact.tipo'"
            :required="true"
            :disabled="false"
            :items="ContactTypeList"
          />
        </div>
        <div class="col-span flex flex-col gap-1">
          <InputsText
            v-model="currentContact.tag"
            :label="'Descrição'"
            :id="'newContact.tag'"
            :required="false"
            :disabled="false"
          />
        </div>
        <div class="col-span flex flex-col gap-1">
          <InputsText
            v-if="currentContact.tipoContato === ContactType.EMAIL"
            v-model="currentContact.email"
            :label="'Email'"
            :id="'newContact.email'"
            :required="true"
            :disabled="false"
          />
          <InputsText
            v-else
            v-model="currentContact.telefone"
            :label="'Telefone'"
            :id="'newContact.telefone'"
            :required="true"
            :disabled="false"
          />
        </div>
        <div class="col-span flex flex-col gap-1 justify-center">
          <InputsBoolean
            v-model="currentContact.privado"
            :label="'Privado'"
            :id="'newContact.privado'"
            :disabled="false"
          />
        </div>

        <div
          class="col-span-2 flex justify-end gap-4"
          :class="{
            'pointer-events-none opacity-50 cursor-not-allowed': savingContact,
          }"
        >
          <button
            class="defaultButton secondary"
            type="button"
            @click="close()"
            :disabled="savingContact"
          >
            Cancelar
          </button>
          <button class="defaultButton" type="submit" :disabled="savingContact">
            Salvar contato
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
