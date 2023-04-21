<template>
  <div class="row">
    <div class="col s12 m12 l6">
      <h5>Questions</h5>
      <ul class="collection">
        <ParentComment
          v-for="(message, index) in undones"
          :key="index"
          :event-id="eventId"
          :selected-message-id="state.selectedMessageId"
          :message-id="message.id"
          :photo-url="message.photoURL"
          :display-name="message.displayName"
          :message="message.message"
          :created-at="message.createdAt"
          :comments="getChildComments(message.id)"
        >
          <div>
            <button
              class="waves-effect waves-light btn-small"
              @click="selectComment(message.id)"
            >
              Comment
            </button>
            <span style="margin-left: 8px;"></span>
            <button
              class="waves-effect waves-light btn-small"
              @click="doneComment(message.id)"
            >
              Done
            </button>
          </div>
        </ParentComment>
      </ul>
      <div v-if="undones.length === 0">
        no questions
      </div>
    </div>
    <div class="col s12 m12 l6">
      <h5>Answered questions</h5>
      <ul class="collection">
        <ParentComment
          v-for="(message, index) in dones"
          :key="index"
          :event-id="eventId"
          :selected-message-id="state.selectedMessageId"
          :message-id="message.id"
          :photo-url="message.photoURL"
          :display-name="message.displayName"
          :message="message.message"
          :created-at="message.createdAt"
          :comments="getChildComments(message.id)"
        >
          <div>
            <button
              class="waves-effect waves-light btn-small"
              @click="selectComment(message.id)"
            >
              Comment
            </button>
            <span style="margin-left: 8px;"></span>
            <button
              class="waves-effect waves-light btn-small"
              @click="undoneComment(message.id)"
            >
              Undone
            </button>
          </div>
        </ParentComment>
      </ul>
      <div v-if="dones.length === 0">
        no answered questions
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Message from '~/types/message';
import {useEventStore} from '~/store/event';

const eventStore = useEventStore();

const props = defineProps({
  eventId: {
    type: String,
    required: true
  },
  messages: {
    type: Array as () => Message[],
    required: true
  }
});

const state = reactive<{
  selectedMessageId: string;
}>({
  selectedMessageId: ''
});

const questions = computed<Message[]>(() => {
  return props.messages.filter(m => !m.to).sort((m1, m2) => {
    return m1.createdAt.getTime() - m2.createdAt.getTime();
  });
});

const comments = computed<Message[]>(() => {
  return props.messages.filter(m => m.to).sort((m1, m2) => {
    return m1.createdAt.getTime() - m2.createdAt.getTime();
  });
});

const undones = computed<Message[]>(() => {
  return questions.value.filter(m => !m.done);
});

const dones = computed<Message[]>(() => {
  return questions.value.filter(m => m.done);
});

function getChildComments(messageId: string) {
  return comments.value.filter(m => m.to === messageId);
}

function selectComment(messageId: string) {
  state.selectedMessageId = messageId;
}

async function doneComment(messageId: string) {
  await eventStore.updateMessage({
    messageId,
    done: true
  });
}

async function undoneComment(messageId: string) {
  await eventStore.updateMessage({
    messageId,
    done: false
  });
}
</script>
