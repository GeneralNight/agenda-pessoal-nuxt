<script lang="ts" setup></script>

<template>
  <div class="flex w-full h-full">
    <Sidebar />
    <div class="p-10 w-full overflow-y-scroll h-screen hide-scrollbar">
      <slot />
    </div>
  </div>
</template>
