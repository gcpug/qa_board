<template>
  <img :src="props.src" :alt="props.alt" class="circle" />
</template>

<script setup lang="ts">
const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    required: false,
    default: ''
  }
});
</script>

<style scoped>
img.circle {
  object-fit: cover;
}
</style>
