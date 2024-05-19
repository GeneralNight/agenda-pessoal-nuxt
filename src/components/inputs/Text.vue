<script lang="ts" setup>
import { MaskTypes } from "~~/models";
const props = defineProps<{
  modelValue: string;
  label: string;
  id: string;
  required: boolean;
  disabled: boolean;
  mask?: MaskTypes;
}>();

const emits = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const updateVal = (val: string) => {
  if (props.mask) {
    switch (props.mask) {
      case MaskTypes.CEP:
        emits("update:modelValue", maskCEP(val));
        break;
      case MaskTypes.CPF:
        emits("update:modelValue", maskCPF(val));
        break;
      case MaskTypes.CELULAR:
        emits("update:modelValue", maskCelular(val));
        break;
      case MaskTypes.TELEFONE:
        emits("update:modelValue", maskTelefone(val));
        break;
    }
    return;
  }
  emits("update:modelValue", val);
};
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
      type="text"
      class="defaultInput w-full"
      @input.prevent="updateVal(($event.target as HTMLInputElement).value)"
      :value="modelValue"
      :required="required"
      :id="id"
    />
  </div>
</template>
