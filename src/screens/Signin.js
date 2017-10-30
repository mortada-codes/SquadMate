import React  from 'react'
import { Button,TextInput} from 'react-native'


export default class Signin extends React.Component {

  render() {
          return (
              <view>
                <Text >
                    Login to squadmate with password...
                </Text>
                <TextInput   />
                <TextInput />
                <Button >Login</Button>
                </view>
          );          
}

}