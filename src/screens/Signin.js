import React  from 'react'
import { Button,TextInput,Text,View} from 'react-native'


export default class Signin extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        
        title:'Sign in'});
  render() {
          return (
              <View>
                <Text >
                    Login to squadmate with password...
                </Text>
                <TextInput   />
                <TextInput />
                <Button title="login" onPress={()=> null}/>
                </View>
          );          
}

}