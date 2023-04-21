<template>
  <div class="CommentReactions">
    <CommentReactionIcon
      v-for="(emoji, key) in pressedReactions"
      :key="key"
      :pressed="isPressed(key, reactions)"
      :emoji-code="key"
      :emoji="emoji"
      :reactions="reactions.filter(r => r.reaction === key)"
      v-on:click-emoji="clickReaction"
    />

    <!-- Dropdown Trigger -->
    <button
      class="btn-flat waves-effect waves-light"
      ref="dropdown"
      :data-target="'dropdown-' + messageId"
    >
      <i class="material-icons right">tag_faces</i>
    </button>

    <!-- Dropdown Structure -->
    <ul :id="'dropdown-' + messageId" class="dropdown-content emoji-dropdown">
      <li v-for="(emoji, key) in emojis" @click="clickReaction(key)" :key="key">
        <span>{{ emoji }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import {useAuthStore} from '~/store/auth';
import {useReactionsStore} from '~/store/reactions';
import Reaction, {emojiMapping} from '~/types/reaction';

const authStore = useAuthStore();
const reactionsStore = useReactionsStore();
reactionsStore.setup(authStore.firestore);

const props = defineProps({
  eventId: {
    type: String,
    required: true
  },
  messageId: {
    type: String,
    required: true
  }
});

const emojis = computed<Record<Reaction['reaction'], string>>(() => emojiMapping);

const reactions = computed<Reaction[]>(() => {
  return reactionsStore.reactions.filter(r => r.messageId === props.messageId);
});

const pressedReactions = computed<typeof emojiMapping>(() => {
  const r = {} as typeof emojiMapping;

  for (let [key, value] of Object.entries(emojiMapping)) {
    if (reactions.value.some(r => r.reaction === key)) {
      r[key] = value;
    }
  }

  return r;
});

function isPressed(reaction: Reaction['reaction'], reactions: Reaction[]): boolean {
  const userId = authStore.user?.uid;

  return reactions.filter(r => r.reaction === reaction).some(r => r.authorId === userId);
}

async function clickReaction(reaction: Reaction['reaction']) {
  if (authStore.user === null) {
    return;
  }

  if (isPressed(reaction, reactions.value)) {
    const r = reactions.value.find(r => r.reaction === reaction && r.authorId === authStore.user?.uid)!;

    await reactionsStore.deleteReaction({ reactionId: r.id });
  } else {
    await reactionsStore.addReaction({
      reaction,
      authorId: authStore.user.uid,
      authorDisplayName: authStore.user.displayName ?? '',
      eventId: props.eventId,
      messageId: props.messageId
    });
  }
}

const dropdown = ref<HTMLButtonElement | null>(null);
onMounted(() => {
  M.Dropdown.init(dropdown.value, {
    // set container to avoid overflow problems
    container: document.body
  });
});
</script>

<style scoped>
.CommentReactions {
  text-align: right;
  font-size: 12px;
}

.CommentReactions i.right {
  margin-left: 0;
}

.CommentReactions .btn-flat {
  padding: 0 4px;
}
</style>
