export default interface Reaction {
  id: string;
  reaction: '+1' | 'eyes' | 'heart' | 'joy';
  eventId: string;
  authorId: string;
  authorDisplayName: string;
  messageId: string;
  createdAt: Date;
}

export const emojiMapping: Record<Reaction['reaction'], string> = {
  '+1': '👍',
  eyes: '👀',
  heart: '❤️',
  joy: '😂'
};
