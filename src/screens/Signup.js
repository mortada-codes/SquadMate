import React, { Component } from 'react';
import { View, Image, TouchableNativeFeedback, StyleSheet, Easing, Animated, FlatList, AsyncStorage } from 'react-native';
import {
    Header, Body, Title, Left, Right, Button, Icon, Container, Form, Item,
    Content, InputGroup, Input, Text, H1, H3, Grid, Row, Col, List, ListItem, CheckBox
} from 'native-base'
import { StackNavigator,NavigationActions } from 'react-navigation'
import getSlideFromRightTransition from 'react-navigation-slide-from-right-transition';
import AutoTags from 'react-native-tag-autocomplete'
import Expo from 'expo'
import _ from 'lodash'
import ChatRoom from './ChatRoom';
import SignIn from './Signin';
import  signupService  from '../data/SignupService';
import { Alert } from 'react-native';
import FadeView from './FadeView';

const resetStack = NavigationActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({ routeName: 'AppWithTabs' }),
    ],
    key: null
});

alert = (errMessage) => {
    Alert.alert("Fail to create account", errMessage);
}

class DeveloperInfo extends React.Component {
    constructor(props) {
        super(props);

    }



    _navigateNext = async () => {
        const { email, password } = this.state;
        if (email.length === 0) {
            this.setState({ invalidEmail: true });
            return
        }
        if (password.length < 8) {
            this.setState({ invalidPassword: true });
            return
        }

        this.props.navigation.navigate('Stack', { email, password });
    }
    render() {
        return (

            <Container>
                <Content padder style={{}}>
                    <H1>Fill your  contact info!!!</H1>
                    <Form>
                        <Item>
                            <InputGroup style={[{ marginTop: 25 }]} rounded>
                                <Icon name='person' color='black' />
                                <Input placeholder='type your name' />
                            </InputGroup >
                        </Item>
                        <Item>
                            <InputGroup style={[{ marginTop: 10 }]} rounded>
                                <Icon name='md-egg' color='black' />
                                <Input keyboardType='email-address' placeholder='type your email' onChangeText={(value) => this.setState({ email: value })} />
                            </InputGroup>
                        </Item>
                        <Item password placeholder='password'>
                            <InputGroup style={[{ marginTop: 10 }]} rounded>
                                <Icon name='md-egg' color='black' />
                                <Input placeholder='type your password' secureTextEntry={true} onChangeText={(value) => this.setState({ password: value })} />
                            </InputGroup>
                        </Item>
                    </Form>
                    <Button style={[{ margin: 25 }]} full iconRight
                        onPress={() => { this._navigateNext() }}>
                        <Text>Next</Text>
                        <Icon name='arrow-forward' />
                    </Button>
                </Content>
            </Container>

        );
    }
}

class StackItem extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            itemChecked: false
        }
    
    }
    _onPress = () => {
        this.setState({ itemChecked: !this.state.itemChecked });
        this.props.onPressItem(this.props.id);
    };
    render() {
        return (

            <Button {...this.props} margin={5} bordered rounded success={this.state.itemChecked}
                onPress={this._onPress}>
                <Text>{this.props.item.key}</Text>
            </Button>

        )
    }
}




class DeveloperStackInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: (new Map(): Map<string, boolean>),
            checked: false,
            items: [{ key: 'android' }, { key: 'FullStack' }, { key: 'nodejs' },
            { key: 'FrontEnd' }, { key: 'BackEnd' }, { key: 'ios' }],

        };
        this._onPressItem.bind(this);

    }

    _onPressItem = (id) => {
        this.setState((state) => {
            // copy the map rather than modifying state.
            const selected = new Map(state.selected);
            selected.set(id, !selected.get(id)); // toggle
            return { selected };
        });
    };
    _onPressNext = () => {
        
    const arr = new Array();
            this.state.selected.forEach((v,k,map)=>{if(v)arr.push(k)})
        const {email,password} = this.props.navigation.state.params;
        console.log('selectedItems',arr);
        this.props.navigation.navigate('Finish', { email,password, checkItems:arr })
    }
    _pressBack = () => {
        this.props.navigation.goBack()
    }
    _keyExtractor = (item, index) => item.key;
    render() {
        return (
            <Container>
                <Content padder style={{}}>
                    <H1>Fill your stack here!!!</H1>
                    <H3>Fill your stack here!!!</H3>


                    <FlatList contentContainerStyle={styles.list} data={this.state.items}
                        keyExtractor={this._keyExtractor} numColumns={2}
                        renderItem={({ item }) =>
                            <StackItem onPressItem={this._onPressItem} key={item.key} id={item.key} item={item} />} />



                    <Grid style={{ margin: 5 }}>
                        <Col style={{ margin: 5 }}>
                            <Button block iconLeft transparent bordered onPress={this._pressBack}><Icon name='arrow-back' /><Text>Back</Text></Button>
                        </Col>
                        <Col style={{ margin: 5 }}>
                            <Button block iconRight onPress={this._onPressNext}>

                                <Text>Next</Text>
                                <Icon name='arrow-forward' />
                            </Button>
                        </Col>
                    </Grid>
                </Content>
            </Container>
        );
    }
}


