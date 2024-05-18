<script lang="ts" setup>
import type { Person } from "~~/models";

const emits = defineEmits<{
  (e: "close"): void;
  (e: "refresh"): void;
}>();

const props = defineProps<{
  person: Person;
}>();

const peopleStore = usePeopleStore();
const { savingPeople, errorSavePeople } = storeToRefs(peopleStore);

const close = () => {
  if (savingPeople.value) return;
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
        <span class="text-xl font-bold">Editar pessoa</span>
        <button @click="close">
          <i class="fi fi-br-cross flex"></i>
        </button>
      </div>
    </div>
  </div>
</template>
