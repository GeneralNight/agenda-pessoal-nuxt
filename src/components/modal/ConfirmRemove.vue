<script lang="ts" setup>
const emits = defineEmits<{
  (e: "close"): void;
  (e: "confirm"): void;
}>();

const props = defineProps<{
  removing: boolean;
  text: string;
}>();

const close = () => {
  if (props.removing) return;
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
        <span class="text-xl font-bold">Confirmar exclusão</span>
        <button @click="close">
          <i class="fi fi-br-cross flex"></i>
        </button>
      </div>
      <div class="flex flex-col p-6 gap-8">
        <span class="text-custom-black text-lg">{{ text }}</span>

        <div
          class="flex justify-end gap-4 w-full"
          :class="{
            'pointer-events-none opacity-50 cursor-not-allowed': removing,
          }"
        >
          <button
            class="defaultButton secondary"
            type="button"
            @click="close"
            :disabled="removing"
          >
            Cancelar
          </button>
          <button
            class="defaultButton"
            type="submit"
            @click="emits('confirm')"
            :disabled="removing"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