class FinishSignup extends React.Component {
    constructor(props) {
        super(props);
           
    }
 
    _onFinish = ()=>{
        console.log(signupService);
        this._createAccountAndProfile();
    }
    _createAccountAndProfile = async () => {
        
        try {
            const result = await signupService.signup(this.props.navigation.state.params);
            /**@TODO this should be better!!! */
            this.props.navigation.dispatch(resetStack);
        } catch (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
                alert('The password is too weak.');
            } else {
                alert(errorMessage);
            }
        }

        _pressBack = () => {
            console.log('press back');
            this.props.navigation.goBack();
        }

    }
    render() {
        return (

            <Container>
                <Body>
                    <H1>Thanks for registration!!</H1>
                    <H1> enjoy Building your squad team </H1>
                    <Grid style={{ margin: 5 }}>
                        <Col style={{ margin: 5 }}>
                        
                            <Button block iconLeft  bordered onPress={()=>this._pressBack()}>
                                <Icon name='arrow-back' />
                                <Text>Back</Text>
                                </Button>
                        </Col>
                        <Col style={{ margin: 5 }}>

                            <Button block iconRight
                                onPress={()=>this._onFinish()}>
                                <Text>Finish</Text>
                                <Icon name='arrow-forward' />
                            </Button>
                        </Col>
                    </Grid>


              </Body>
            </Container>

        );
    }
}

const SignupNavigator = StackNavigator({
    DeveloperInfo: {
        screen: DeveloperInfo,
        path: '/DeveloperInfo'
    },
    Stack: { screen: DeveloperStackInfo, path: '/stack' }, Finish: { screen: FinishSignup, path: '/finish' }
}, {
        headerMode: 'none', transitionConfig: getSlideFromRightTransition
    });




class NotLoggedIn extends Component {
  constructor(props){
      super(props);
      this.state={
          checkingSignIn:false
      }
  }
    componentDidMount(){
        Firebase.auth().onAuthStateChanged((user) =>{
            if (user) {
              this.setState({
                  checkingSignIn:true
              });  
             
              this.props.navigation.dispatch(resetStack);
            } else {
              
            }
          });
    }
 render(){
    return  (
    <Container navigation={navigation}>
        <Text></Text>
        <Content padder>
            <Button style={{ marginVertical: 10 }} primary block onPress={() => this.props.navigation.navigate('SignupNavigator')}>
                <Text>Signup</Text>
            </Button>
            <Button primary block onPress={() => this.props.navigation.navigate('SignIn')}>
                <Text>SignIn</Text>
            </Button>
        </Content>
    </Container>
)}
}
const SignedInNavigator =
    StackNavigator({

        SignupNavigator: { screen: SignupNavigator, Path: '/signup' },
        NotLoggedIn: { screen: NotLoggedIn, path: '/NotLoggedIn' },
        SignIn: {
            screen: SignIn, path: '/signin'
        }
    }, {
            initialRouteName: "NotLoggedIn",
            headerMode: 'none'
        }
    )

export default SignedInNavigator;


var styles = StyleSheet.create({
    list: {
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',

    },
    row: {
        justifyContent: 'center',
        padding: 5,
        margin: 10,
        width: 100,
        height: 100,
        backgroundColor: '#F6F6F6',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#CCC'
    },
    thumb: {
        width: 64,
        height: 64
    },
    text: {
        flex: 1,
        marginTop: 5,
        fontWeight: 'bold'
    }
});
