import {defineStore} from 'pinia';
import {collection, serverTimestamp, doc, where, orderBy, query, getDoc, setDoc, addDoc, onSnapshot, QueryDocumentSnapshot, Firestore, updateDoc} from 'firebase/firestore';
import type {DocumentData, QuerySnapshot} from 'firebase/firestore';
import type {User} from 'firebase/auth';
import type Message from '~/types/message';

export const useEventStore = defineStore('event', {
  state: (): {
    firestore: Firestore | null;
    eventId: string;
    eventName: string;
    messages: Message[];
    messagesSort: 'desc' | 'asc';
  } => ({
    firestore: null,
    eventId: '',
    eventName: '',
    messages: [],
    messagesSort: 'desc'
  }),
  actions: {
    setup(firestore: Firestore | null) {
      this.firestore = firestore;
    },
    async fetchEvent(payload: {eventId: string}) {
      if (this.firestore === null) {
        return;
      }

      const eventRef = doc(this.firestore, 'events', payload.eventId);
      const eventSnapshot = await getDoc(eventRef);

      this.eventId = payload.eventId;
      this.eventName = eventSnapshot.data()?.eventName;
    },
    async createMessage(payload: {
      user: User,
      anonymous: boolean,
      eventId: string,
      message: string,
      to: string | null
    }) {
      if (this.firestore === null) {
        return;
      }

      const messagesRef = collection(this.firestore, 'messages');

      addDoc(messagesRef, {
        email: payload.anonymous ? '' : payload.user.email,
        photoURL: payload.anonymous ? '/images/anonymous.png' : payload.user.photoURL,
        displayName: payload.anonymous ? 'Anonymous' : payload.user.displayName,
        authorId: payload.user.uid,
        eventId: payload.eventId,
        message: payload.message,
        to: payload.to,
        done: false,
        createdAt: serverTimestamp()
      });
    },
    fetchMessages(payload: {eventId: string}) {
      if (this.firestore === null) {
        return;
      }

      const messagesRef = query(
        collection(this.firestore, 'messages'),
        where('eventId', '==', payload.eventId),
        orderBy('createdAt', this.messagesSort)
      );

      onSnapshot(messagesRef, (snapshot: QuerySnapshot<DocumentData>) => {
        this.messages = snapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => {
          const data = doc.data();

          return {
            id: doc.id,
            email: data.email,
            photoURL: data.photoURL,
            displayName: data.displayName,
            authorId: data.authorId,
            eventId: data.eventId,
            message: data.message,
            to: data.to,
            done: data.done,
            createdAt: data.createdAt.toDate(),
            anonymous: data.anonymous
          };
        });
      });
    },
    async updateMessage(payload: {messageId: string, done: boolean}) {
      if (this.firestore === null) {
        return;
      }

      const messageRef = doc(this.firestore, 'messages', payload.messageId);

      await updateDoc(messageRef, {done: payload.done});
    }
  }
});
