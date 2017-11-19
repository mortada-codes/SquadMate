import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {
    Container, Content, Card, CardItem, Thumbnail,Label,Input,
    Button, Body, H1, H2, H3, Grid, Row, Col, Icon, List, ListItem
} from 'native-base';
import Expo from 'expo';




export default class DeveloperCard extends React.Component {

    constructor(props) {
        super(props);
        console.log(props.item);
        this.state = {
            skillsItems: [{ key: 'android' }, { key: 'android' }, { key: 'android' }, { key: 'android' },]
        }
    }


    _renderRow = (item) => {
        console.log(item.key);
        return (<ListItem >
              
                <Text  style={{textAlign:'center'}}>{item.key} </Text>
         
        </ListItem>)
    }
    render() {
        return (
            <View style={styles.card} >

                <Grid >
                    <Row>
                        <Col  style={[{ alignItems: 'center' }]}>
                            <Thumbnail source={{ uri: Expo.Asset.fromModule(require('../../assets/profile.png')).uri }} />
                        </Col>
                        <Col  style={{alignItems:'flex-start'}}>

                            <H1>Mahmoud</H1>
                            <Text>Android Developer</Text>


                        </Col>
                    </Row>


                    <Row size={.1} style={{ alignItems:'center',justifyContent:'center',alignContent: 'center' }}>
                       <View  style={{backgroundColor:'gray',height:2,width:225}}/>
                        
                    </Row>

                    <Row style={{ alignItems:'center',justifyContent:'center',alignContent: 'center' }}>
                       
                        <H1>Mahmoud Has</H1>
                    </Row>
                    <Row   >
                        <Col style={[{alignItems:'flex-end',justifyContent:"flex-start"}]}>

                            <H1 style={{fontSize:42}}  >10</H1>
                        </Col>
                        <Col style={[{alignItems:'flex-start',justifyContent:"flex-start"}]} >
                            <Col size={.30}>
                            <H1 style={{fontSize:20,}} adjustsFontSizeToFit={true} allowFontScaling={true} >Skill(s)</H1>
                            <Text style={{alignSelf:'stretch'}} adjustsFontSizeToFit={true} allowFontScaling={true} allowFontScaling={true}>That you are </Text>
                            <Text  style={{alignSelf:'stretch'}} adjustsFontSizeToFit={true}  >interested In</Text>
                        </Col>
                        </Col>
                    </Row>
                    <Row  backgroundColor='yellow' >
                    <Content padder>
                        <List dataArray={this.state.skillsItems} 
                            renderRow={this._renderRow} 
                            contentContainerStyle={{  justifyContent: 'center',
                            flexDirection: 'row',
                            flexWrap: 'wrap',}}
                           
                        />
                        </Content>
                    </Row>
                </Grid>


            </View>
        )
    }
}



const styles = StyleSheet.create({
    card: {
        flexDirection: 'column',
        width: 350,
        height: 400,
        borderWidth:2,
        backgroundColor:'#FFFFFF'

    },
    noMoreCardsText: {
        fontSize: 22,
    },
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



