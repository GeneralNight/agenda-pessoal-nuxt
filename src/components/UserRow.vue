<script lang="ts" setup>
import type { Profile } from "~~/models";

const emits = defineEmits<{
  (e: "edit"): void;
}>();

const props = defineProps<{
  user: Profile;
}>();
</script>

<template>
  <div class="flex items-center justify-between px-4 py-6 flex-wrap gap-3">
    <span class="font-semibold">{{ user.nome }}</span>
    <button
      class="defaultButton flex items-center gap-2"
      @click="emits('edit')"
    >
      <i class="fi fi-ss-pencil flex"></i>
      <span> Editar </span>
    </button>
  </div>
</template>
