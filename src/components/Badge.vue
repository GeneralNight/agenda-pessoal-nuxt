<script lang="ts" setup>
import { BadgeVariant } from "~~/models";
const props = defineProps<{
  text: string;
  variant: BadgeVariant;
}>();
</script>

<template>
  <div
    class="flex items-center gap-4 w-full px-4 py-2.5 rounded-lg font-medium"
    :style="[variant]"
  >
    <i class="fi fi-rr-info flex"></i>

    <span>
      {{ text }}
    </span>
  </div>
</template>
