import Firebase from './FireBase'
import Developer from './model/Developer'


class Developers {
  constructor() {

  }

    findDevelopers(stackOption) {
      console.log('stckOptions',stackOption);
     if(!stackOption){
      return  Promise.resolve([]);
     }
    return  Firebase.database().ref("developers").child("profiles").orderByKey().startAt(stackOption).endAt(stackOption).once("value").then((snapshot) => {
      var list = [];
      snapshot.forEach((e) => {
        list.push(e.val())
      })
      return list;
    });
  }


   likeDeveloper(developerId) {
    const transactionArray = new Array();
    const transRef = Firebase.database().ref("developers");
    const userId = Firebase.auth().currentUser.uid;
    const following = Firebase.database().ref("developers").child("following/" + userId).toString();
    const followers = Firebase.database().ref("developers").child("followers/" + developerId).toString();
    transactionArray[following] = {[developerId]:true}
    transactionArray[followers]={[userId]:true}
  return    transRef.update(transactionArray);
  }

  async unlikeDeveloper(developerId) {
    const userId = Firebase.auth().currentUser.uid;
   return  Firebase.database().ref("developers").child("unlikes/" + userId).push({[developerId]:true});
  }

  async matchedDevelopers() {
    try {
      const matchedUsers = new Array();
      const userId = Firebase.auth().currentUser.uid;
      const followingList = await Firebase.database().ref("developers").child("following/" + userId).once("value").val();
      const followersList = await Firebase.database().ref("developers").child("followers/" + userId).once("value").val();
      followersList.forEach((e)=>followingList.find((value,index)=> {if(index>-1){matchedUsers.push(value)}}));
      return matchedUsers;
    } catch (error) {
      return error  
    }
  }

}

export default developers = new Developers();