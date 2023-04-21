import {defineStore} from 'pinia';
import {addDoc, collection, deleteDoc, doc, onSnapshot, query, serverTimestamp, where} from 'firebase/firestore';
import type {DocumentData, Firestore, QuerySnapshot} from 'firebase/firestore';
import Reaction from '~/types/reaction';

export const useReactionsStore = defineStore('reactions', {
  state: (): {
    firestore: Firestore | null;
    reactions: Reaction[];
  } => ({
    firestore: null,
    reactions: []
  }),
  actions: {
    setup(firestore: Firestore | null) {
      this.firestore = firestore;
    },
    fetchReactions(payload: {eventId: string}) {
      if (this.firestore === null) {
        return;
      }

      const reactionsRef = query(
        collection(this.firestore, 'reactions'),
        where('eventId', '==', payload.eventId)
      );

      onSnapshot(reactionsRef, (snapshot: QuerySnapshot<DocumentData>) => {
        this.reactions = snapshot.docs.map(doc => {
          const data = doc.data();

          return {
            id: doc.id,
            reaction: data.reaction,
            eventId: data.eventId,
            authorId: data.authorId,
            authorDisplayName: data.authorDisplayName,
            messageId: data.messageId,
            createdAt: data.createdAt
          };
        });
      });
    },
    async addReaction(payload: Omit<Reaction, 'id' | 'createdAt'>) {
      if (this.firestore === null) {
        return;
      }

      const reactionsRef = collection(this.firestore, 'reactions');

      await addDoc(reactionsRef, {
        reaction: payload.reaction,
        authorId: payload.authorId,
        authorDisplayName: payload.authorDisplayName,
        eventId: payload.eventId,
        messageId: payload.messageId,
        createdAt: serverTimestamp()
      });
    },
    async deleteReaction(payload: {reactionId: string}) {
      if (this.firestore === null) {
        return;
      }

      const reactionRef = doc(this.firestore, 'reactions', payload.reactionId);

      await deleteDoc(reactionRef);
    }
  }
});
