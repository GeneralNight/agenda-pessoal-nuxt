<script lang="ts" setup>
import type { Profile } from "~~/models";

const props = defineProps<{
  user: Profile;
}>();
</script>

<template>
  <div class="flex items-center justify-between px-4 py-6">
    <span class="font-semibold">{{ user.nome }}</span>
    <button class="defaultButton flex items-center gap-2">
      <i class="fi fi-ss-pencil flex"></i>
      <span> Editar </span>
    </button>
  </div>
</template>
