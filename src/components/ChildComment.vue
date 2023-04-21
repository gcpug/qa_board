<template>
  <li class="collection-item avatar">
    <CommentAvatar :src="props.photoUrl" :alt="props.displayName" />
    <div class="CommentHead">
      <span class="CommentHead__Title">{{ props.displayName }}</span>
    </div>
    <CommentBody :message="props.message" />
    <CommentDate :created-at="props.createdAt" />
    <CommentReactions :event-id="props.eventId" :message-id="props.messageId" />
  </li>
</template>

<script setup lang="ts">
const props = defineProps({
  photoUrl: {
    type: String,
    required: true
  },
  displayName: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true
  },
  eventId: {
    type: String,
    required: true
  },
  messageId: {
    type: String,
    required: true
  }
});
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
