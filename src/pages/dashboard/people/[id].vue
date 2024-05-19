<script lang="ts" setup>
import type { Contact } from "~~/models";

definePageMeta({
  layout: "dashboard",
});
const peopleStore = usePeopleStore();
const { currentPersonContact } = storeToRefs(peopleStore);
const contactStore = useContactStore();
const { loadingContacts, errorLoadContacts, contacts, removingContact } =
  storeToRefs(contactStore);

const profilePicture = ref("");
const query = ref("");
const editContactProfile = ref<Contact | undefined>();
const removeContactProfile = ref<Contact | undefined>();
const showNewContactModal = ref(false);

const loadContacts = async () => {
  showNewContactModal.value = false;
  editContactProfile.value = undefined;
  removeContactProfile.value = undefined;
  await contactStore.loadPersonContacts(useRoute().params.id as string);
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

const confirmRemoveText = computed(() => {
  return `Deseja mesmo remover este contato?`;
});

onMounted(async () => {
  profilePicture.value = `https://ui-avatars.com/api/?name=${
    currentPersonContact?.value?.nome.replace(/\s/g, "%20") ?? ""
  }&background=random`;
  if (currentPersonContact?.value?.id) {
    profilePicture.value = URL.createObjectURL(
      await api.getPhoto(`${currentPersonContact?.value?.id}`)
    );
  }
  await loadContacts();
});
</script>

<template>
  <div class="flex flex-col gap-10">
    <div class="flex items-end justify-between gap-10">
      <span class="text-xl font-semibold border-custom-black">
        Contatos de {{ currentPersonContact?.nome }}
      </span>
      <button
        @click="showNewContactModal = true"
        class="text-white bg-custom-black px-4 py-2.5 rounded-lg transition-all duration-[.2s] hover:bg-custom-blue flex items-center gap-2"
      >
        <i class="fi fi-rr-plus flex"></i>
        <span>Novo</span>
      </button>
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
      <div class="flex flex-col" v-else>
        <div class="flex flex-col gap-2 items-center" v-if="!contacts.length">
          <i class="fi fi-br-404 text-xl flex"></i>
          <span class="text-xl font-semibold"> Nenhum contato encontrado </span>
        </div>
        <div
          class="flex flex-col w-full border border-custom-black/50 rounded-lg bg-white"
          v-else
        >
          <ContactRow
            v-for="(contact, index) in contacts"
            :class="{
              'border-b border-custom-black/50': index < contacts.length - 1,
            }"
            :contact="contact"
            @edit="editContactProfile = contact"
            @remove="removeContactProfile = contact"
          />
        </div>
      </div>
    </div>
    <Transition name="slide-anchor-left">
      <ModalNewPersonContact
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
