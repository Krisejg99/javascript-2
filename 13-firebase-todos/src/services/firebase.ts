// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { CollectionReference, DocumentData, collection, getFirestore } from "firebase/firestore"
import { NewTodo, Todo } from "../types/Todo.types"

const env = import.meta.env

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)

const createCollection = <T = DocumentData>(collectionName: string) => {
	return collection(db, collectionName) as CollectionReference<T>
}

export const todosCol = createCollection<Todo>('todos')
export const newTodosCol = createCollection<NewTodo>('todos')
