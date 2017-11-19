import React from 'react';
import { Container, Content, Form, InputGroup, Input, Item, Button, Text,Icon } from 'native-base';
import Firebase from '../data/FireBase';
import { Alert } from 'react-native';

export default class Signin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            invalidEmail: false,
            invalidPassword: false,
        }
    }
    alert = (errorMessage = '') => {
        Alert.alert("login failed", errorMessage);
    }

    _login = async () => {
        const { email, password } = this.state;
        if (email.length === 0) {
            this.setState({ invalidEmail: true });
            return
        } else if (password.length < 8) {
            this.setState({ invalidPassword: true });
            return
        }

        Firebase.auth().setPersistence('local').then(()=>{
           return Firebase.auth().signInWithEmailAndPassword(email, password);
        }).then(() => {
            //this is too bad ugly hack.
            // any suggestions are welcome.
            this.props.navigation.navigate('AppWithTabs');
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {
                this.alert('Wrong password.');
            } else {
                this.alert(errorMessage);
            }
            console.log(error);
        });;
    }

    render() {
        return (
            <Container>
                <Form  >
                    <Item style={{marginHorizontal:30,marginTop:10}} placeholder="email" rounded fixedLabel error={this.state.invalidEmail}>
                        
                            <Input  placeholder="email" keyboardType='email-address' onChangeText={(value) => this.setState({ email: value })} />
                        
                    </Item>
                    <Item style={{marginHorizontal:30,marginTop:10}} placeholder="password" rounded fixedLabel error={this.state.invalidPassword}>
                        
                            <Input  placeholder="password" secureTextEntry={true} onChangeText={(value) => this.setState({ password: value })} />
                        
                    </Item>
                </Form>
                <Button style={{margin:30}} onPress={() => this._login()} block >
                    <Icon />
                    <Text >Login</Text>
                </Button>
            </Container>
        );
    }

}