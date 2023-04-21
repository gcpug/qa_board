<template>
  <li class="collection-item avatar">
    <CommentAvatar :src="photoURL" />
    <div class="CommentHead">
      <span class="CommentHead__Title">{{ name }}</span>
      <label>
        <input
          type="checkbox"
          class="filled-in right"
          v-model="state.anonymous"
        />
        <span>Anonymous</span>
      </label>
    </div>
    <div class="input-field">
      <textarea id="message" class="materialize-textarea" v-model="state.message">
      </textarea>
      <label for="message">Message</label>
    </div>
    <div style="display: flex; justify-content: flex-end; padding-bottom: 8px;">
      <button
        class="waves-effect waves-light btn-small"
        :disabled="notSendable"
        @click="submit"
      >
        <i class="material-icons left">send</i>
        Submit
      </button>
    </div>
  </li>
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
  },
  targetId: {
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
    to: props.targetId
  });

  state.message = '';
  state.anonymous = false;
}
</script>

<style scoped>
.CommentHead {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin: 8px 0;
}
</style>
