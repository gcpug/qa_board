<template>
  <div class="row">
    <form class="col s12" @submit.prevent="submit">
      <div class="row">
        <div class="col s12" style="display: flex; align-items: center; justify-content: space-between;">
          <FormAvatar :name="name" :photoURL="photoURL" />
        </div>
        <div class="input-field col s12">
          <input id="eventName" type="text" v-model="state.eventName" />
          <label for="eventName">Event Name</label>
        </div>
      </div>
      <button
        class="waves-effect waves-light btn right"
        :disabled="notSendable"
      >
        <i class="material-icons left">add</i>
        submit
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import {useAuthStore} from '~/store/auth';
import {useEventsStore} from '~/store/events';

const authStore = useAuthStore();
const eventsStore = useEventsStore();
eventsStore.setup(authStore.firestore);

const state = reactive<{
  eventName: string
}>({
  eventName: ''
});

const notSendable = computed<boolean>(() => {
  return !state.eventName;
});

const name = computed<string>(() => {
  return authStore.user?.displayName ?? '';
});

const photoURL = computed<string>(() => {
  return authStore.user?.photoURL ?? '';
});

async function submit() {
  if (authStore.user === null) {
    return;
  }

  await eventsStore.submitEvent({
    user: authStore.user,
    eventName: state.eventName
  });

  state.eventName = '';
}
</script>
