<script lang="ts" setup>
import type { Contact } from "~~/models";
import { ContactType } from "~~/models";

const emits = defineEmits<{
  (e: "edit"): void;
  (e: "remove"): void;
}>();

const props = defineProps<{
  contact: Contact;
}>();

const contactText = computed(() => {
  return props.contact.tipoContato === ContactType.EMAIL
    ? props.contact.email
    : props.contact.telefone;
});
</script>

<template>
  <div class="flex items-center justify-between px-4 py-6">
    <div class="flex flex-col gap-1">
      <span class="font-semibold">{{ contact.pessoa.nome }}</span>
      <span class="font-semibold text-custom-black-100 text-sm">{{
        contactText
      }}</span>
    </div>
    <div class="flex gap-3 items-stretch">
      <button
        class="defaultButton secondary flex items-center gap-2"
        @click="emits('remove')"
      >
        <i class="fi fi-ss-trash flex"></i>
      </button>
      <button
        class="defaultButton flex items-center gap-2"
        @click="emits('edit')"
      >
        <i class="fi fi-ss-pencil flex"></i>

        <span> Editar </span>
      </button>
    </div>
  </div>
</template>
