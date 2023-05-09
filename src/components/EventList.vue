<template>
  <div class="row">
    <div class="input-field col s6">
      <input type="date" ref="from" @change="e => state.from = (e.target as HTMLInputElement).valueAsNumber" />
      <label>From</label>
    </div>
    <div class="input-field col s6">
      <input type="date" ref="to" @change="e => state.to = (e.target as HTMLInputElement).valueAsNumber" />
      <label>To</label>
    </div>
    <div class="col s12">
      <h5>Q&A</h5>
      <div class="collection">
        <nuxt-link
          :to="`/events/${event.id}`"
          class="collection-item"
          v-for="(event, index) in filteredEvents"
          :key="index"
        >
          {{ event.eventName }}
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type Event from '~/types/event';

const props = defineProps({
  events: {
    type: Array as () => Event[],
    default: []
  }
});

const now = Date.now();
const month = 30 * 24 * 60 * 60 * 1000;

const state = reactive({
  from: now - 3 * month,
  to: now
});

const filteredEvents = computed<Event[]>(() => {
  return props.events.filter(event => {
    if (event.createdAt < state.from) {
      return false;
    } else if (state.to < event.createdAt) {
      return false;
    }

    return event;
  })
});

function formatDate(date: Date) {
  const year = String(date.getFullYear()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

const from = ref<HTMLInputElement | null>(null);
const to = ref<HTMLInputElement | null>(null);
onMounted(() => {
  if (from.value) {
    from.value.value = formatDate(new Date(state.from));
  }

  if (to.value) {
    to.value.value = formatDate(new Date(state.to));
  }
});
</script>
