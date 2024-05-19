<script lang="ts" setup>
const emits = defineEmits<{
  (e: "close"): void;
}>();

const props = defineProps<{
  action: "change-password" | "change-username";
}>();

const authStore = useAuthStore();
const { logging, errorLogin, profile, savingProfile } = storeToRefs(authStore);

const valid = ref(false);

const info = ref({
  username: "",
  password: "",
});

const newInfo = ref({
  value1: "",
  value2: "",
});

const close = () => {
  if (logging.value || savingProfile.value) return;
  emits("close");
};

const validateLogin = async () => {
  if (authStore.username !== info.value.username) {
    errorLogin.value = true;
    return;
  }
  await authStore.login(info.value, true);
  if (!errorLogin.value) {
    valid.value = true;
  }
};

const modalTitle = computed(() => {
  return !valid.value
    ? "Valide suas credenciais"
    : props.action === "change-password"
    ? "Preencha sua nova senha"
    : "Preencha seu novo username";
});

const handleAction = async () => {
  if (profile?.value && newInfo.value.value1 === newInfo.value.value2) {
    props.action === "change-username"
      ? await authStore.saveProfile({
          ...profile?.value,
          username: newInfo.value.value1,
        })
      : await authStore.saveProfile({
          ...profile?.value,
          password: newInfo.value.value1,
        });
    emits("close");
  }
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
        <span class="text-xl font-bold">{{ modalTitle }}</span>
        <button @click="close">
          <i class="fi fi-br-cross flex"></i>
        </button>
      </div>
      <form
        v-if="!valid"
        class="grid grid-cols-2 gap-8 p-6"
        @submit.prevent="validateLogin()"
      >
        <div class="col-span-2 flex flex-col gap-1">
          <InputsText
            v-model="info.username"
            :label="'Username'"
            :id="'info.username'"
            :required="true"
            :disabled="false"
          />
        </div>
        <div class="col-span-2 flex flex-col gap-1">
          <InputsPassword
            v-model="info.password"
            :label="'Senha'"
            :id="'info.password'"
            :required="true"
            :disabled="false"
          />
        </div>
        <div
          class="col-span-2 flex justify-end gap-4"
          :class="{
            'pointer-events-none opacity-50 cursor-not-allowed': logging,
          }"
        >
          <button
            class="defaultButton secondary"
            type="button"
            @click="close()"
            :disabled="logging"
          >
            Cancelar
          </button>
          <button class="defaultButton" type="submit" :disabled="logging">
            Validar
          </button>
        </div>
      </form>
      <form
        v-else
        class="grid grid-cols-2 gap-8 p-6"
        @submit.prevent="handleAction()"
      >
        <div class="col-span-2 flex flex-col gap-1">
          <InputsText
            v-model="newInfo.value1"
            :label="action === 'change-username' ? 'Username' : 'Password'"
            :id="'newInfo.value1'"
            :required="true"
            :disabled="false"
          />
        </div>
        <div class="col-span-2 flex flex-col gap-1">
          <InputsPassword
            v-model="newInfo.value2"
            :label="
              action === 'change-username'
                ? 'Confirme Username'
                : 'Confirme Password'
            "
            :id="'newInfo.value2'"
            :required="true"
            :disabled="false"
          />
        </div>
        <div
          class="col-span-2 flex justify-end gap-4"
          :class="{
            'pointer-events-none opacity-50 cursor-not-allowed':
              logging || savingProfile,
          }"
        >
          <button
            class="defaultButton secondary"
            type="button"
            @click="close()"
            :disabled="logging || savingProfile"
          >
            Cancelar
          </button>
          <button
            class="defaultButton"
            type="submit"
            :disabled="logging || savingProfile"
          >
            {{ !valid ? "Validar" : "Salvar" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
