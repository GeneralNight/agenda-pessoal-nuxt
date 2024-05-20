<script lang="ts" setup>
import { type Person } from "~~/models";

definePageMeta({
  layout: "dashboard",
  middleware: "logged-in",
});

const peopleStore = usePeopleStore();
const authStore = useAuthStore();
const {
  loadingPeople,
  errorLoadPeople,
  people,
  errorRemovePeople,
  removingPeople,
} = storeToRefs(peopleStore);

const showNewPersonModal = ref(false);
const query = ref("");
const editPersonProfile = ref<Person | undefined>();
const removePersonProfile = ref<Person | undefined>();

const loadPeople = async () => {
  showNewPersonModal.value = false;
  editPersonProfile.value = undefined;
  await peopleStore.loadPeople(query.value);
};

const removePerson = async () => {
  if (!removePersonProfile.value) {
    return;
  }
  await peopleStore.removePerson(removePersonProfile.value);
  if (!errorLoadPeople.value) {
    removePersonProfile.value = undefined;
  }
};

const confirmRemoveText = computed(() => {
  return `Deseja mesmo remover a pessoa ${
    removePersonProfile.value?.nome ?? ""
  }?`;
});

const clear = () => {
  query.value = "";
  loadPeople();
};

watch(
  query,
  useDebounceFn(() => {
    loadPeople();
  }, 1500)
);

onMounted(() => {
  loadPeople();
});
</script>

<template>
  <div class="flex flex-col w-full gap-10">
    <div class="flex flex-col gap-2">
      <span class="text-xl font-semibold border-custom-black"> Pessoas </span>
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
          @click="showNewPersonModal = true"
          class="text-white bg-custom-black px-4 py-2.5 rounded-lg transition-all duration-[.2s] hover:bg-custom-blue flex items-center gap-2"
        >
          <i class="fi fi-rr-plus flex"></i>
          <span>Novo</span>
        </button>
      </div>
    </div>
    <div class="flex flex-col items-center gap-2" v-if="loadingPeople">
      <Loading :color="'text-custom-black'" :size="'h-6 w-6'" />
      <span class="text-xl font-semibold"> Carregando pessoas... </span>
    </div>
    <div class="flex flex-col" v-else>
      <div class="flex flex-col gap-2 items-center" v-if="errorLoadPeople">
        <i class="fi fi-ss-not-found text-xl flex"></i>
        <span class="text-xl font-semibold"> Erro ao carregar pessoas </span>
      </div>
      <div class="flex flex-col" v-else>
        <div class="flex flex-col gap-2 items-center" v-if="!people.length">
          <i class="fi fi-br-404 text-xl flex"></i>
          <span class="text-xl font-semibold"> Nenhuma pessoa encontrada </span>
        </div>
        <div
          class="flex flex-col w-full border border-custom-black/50 rounded-lg bg-white"
          v-else
        >
          <PersonRow
            v-for="(person, index) in people"
            :class="{
              'border-b border-custom-black/50': index < people.length - 1,
            }"
            :person="person"
            @edit="editPersonProfile = person"
            @remove="removePersonProfile = person"
          />
        </div>
      </div>
    </div>
    <Transition name="slide-anchor-left">
      <ModalNewPerson
        v-if="showNewPersonModal"
        @close="showNewPersonModal = false"
        @refresh="loadPeople()"
      />
    </Transition>
    <Transition name="slide-anchor-left">
      <ModalEditPerson
        v-if="editPersonProfile"
        @close="editPersonProfile = undefined"
        @refresh="loadPeople()"
        :person="editPersonProfile"
      />
    </Transition>
    <Transition name="slide-anchor-left">
      <ModalConfirmRemove
        v-if="removePersonProfile"
        @close="removePersonProfile = undefined"
        @confirm="removePerson"
        :text="confirmRemoveText"
        :removing="removingPeople"
      />
    </Transition>
  </div>
</template>
