<template>
  <div class="row">
    <div class="col s12">
      <h5>Q&A</h5>
      <div class="collection">
        <nuxt-link
          :to="`/events/${event.id}`"
          class="collection-item"
          v-for="(event, index) in props.events"
          :key="index"
        >
          {{ event.eventName }}
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Event from '~/types/event';

const props = defineProps({
  events: {
    type: Array as () => Event[],
    default: []
  }
});
</script>
