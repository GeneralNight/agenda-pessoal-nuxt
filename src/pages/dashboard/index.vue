<script lang="ts" setup>
import type { Contact } from "~~/models";

definePageMeta({
  layout: "dashboard",
});

const contactStore = useContactStore();

const {
  loadingContacts,
  errorLoadContacts,
  contacts,
  errorRemoveContact,
  removingContact,
  favorites,
} = storeToRefs(contactStore);

const showNewContactModal = ref(false);
const query = ref("");
const editContactProfile = ref<Contact | undefined>();
const removeContactProfile = ref<Contact | undefined>();

const loadContacts = async () => {
  showNewContactModal.value = false;
  editContactProfile.value = undefined;
  removeContactProfile.value = undefined;
  await contactStore.loadContacts(query.value);
};

const removeContact = async () => {
  if (!removeContactProfile.value) {
    return;
  }
  const res = await contactStore.removeContact(removeContactProfile.value);
  if (res === "success") {
    loadContacts();
  }
};

const confirmRemoveText = computed(() => {
  return `Deseja mesmo remover este contato?`;
});

const clear = () => {
  query.value = "";
  loadContacts();
};

watch(
  query,
  useDebounceFn(() => {
    loadContacts();
  }, 1500)
);

const nonFavorites = computed(() => {
  return contacts.value.filter(
    (contact) => !favorites.value.find((fav) => fav.id === contact.id)
  );
});

onMounted(() => {
  loadContacts();
});
</script>

<template>
  <div class="flex flex-col w-full gap-10">
    <div class="flex flex-col gap-2">
      <span class="text-xl font-semibold border-custom-black"> Contatos </span>
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
          @click="showNewContactModal = true"
          class="text-white bg-custom-black px-4 py-2.5 rounded-lg transition-all duration-[.2s] hover:bg-custom-blue flex items-center gap-2"
        >
          <i class="fi fi-rr-plus flex"></i>
          <span>Novo</span>
        </button>
      </div>
    </div>
    <div class="flex flex-col items-center gap-2" v-if="loadingContacts">
      <Loading :color="'text-custom-black'" :size="'h-6 w-6'" />
      <span class="text-xl font-semibold"> Carregando contatos... </span>
    </div>
    <div class="flex flex-col" v-else>
      <div class="flex flex-col gap-2 items-center" v-if="errorLoadContacts">
        <i class="fi fi-ss-not-found text-xl flex"></i>
        <span class="text-xl font-semibold"> Erro ao carregar contatos </span>
      </div>
      <div class="flex flex-col gap-10" v-else>
        <div class="flex flex-col gap-6">
          <span class="text-xl font-semibold border-custom-black">
            Favoritos
          </span>
          <div
            class="flex flex-col gap-2 items-center"
            v-if="!favorites.length"
          >
            <i class="fi fi-br-404 text-xl flex"></i>
            <span class="text-xl font-semibold"> Nenhum contato favorito </span>
          </div>
          <div
            class="flex flex-col w-full border border-custom-black/50 rounded-lg bg-white"
            v-else
          >
            <ContactRow
              v-for="(contact, index) in favorites"
              :class="{
                'border-b border-custom-black/50': index < favorites.length - 1,
              }"
              :contact="contact"
              @edit="editContactProfile = contact"
              @remove="removeContactProfile = contact"
            />
          </div>
        </div>
        <!-- NON FAVORITES -->
        <div class="flex flex-col gap-6">
          <span class="text-xl font-semibold border-custom-black">
            Contatos
          </span>
          <div
            class="flex flex-col gap-2 items-center"
            v-if="!nonFavorites.length"
          >
            <i class="fi fi-br-404 text-xl flex"></i>
            <span class="text-xl font-semibold">
              Nenhum contato encontrado
            </span>
          </div>
          <div
            class="flex flex-col w-full border border-custom-black/50 rounded-lg bg-white"
            v-else
          >
            <ContactRow
              v-for="(contact, index) in nonFavorites"
              :class="{
                'border-b border-custom-black/50':
                  index < nonFavorites.length - 1,
              }"
              :contact="contact"
              @edit="editContactProfile = contact"
              @remove="removeContactProfile = contact"
            />
          </div>
        </div>
      </div>
    </div>
    <Transition name="slide-anchor-left">
      <ModalNewContact
        v-if="showNewContactModal"
        @close="showNewContactModal = false"
        @refresh="loadContacts()"
      />
    </Transition>
    <Transition name="slide-anchor-left">
      <ModalEditContact
        v-if="editContactProfile"
        @close="editContactProfile = undefined"
        @refresh="loadContacts()"
        :contact="editContactProfile"
      />
    </Transition>
    <Transition name="slide-anchor-left">
      <ModalConfirmRemove
        v-if="removeContactProfile"
        @close="removeContactProfile = undefined"
        @confirm="removeContact"
        :text="confirmRemoveText"
        :removing="removingContact"
      />
    </Transition>
  </div>
</template>
