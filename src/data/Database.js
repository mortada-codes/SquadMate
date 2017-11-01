import firebase from 'firebase'


export default function Database (){
    
    const   config = {
        apiKey: "AIzaSyBbSlzikz4s2glP6JePIwpZbP0mQAOpeLc",
        authDomain: "books-map-e775e.firebaseapp.com",
        databaseURL: "https://books-map-e775e.firebaseio.com",
        projectId: "books-map-e775e",
        storageBucket: "books-map-e775e.appspot.com",
        messagingSenderId: "850422296819"
      };
    return   firebase.initializeApp(config);
}