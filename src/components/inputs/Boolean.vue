<script lang="ts" setup>
const props = defineProps<{
  modelValue: boolean;
  label: string;
  id: string;
  disabled: boolean;
}>();
</script>

<template>
  <div class="flex items-center gap-2">
    <input
      type="checkbox"
      class=""
      @change.prevent="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
      :value="modelValue"
      :id="id"
    />
    <label :for="id">{{ label }}</label>
  </div>
</template>
