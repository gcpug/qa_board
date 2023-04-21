<template>
  <li class="collection-item avatar">
    <CommentAvatar :src="photoUrl" />
    <div class="CommentHead">
      <span class="CommentHead__Title">{{ displayName }}</span>
      <slot />
    </div>
    <CommentBody :message="props.message" />
    <CommentDate :created-at="props.createdAt" />
    <CommentReactions :event-id="eventId" :message-id="messageId" />
    <ul class="collection" v-if="messageId === selectedMessageId">
      <ChildCommentForm :event-id="eventId" :target-id="messageId" />
    </ul>
    <ul class="collection" v-if="comments.length > 0">
      <ChildComment
        v-for="(comment, index) in comments"
        :key="index"
        :photo-url="comment.photoURL"
        :display-name="comment.displayName"
        :message="comment.message"
        :created-at="comment.createdAt"
        :event-id="props.eventId"
        :message-id="comment.id"
      />
    </ul>
  </li>
</template>

<script setup lang="ts">
import Message from '~/types/message';

const props = defineProps({
  eventId: {
    type: String,
    required: true
  },
  selectedMessageId: {
    type: String,
    required: false
  },
  messageId: {
    type: String,
    required: true
  },
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
  comments: {
    type: Array as () => Message[],
    required: false,
    default: []
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
