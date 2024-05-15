<script lang="ts" setup>
const props = defineProps<{
  size: string;
  color: string;
}>();
</script>

<template>
  <div
    class="border-[6px] rounded-full border-r-transparent animate-spin"
    :class="[size, color]"
  ></div>
</template>
