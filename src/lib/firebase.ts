import { initializeApp, getApps } from 'firebase/app'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { getStorage, connectStorageEmulator } from 'firebase/storage'
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Initialize Firebase
let app
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig)
} else {
  app = getApps()[0]
}

// Initialize Firebase services
export const db = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app)
export const functions = getFunctions(app, 'europe-west1')

// Connect to emulators in development
if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  // Only connect to emulators on client side and in development
  const isDevelopmentMode = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  
  if (isDevelopmentMode) {
    try {
      // Connect to Firestore emulator
      if (!('_settings' in db)) {
        connectFirestoreEmulator(db, 'localhost', 8080)
      }
      
      // Connect to Auth emulator
      if (!(auth as any)._config?.emulator) {
        connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true })
      }
      
      // Connect to Storage emulator
      if (!(storage as any)._location) {
        connectStorageEmulator(storage, 'localhost', 9199)
      }
      
      // Connect to Functions emulator
      if (!(functions as any)._region) {
        connectFunctionsEmulator(functions, 'localhost', 5001)
      }
      
      console.log('🔧 Connected to Firebase emulators')
    } catch (error) {
      console.warn('⚠️ Could not connect to Firebase emulators:', error)
    }
  }
}

export default app