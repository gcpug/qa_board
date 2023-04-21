<template>
  <p class="CommentBody" v-html="body"></p>
</template>

<script setup lang="ts">
import {marked} from 'marked';
import sanitizeHtml from 'sanitize-html';

const props = defineProps({
  message: {
    type: String,
    required: true
  }
});

const body = computed<string>(() => {
  return sanitizeHtml(marked.parse(props.message));
});
</script>

<style scoped>
.CommentBody {
  word-break: break-word;
  overflow-wrap: break-word;
}
</style>
