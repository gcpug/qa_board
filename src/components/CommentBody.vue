<template>
  <p class="CommentBody" v-html="body"></p>
</template>

<script setup lang="ts">
import {marked} from 'marked';
import type {MarkedOptions} from 'marked';
import * as sanitizeHtml from 'sanitize-html';

const props = defineProps({
  message: {
    type: String,
    required: true
  }
});

const sanitizeOptions: sanitizeHtml.IOptions = {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat(['del'])
};

const markedOptions: MarkedOptions = {
  gfm: true
};

const body = computed<string>(() => {
  const html = marked.parse(props.message, markedOptions);
  const sanitized = sanitizeHtml(html, sanitizeOptions);

  return sanitized;
});
</script>

<style scoped>
.CommentBody {
  word-break: break-word;
  overflow-wrap: break-word;
}
</style>
