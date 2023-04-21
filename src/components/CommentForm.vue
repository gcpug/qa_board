<template>
  <div class="row">
    <form class="col s12" @submit.prevent="submit">
      <div class="row">
        <div class="col s12" style="display: flex; align-items: center; justify-content: space-between;">
          <FormAvatar :name="name" :photoURL="photoURL" />
          <label>
            <input type="checkbox" class="filled-in" v-model="state.anonymous" />
            <span>Anonymous (administrator can see your name)</span>
          </label>
        </div>
        <div class="input-field col s12">
          <textarea id="message" class="materialize-textarea" v-model="state.message">
          </textarea>
          <label for="message">Message</label>
        </div>
        <p class="col s12">
          <button
            class="waves-effect waves-light btn right"
            :disabled="notSendable"
          >
            <i class="material-icons left">send</i>
            submit
          </button>
        </p>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import {useAuthStore} from '~/store/auth';
import {useEventStore} from '~/store/event';

const authStore = useAuthStore();
const eventStore = useEventStore();

const props = defineProps({
  eventId: {
    type: String,
    required: true
  }
});

const state = reactive<{
  anonymous: boolean;
  message: string;
}>({
  anonymous: false,
  message: ''
});

const notSendable = computed<boolean>(() => {
  return !state.message;
});

const name = computed<string>(() => {
  return state.anonymous ? 'Anonymous' : authStore.user?.displayName ?? '';
});

const photoURL = computed<string>(() => {
  return state.anonymous ? '/images/anonymous.png' : authStore.user?.photoURL ?? '';
});

async function submit() {
  if (authStore.user === null) {
    return;
  }

  await eventStore.createMessage({
    user: authStore.user,
    anonymous: state.anonymous,
    eventId: props.eventId,
    message: state.message,
    to: null
  });

  state.message = '';
  state.anonymous = false;
}
</script>

<style>
.CommentAvatarContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.CommentAvatarContainer img {
  width: 42px;
}
</style>
