import type {FirebaseApp} from 'firebase/app';
import type {User} from 'firebase/auth';
import type {Firestore} from 'firebase/firestore';
import {getFirestore} from 'firebase/firestore';
import {defineStore} from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: (): {
    firebaseApp: FirebaseApp | null;
    user: User | null;
  } => ({
    firebaseApp: null,
    user: null
  }),
  actions: {
    setup(payload: {firebaseApp: FirebaseApp}) {
      this.firebaseApp = payload.firebaseApp;
    },
    login(payload: {user: User}) {
      this.user = payload.user;
    }
  },
  getters: {
    firestore(): Firestore | null {
      if (this.firebaseApp === null) {
        return null;
      }

      return getFirestore(this.firebaseApp);
    }
  }
});
