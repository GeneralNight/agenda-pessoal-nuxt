<script lang="ts" setup>
import { RoleTypes } from "~~/models";

definePageMeta({
  layout: "dashboard",
});

const userStore = useUserStore();
const authStore = useAuthStore();
const { loadingUsers, errorLoadUsers, users } = storeToRefs(userStore);
const { roles } = storeToRefs(authStore);

const showNewUserModal = ref(false);
const query = ref("");
const editUserProfile = ref();

const loadUsers = async () => {
  showNewUserModal.value = false;
  editUserProfile.value = undefined;
  await userStore.loadUsers(query.value);
};

const clear = () => {
  query.value = "";
  loadUsers();
};

watch(
  query,
  useDebounceFn(() => {
    loadUsers();
  }, 1500)
);

onMounted(() => {
  loadUsers();
});

onBeforeMount(() => {
  if (!roles.value.includes(RoleTypes.ADMIN)) {
    useRouter().push("/dashboard");
  }
});
</script>

<template>
  <div class="flex flex-col w-full gap-10">
    <div class="flex flex-col gap-2">
      <span class="text-xl font-semibold border-custom-black"> Usuários </span>
      <div class="flex items-end justify-between gap-10">
        <div class="col-span flex flex-col gap-1 w-full">
          <label
            for="profile.nome"
            class="text-sm text-custom-black-100 font-semibold"
          >
            Termo da pesquisa
          </label>
          <div class="flex items-center gap-2">
            <input type="text" class="defaultInput w-full" v-model="query" />
            <button @click="clear" v-if="query.length">
              <i class="fi fi-br-cross flex"></i>
            </button>
          </div>
        </div>
        <button
          @click="showNewUserModal = true"
          class="text-white bg-custom-black px-4 py-2.5 rounded-lg transition-all duration-[.2s] hover:bg-custom-blue flex items-center gap-2"
        >
          <i class="fi fi-rr-plus flex"></i>
          <span>Novo</span>
        </button>
      </div>
    </div>
    <div class="flex flex-col items-center gap-2" v-if="loadingUsers">
      <Loading :color="'text-custom-black'" :size="'h-6 w-6'" />
      <span class="text-xl font-semibold"> Carregando usuários... </span>
    </div>
    <div class="flex flex-col" v-else>
      <div class="flex flex-col gap-2 items-center" v-if="errorLoadUsers">
        <i class="fi fi-ss-not-found text-xl flex"></i>
        <span class="text-xl font-semibold"> Erro ao carregar usuários </span>
      </div>
      <div class="flex flex-col" v-else>
        <div class="flex flex-col gap-2 items-center" v-if="!users.length">
          <i class="fi fi-br-404 text-xl flex"></i>
          <span class="text-xl font-semibold"> Nenhum usuário encontrado </span>
        </div>
        <div
          class="flex flex-col w-full border border-custom-black/50 rounded-lg bg-white"
          v-else
        >
          <UserRow
            v-for="(user, index) in users"
            :class="{
              'border-b border-custom-black/50': index < users.length - 1,
            }"
            :user="user"
            @edit="editUserProfile = user"
          />
        </div>
      </div>
    </div>
    <Transition name="slide-anchor-left">
      <ModalNewUser
        v-if="showNewUserModal"
        @close="showNewUserModal = false"
        @refresh="loadUsers()"
      />
    </Transition>
    <Transition name="slide-anchor-left">
      <ModalEditUser
        v-if="editUserProfile"
        @close="editUserProfile = undefined"
        @refresh="loadUsers()"
        :user="editUserProfile"
      />
    </Transition>
  </div>
</template>
