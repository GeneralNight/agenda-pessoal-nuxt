<script lang="ts" setup>
const props = defineProps<{
  modelValue: Date;
  label: string;
  id: string;
  required: boolean;
  disabled: boolean;
}>();

defineEmits<{ (e: "update:modelValue", value: string): void }>();
</script>

<template>
  <div class="flex flex-col gap-1">
    <label
      :for="id"
      class="text-sm text-custom-black-100 font-semibold"
      v-if="label.length"
    >
      {{ label }}
    </label>
    <input
      type="date"
      class="defaultInput w-full"
      @input.prevent="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
      :value="modelValue"
      :required="required"
      :id="id"
    />
  </div>
</template>
