// Firebase設定
const firebaseConfig = {
  apiKey: "AIzaSyA0yUrVg3nW5NTwjbQQuX0etykpyjgGUGM",
  authDomain: "imuradev-5fc55.firebaseapp.com",
  projectId: "imuradev-5fc55",
  storageBucket: "imuradev-5fc55.firebasestorage.app",
  messagingSenderId: "169605533937",
  appId: "1:169605533937:web:18fc463d64a8952fcb5950"
};

// Firebase初期化
firebase.initializeApp(firebaseConfig);

// Authインスタンス
const auth = firebase.auth();
