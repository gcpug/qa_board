<template>
  <button
    :class="['CommentReactionIcon', { 'emoji-pressed': pressed }]"
    @click="$emit('click-emoji', emojiCode)"
    ref="tooltip"
    data-position="bottom"
    :data-tooltip="toolTipText"
  >
    {{ emoji }} {{ reactions.length }}
  </button>
</template>

<script setup lang="ts">
import Reaction from '~/types/reaction';

const props = defineProps({
  pressed: {
    type: Boolean,
    required: true
  },
  emojiCode: {
    type: String,
    required: true
  },
  emoji: {
    type: String,
    required: true
  },
  reactions: {
    type: Array as () => Reaction[],
    required: true
  }
});

const toolTipText = computed<string>(() => {
  const names = props.reactions.map(r => r.authorDisplayName);
  const limit = 5;

  return names.length <= limit
    ? names.join(' ')
    : names.slice(0, limit).join(' ') +
        `... + ${names.length - limit} users`;
});

const tooltip = ref<HTMLButtonElement | null>(null);
onMounted(() => {
  M.Tooltip.init(tooltip.value);
});
</script>

<style scoped>
.CommentReactionIcon {
  cursor: pointer;
  display: inline-block;
  padding: 4px;
  text-decoration: none;
  background-color: rgba(29, 28, 29, 0.04);
  border: none;
  border-radius: 12px;
  transition: 0.4s;
  margin: 0 2px;
}

.CommentReactionIcon:not(.emoji-pressed):hover {
  background: #67c5ff;
  color: white;
}

.CommentReactionIcon.emoji-pressed {
  color: #67c5ff;
  border: solid 2px #67c5ff;
}
</style>
