import {defineStore} from 'pinia';
import {addDoc, collection, onSnapshot, orderBy, query, serverTimestamp} from 'firebase/firestore';
import type {DocumentData, Firestore, QueryDocumentSnapshot, QuerySnapshot} from 'firebase/firestore';
import type Event from '~/types/event';
import {User} from 'firebase/auth';

export const useEventsStore = defineStore('events', {
  state: (): {
    firestore: Firestore | null;
    events: Event[];
  } => ({
    firestore: null,
    events: []
  }),
  actions: {
    setup(firestore: Firestore | null) {
      this.firestore = firestore;
    },
    async submitEvent(payload: {user: User, eventName: string}) {
      if (this.firestore === null) {
        return;
      }

      const eventsRef = collection(this.firestore, 'events');

      addDoc(eventsRef, {
        email: payload.user.email,
        photoURL: payload.user.photoURL,
        displayName: payload.user.displayName,
        authorId: payload.user.uid,
        eventName: payload.eventName,
        createdAt: serverTimestamp()
      });
    },
    async fetchEvents() {
      if (this.firestore === null) {
        return;
      }

      const eventsRef = query(
        collection(this.firestore, 'events'),
        orderBy('createdAt', 'desc')
      );

      onSnapshot(eventsRef, (snapshot: QuerySnapshot<DocumentData>) => {
        this.events = snapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => {
          const data = doc.data();

          return {
            id: doc.id,
            authorId: data.authorId,
            displayName: data.displayName,
            email: data.email,
            eventName: data.eventName,
            photoURL: data.photoURL,
            createdAt: data.createdAt.seconds * 1000
          };
        });
      });
    }
  }
});
