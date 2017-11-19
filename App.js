import React, { Component } from 'react';
import Home from './src/screens/Home'
import Profile from './src/screens/Profile'
import ChatStack from './src/screens/MatchedScreen';
import Expo from 'expo';
import { Icon, Tab, Tabs, Container, Header, TabHeading, Title, Root, Text ,Left,Button,Body} from 'native-base';
import { StackNavigator } from 'react-navigation';
import SignUp from './src/screens/Signup';
import Firebase from './src/data/FireBase';

const isAuthenticated = Firebase.auth().currentUser !== null;


const AppWithTabs = ({ navigation }) => (
  
    <Container>
      <Header hasTabs={true} />
      <Tabs initialPage={1} locked={true}>
        <Tab heading={<TabHeading><Icon name="camera" /><Text>Profile</Text></TabHeading>}>
          <Profile />
        </Tab>
        <Tab heading={<TabHeading><Icon name="camera" /><Text>Home</Text></TabHeading>}>
          <Home />
        </Tab>
        <Tab heading={<TabHeading><Icon name="camera" /><Text>Chat</Text></TabHeading>}>
          <ChatStack />
        </Tab>
      </Tabs>
    </Container>
 
)

const SignInNavigator = StackNavigator({
  AppWithTabs: {
    screen: AppWithTabs,
    path: '/',

    navigationOptions: ({ navigation }) => ({
      header: null
    }),
  },
  SignUp: {
    screen: SignUp,
    path: '/signup',
    navigationOptions: ({ navigation }) => ({

      header: (
        <Header>
          <Left>
            <Button transparent onPress={() => navigation.goBack()} ><Icon name='arrow-back' /></Button>
          </Left>
          <Body style={{ alignItems: 'center' }} >
            <Title >Signup</Title>
          </Body>
        </Header>
      )


    }),
  }
}, {
    initialRouteName: isAuthenticated ? 'AppWithTabs' : 'SignUp'
  });

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      isReady: false
    };
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({ isReady: true });
  }
  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }

    return (
      <Root>
      <SignInNavigator />
      </Root>
    );
  }
}