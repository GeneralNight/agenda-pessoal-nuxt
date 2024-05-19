<script lang="ts" setup>
import type { Person } from "~~/models";

const emits = defineEmits<{
  (e: "edit"): void;
  (e: "remove"): void;
}>();

const props = defineProps<{
  person: Person;
}>();

const profilePicture = ref("");

onMounted(async () => {
  profilePicture.value = `https://ui-avatars.com/api/?name=${
    props.person.nome.replace(/\s/g, "%20") ?? ""
  }&background=random`;
  if (props.person.id) {
    profilePicture.value = URL.createObjectURL(
      await api.getPhoto(`${props.person.id}`)
    );
  }
});
</script>

<template>
  <div class="flex items-center justify-between px-4 py-6">
    <div class="flex items-center gap-3">
      <div
        class="w-12 h-12 min-w-12 rounded-full bg-cover bg-center bg-no-repeat border border-custom-black/50"
        :style="{
          'background-image': 'url(' + profilePicture + ')',
        }"
      ></div>
      <span class="font-semibold">{{ person.nome }}</span>
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
