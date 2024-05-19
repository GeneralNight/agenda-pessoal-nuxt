<script lang="ts" setup>
import type { Contact } from "~~/models";

const emits = defineEmits<{
  (e: "close"): void;
  (e: "refresh"): void;
}>();

const props = defineProps<{
  contact: Contact;
}>();

const contactStore = useContactStore();
const { savingContact, errorSaveContact } = storeToRefs(contactStore);

const currentContact = ref(props.contact);

const editContact = async () => {
  if (savingContact.value) return;
  try {
    const res = await contactStore.saveContact(currentContact.value);
    if (res === "success") {
      emits("refresh");
    }
  } catch (e) {
    console.log(e);
  }
};

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
        <span class="text-xl font-bold">Editar Contato</span>
        <button @click="close">
          <i class="fi fi-br-cross flex"></i>
        </button>
      </div>
      <form class="grid grid-cols-2 gap-8 p-6" @submit.prevent="editContact()">
        <div class="col-span flex flex-col gap-1"></div>

        <div
          class="col-span-2 flex justify-end gap-4"
          :class="{
            'pointer-events-none opacity-50 cursor-not-allowed': savingContact,
          }"
        >
          <button
            class="defaultButton secondary"
            type="button"
            @click="close"
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
