<template>
  <p class="CommentBody" v-html="body"></p>
</template>

<script setup lang="ts">
import LinkifyIt from 'linkify-it';
import tlds from 'tlds';

const linkifyIt = new LinkifyIt();
linkifyIt.tlds(tlds);

function linkify(message: string): string {
  let m = message;
  const results = linkifyIt.match(m) || [];

  results.forEach((result: LinkifyIt.Match) => {
    const { text, url } = result;
    m = m.replace(text, `<a href="${url}">${text}</a>`);
  });

  return m;
}

function insertBreak(message: string): string {
  return message.replace(/\r?\n/g, '<br>');
}

const props = defineProps({
  message: {
    type: String,
    required: true
  }
});

const body = computed<string>(() => {
  let message = props.message;
  message = insertBreak(message);
  message = linkify(message);
  return message;
});
</script>

<style scoped>
.CommentBody {
  word-break: break-word;
  overflow-wrap: break-word;
}
</style>
