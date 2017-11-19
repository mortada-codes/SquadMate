import React, { Component } from 'react';
import { } from 'react-native';
import { Title, Container, Content, Thumbnail, List, ListItem, Body, Grid, Row, Left, Right, Text, Icon, Header } from 'native-base';
import ChatRoom from './ChatRoom';
import { StackNavigator } from 'react-navigation';
import ChatService from '../data/ChatService';
import Developers from '../data/Developers';

class MatchedScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            whoLikeYou:new Array(0),
            matchedList:new Array(0)
        }
    }

    

    _loadWhoLikeYou = async () => {
        try {
            const whoLikeYou = await Developers.likeDeveloper();
            this.setState({
                whoLikeYou:whoLikeYou
            });
        } catch (err) {

        }
    }
    _loadMatchedDevelopers = async () => {
        try {
         const matchedList = await   Developers.matchedDevelopers();
     this.setState({
         matchedList:matchedList
     });
        } catch (err) {

        }
    }

    _renderLikedDev = (item) => {
        return (
            <ListItem>
                <Thumbnail avatar uri={{ uri: item.avatarUrl }} />
            </ListItem>
        )
    }
    _renderChatList = ({ item }) => {

        return (
            <ListItem >
                <Left>
                    <Thumbnail avatar uri={{ uri: item.avatarUrl }} />
                </Left>
                <Body>
                    <Text>{item.developerName}</Text>
                </Body>
                <Right>
                    <Icon name='arrow-forward' />
                </Right>
            </ListItem>
        )
    }

    render() {
        return (
            <Container>
                   
                <Grid style={{...this.props.style,paddingHorizontal:20}}>
                    <Row size={25}>
                        <Text >who want to be your squadmate</Text>
                        <List
                            horizontal
                            avatar
                            dataArray={this.state.whoLikeYou}
                            renderRow={(item) => this._renderLikedDev(item)}
                        />
                    </Row>
                    <Row size={75}>
                        <Text>Chat with your squads</Text>
                        <List avatar
                        dataArray={this.state.matchedList}
                            renderRow={(item) => this._renderChatList(item)}
                        />
                    </Row>

                </Grid>
              
            </Container>
        )
    }

}
const ChatStack = StackNavigator({
    MatchedScreen: {
        screen: MatchedScreen,
        path: '/',
        navigationOptions: ({ navigation }) => ({
            header: null
        }),
    },
    ChatRoom: {
        screen: ChatRoom,
        path: '/chatroom',
        navigationOptions: ({ navigation }) => ({
            header: (
                <Header>
                    <Left>
                        <Button transparent onPress={() => navigation.goBack()} ><Icon name='arrow-back' /></Button>
                    </Left>
                    <Body style={{ alignItems: 'center' }} >
                        <Title >{navigation.params.name}</Title>
                    </Body>
                    <Right>
                    </Right>
                </Header>
            )
        }),
    }
}, {
        initialRouteName: 'MatchedScreen'
    });

export default ChatStack;