import Firebase from './FireBase';
import _ from 'lodash';

class SignupService {
    constructor() {
        
          }
       async  signup(newUser){
      
          try{
              console.log(Firebase.auth);
        const auth  =       await Firebase.auth().setPersistence('local').then(()=>{
         return   Firebase.auth().createUserWithEmailAndPassword(newUser.email,newUser.password);
        });
        
                const userId = Firebase.auth().currentUser.uid;
                
                const object  = _.omit(_.omit(newUser,'email'),'pasword');
         const profile = Firebase.database().ref("developers").child("profiles/"+ userId).set(object);
                  return true;      
        }catch(error){
            console.log(error);
              return error;
          }
        }

        

}

export default  signupService =new SignupService();