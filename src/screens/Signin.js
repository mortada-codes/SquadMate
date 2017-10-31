import React  from 'react'
import { Button,TextInput,Text,View} from 'react-native'


export default class Signin extends React.Component {

  render() {
          return (
              <View>
                <Text >
                    Login to squadmate with password...
                </Text>
                <TextInput   />
                <TextInput />
                <Button title="login"/>
                </View>
          );          
}

}