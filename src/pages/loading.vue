<script lang="ts" setup></script>

<template>
  <div class="flex items-center justify-center p-4 w-screen h-screen">
    <div class="flex flex-col gap-4 items-center">
      <Loading :size="'h-6 w-6'" :color="'text-custom-black'" />
      <span class="text-custom-black font-semibold text-lg"
        >Autenticando...</span
      >
    </div>
  </div>
</template>
