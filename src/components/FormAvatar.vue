<template>
  <div class="FormAvatar">
    <CommentAvatar :src="props.photoURL" :alt="props.name" />
    <span>{{ props.name }}</span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  photoURL: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
});
</script>

<style scoped>
.FormAvatar {
  display: flex;
  align-items: center;
}

.FormAvatar img {
  width: 42px;
}

.FormAvatar span {
  margin-left: 16px;
}
</style>
