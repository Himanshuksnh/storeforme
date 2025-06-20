import { initializeApp, getApps } from "firebase/app"
import { getFirestore } from "firebase/firestore"

// Firebase configuration - you can replace these with your actual config
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "demo-api-key",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "demo-project.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "demo-project",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "demo-project.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:123456789:web:abcdef123456",
}

// Initialize Firebase only if it hasn't been initialized already
let app
if (getApps().length === 0) {
  try {
    app = initializeApp(firebaseConfig)
  } catch (error) {
    console.warn("Firebase initialization failed:", error)
    app = null
  }
} else {
  app = getApps()[0]
}

// Initialize Firestore
let db
try {
  if (app) {
    db = getFirestore(app)
  } else {
    db = null
  }
} catch (error) {
  console.warn("Firestore initialization failed:", error)
  db = null
}

export { db }
