import Firebase from './FireBase';
import _ from 'lodash';

class SignupService {
    constructor() {
        
          }
       async  signup(newUser){
      
          try{
              console.log(Firebase.auth);
              await Firebase.auth().setPersistence('local');
         const auth = await   Firebase.auth().createUserWithEmailAndPassword(newUser.email,newUser.password);
                const userId = Firebase.auth().currentUser.uid;
         const profile = Firebase.database().ref("developers").child("profiles/"+ userId).push(_.omit(newUser,['email','pasword']));
                  return true;      
        }catch(error){
            console.log(error);
              return error;
          }
        }

        

}

export default  signupService =new SignupService();