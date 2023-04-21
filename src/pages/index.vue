<template>
  <main class="container">
    <div class="row">
      <h4>Q&A system</h4>
    </div>
    <EventForm />
    <EventList :events="eventsStore.events" />
  </main>
</template>

<script setup lang="ts">
import {useAuthStore} from '~/store/auth';
import {useEventsStore} from '~/store/events';

const authStore = useAuthStore();
const eventsStore = useEventsStore();

eventsStore.setup(authStore.firestore);
await eventsStore.fetchEvents();
</script>
