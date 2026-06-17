import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey:            'AIzaSyCllCB9xJD70C-TZLix8krrzAd8TC2PS3E',
  authDomain:        'lavaflow-d92ad.firebaseapp.com',
  projectId:         'lavaflow-d92ad',
  storageBucket:     'lavaflow-d92ad.firebasestorage.app',
  messagingSenderId: '658514626466',
  appId:             '1:658514626466:web:0256d87de3d71149e814fb',
  databaseURL:       'https://lavaflow-d92ad-default-rtdb.firebaseio.com',
}

const app = initializeApp(firebaseConfig)
export const db = getDatabase(app)