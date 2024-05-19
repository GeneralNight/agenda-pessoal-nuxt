<script lang="ts" setup>
import type { Contact } from "~~/models";
import { ContactType } from "~~/models";

const emits = defineEmits<{
  (e: "edit"): void;
  (e: "remove"): void;
}>();

const contactStore = useContactStore();
const { favorites } = storeToRefs(contactStore);

const props = defineProps<{
  contact: Contact;
}>();

const contactText = computed(() => {
  return props.contact.tipoContato === ContactType.EMAIL
    ? props.contact.email
    : props.contact.telefone;
});

const isFavorite = computed(() => {
  return favorites.value.find((v) => v.id === props.contact.id);
});

const handleFavorite = async () => {
  await contactStore.handleFavoriteContact(props.contact);
};
</script>

<template>
  <div class="flex items-center justify-between px-4 py-6">
    <div class="flex flex-col gap-1">
      <span class="font-semibold">{{ contact.pessoa.nome }}</span>
      <div class="flex items-center gap-4">
        <span class="font-semibold text-custom-black-100 text-sm">{{
          contactText
        }}</span>
        <span class="font-semibold text-custom-black/50 text-sm"
          >({{ contact.tipoContato }})</span
        >
      </div>
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
      <button
        class="defaultButton flex items-center gap-2"
        @click="handleFavorite"
      >
        <i class="fi fi-ss-star flex" v-if="isFavorite"></i>
        <i class="fi fi-rs-star flex" v-else></i>
      </button>
    </div>
  </div>
</template>
