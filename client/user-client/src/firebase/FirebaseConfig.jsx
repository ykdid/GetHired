import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"; 


const firebaseConfig = {
  apiKey: "AIzaSyD3uQ7CnwpLz0HqZwcGNKCCeOwCB5oRi8Q",
  authDomain: "gethired-new.firebaseapp.com",
  projectId: "gethired-new",
  storageBucket: "gethired-new.appspot.com",
  messagingSenderId: "201337867633",
  appId: "1:201337867633:web:0f821e02c22e12a8a97ad0"
};


const app = initializeApp(firebaseConfig);
const storage = getStorage(app); 

export { storage }; 
