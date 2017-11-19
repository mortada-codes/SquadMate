import Firebase from './FireBase';


 class ChatService{

          async  userChatList(userId){
                 
            const dataSnapShot = await    Firebase.database().ref('developers').child("profiles"+userId).child(user._id).child("chatList").once('value');
            return dataSnapShot.val();  
        }
    
            async userChatChannel (chatId){
                const dataSnapShot = await Firebase.database().ref('developers').child('chats/'+ chatId).limitToLast(10).once('value');
                return dataSnapShot.val();
            }


        async addMessage(chatId ,message){
         const dataSnapShot = await   Firebase.database().ref("developers").child("chats/"+chatId).child().push(message);
            return dataSnapShot.val();
        }

}   

export default new ChatService()