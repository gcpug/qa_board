<template>
  <p class="CommentDate">
    <time>{{ formattedDate }}</time>
  </p>
</template>

<script setup lang="ts">
const props = defineProps({
  createdAt: {
    type: Date,
    required: true
  }
});

const formattedDate = computed<string>(() => {
  return props.createdAt.toLocaleString();
});
</script>

<style scoped>
.CommentDate {
  text-align: right;
  font-size: 12px;
}
</style>
