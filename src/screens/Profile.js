import React  from 'react'
import {View} from 'react-native'
import {Header,Body,Title,Left,Right,Button,Icon,Container,Content,Thumbnail,H1,H2} from 'native-base'
    import Expo from 'expo'
export default class Profile extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        
        header: (
            <Header>
                <Left>
                    <Button transparent onPress={() => navigation.goBack()} ><Icon name='arrow-back'/></Button>
                    </Left>
                  <Body  style={{alignItems: 'center'}}>
                       <Title >My Profile</Title>
                 </Body>
                 <Right>
                     </Right>
            </Header>
       )
        
   
      });


 render() {
    return (
    <Container style={{alignItems:'center'}}>
            <Content >
                <Thumbnail style={{marginTop:10,alignSelf:'center'}} large source={{uri:Expo.Asset.fromModule(require('../../assets/profile.png')).uri}} />
                <H1 style={{marginTop:10,alignSelf:'center'}}>Mahmoud,</H1>
                <H2 >android,react-native,ios</H2>
                </Content>
    </Container>
    )
}

}