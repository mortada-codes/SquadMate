import {firebase} from './Database';


class Signin {

        async signin(email,password){
          return   firebase.auth().signInWithEmailAndPassword(emai,password);
        }

}
export default new Signin();