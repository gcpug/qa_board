<template>
  <main class="container">
    <div class="row">
      <h4 class="col s12">{{ eventStore.eventName }}</h4>
    </div>
    <CommentForm
      :photoUrl="authStore.user?.photoURL ?? ''"
      :displayName="authStore.user?.displayName ?? ''"
      :eventId="eventStore.eventId"
    />
    <CommentList
      :eventId="eventStore.eventId"
      :messages="eventStore.messages"
    />
  </main>
</template>

<script setup lang="ts">
import {useAuthStore} from '~/store/auth';
import {useEventStore} from '~/store/event';
import {useReactionsStore} from '~/store/reactions';

const route = useRoute();
const eventId = route.params.eventId as string;

const authStore = useAuthStore();
const eventStore = useEventStore();
const reactionsStore = useReactionsStore();
eventStore.setup(authStore.firestore);
reactionsStore.setup(authStore.firestore);

await eventStore.fetchEvent({eventId});
await eventStore.fetchMessages({eventId});
await reactionsStore.fetchReactions({eventId});
</script>
