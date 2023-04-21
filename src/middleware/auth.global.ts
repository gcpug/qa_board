import {initializeApp} from 'firebase/app';
import {getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithRedirect} from 'firebase/auth';
import {useAuthStore} from '~/store/auth';
import type {FirebaseOptions} from 'firebase/app';
import type {Auth, User} from 'firebase/auth';

export default defineNuxtRouteMiddleware(async () => {
  if (process.server) {
    return;
  }

  const runtimeConfig = useRuntimeConfig();
  const authStore = useAuthStore();

  if (authStore.firebaseApp === null) {
    const config: FirebaseOptions = {
      apiKey: runtimeConfig.public.apiKey,
      authDomain: runtimeConfig.public.authDomain,
      databaseURL: runtimeConfig.public.databaseURL,
      projectId: runtimeConfig.public.projectId,
      storageBucket: runtimeConfig.public.projectId,
      messagingSenderId: runtimeConfig.public.messagingSenderId,
      appId: runtimeConfig.public.appId
    };

    const firebaseApp = initializeApp(config);
    authStore.setup({firebaseApp});
  }

  const auth = getAuth(authStore.firebaseApp!);
  const user = await authenticateWithGoogle(auth);
  authStore.login({user});
});

async function authenticateWithGoogle(auth: Auth) {
  return new Promise<User>((resolve, reject) => {
    onAuthStateChanged(auth, async user => {
      if (user) {
        resolve(user);
      } else {
        const authProvider = new GoogleAuthProvider();
        authProvider.setCustomParameters({'login_hint': 'user@mercari.com'});
        await signInWithRedirect(auth, authProvider);
      }
    }, reject);
  });
}
