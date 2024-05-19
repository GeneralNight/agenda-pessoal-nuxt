<script lang="ts" setup>
import type { CreateContactData } from "~~/models";
import { ContactType, ContactTypeList, MaskTypes } from "~~/models";

const emits = defineEmits<{
  (e: "close"): void;
  (e: "refresh"): void;
}>();

const contactStore = useContactStore();
const { creatingContact, errorCreateContact } = storeToRefs(contactStore);

const newContact = ref<CreateContactData>({
  email: "",
  pessoa: { id: usePeopleStore().currentPersonContact?.id ?? 0 },
  privado: false,
  tag: "",
  telefone: "",
  tipoContato: ContactType.CELULAR,
  usuario: { id: useAuthStore().id ?? 0 },
});

const createContact = async () => {
  try {
    const res = await contactStore.createContact(newContact.value);
    if (res === "success") {
      emits("refresh");
    }
  } catch (e) {
    console.log(e);
  }
};

const close = () => {
  if (creatingContact.value) return;
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
        <span class="text-xl font-bold">Novo Contato</span>
        <button @click="close">
          <i class="fi fi-br-cross flex"></i>
        </button>
      </div>
      <form
        class="grid grid-cols-2 gap-8 p-6"
        @submit.prevent="createContact()"
      >
        <div class="col-span flex flex-col gap-1">
          <InputsSelect
            v-model="newContact.tipoContato"
            :label="'Tipo'"
            :id="'newContact.tipo'"
            :required="true"
            :disabled="false"
            :items="ContactTypeList"
          />
        </div>
        <div class="col-span flex flex-col gap-1">
          <InputsText
            v-model="newContact.tag"
            :label="'Descrição'"
            :id="'newContact.tag'"
            :required="false"
            :disabled="false"
          />
        </div>
        <div class="col-span flex flex-col gap-1">
          <InputsText
            v-if="newContact.tipoContato === ContactType.EMAIL"
            v-model="newContact.email"
            :label="'Email'"
            :id="'newContact.email'"
            :required="true"
            :disabled="false"
          />
          <InputsText
            v-else
            v-model="newContact.telefone"
            :label="'Telefone'"
            :id="'newContact.telefone'"
            :required="true"
            :disabled="false"
            :mask="
              newContact.tipoContato === ContactType.TELEFONE
                ? MaskTypes.TELEFONE
                : MaskTypes.CELULAR
            "
          />
        </div>
        <div class="col-span flex flex-col gap-1 justify-center">
          <InputsBoolean
            v-model="newContact.privado"
            :label="'Privado'"
            :id="'newContact.privado'"
            :disabled="false"
          />
        </div>

        <div
          class="col-span-2 flex justify-end gap-4"
          :class="{
            'pointer-events-none opacity-50 cursor-not-allowed':
              creatingContact,
          }"
        >
          <button
            class="defaultButton secondary"
            type="button"
            @click="close()"
            :disabled="creatingContact"
          >
            Cancelar
          </button>
          <button
            class="defaultButton"
            type="submit"
            :disabled="creatingContact"
          >
            Criar contato
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
