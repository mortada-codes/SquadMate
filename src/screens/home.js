import React from 'react'
import SwipeCards  from 'react-native-swipe-cards'
import {View,StyleSheet,Text,Button,ToastAndroid,Image} from 'react-native'




class Card extends React.Component {
    


  constructor(props) {
      super(props);
    }
    static navigationOptions = {
      title: 'Home'
    }
  
    render() {
      return (
        <View style={[styles.card, {backgroundColor: this.props.backgroundColor}]}>
          <Text style = {[styles.text]}>{this.props.name}</Text>
          <Image  style = {[styles.thumbnail]} source={{uri:this.props.image }}/>
        </View>
      )
    }
  }

class NoMoreCards extends React.Component {
    constructor(props) {
      super(props);
    }
  
    render() {
      return (
        <View>
          <Text style={styles.noMoreCardsText}>No more cards</Text>
        </View>
      )
    }
  }
  

  const cards = [
    {name: '1', image: 'https://media.giphy.com/media/GfXFVHUzjlbOg/giphy.gif'},
    {name: '2', image: 'https://media.giphy.com/media/irTuv1L1T34TC/giphy.gif'},
    {name: '3', image: 'https://media.giphy.com/media/LkLL0HJerdXMI/giphy.gif'},
    {name: '4', image: 'https://media.giphy.com/media/fFBmUMzFL5zRS/giphy.gif'},
    {name: '5', image: 'https://media.giphy.com/media/oDLDbBgf0dkis/giphy.gif'},
    {name: '6', image: 'https://media.giphy.com/media/7r4g8V2UkBUcw/giphy.gif'},
    {name: '7', image: 'https://media.giphy.com/media/K6Q7ZCdLy8pCE/giphy.gif'},
    {name: '8', image: 'https://media.giphy.com/media/hEwST9KM0UGti/giphy.gif'},
    {name: '9', image: 'https://media.giphy.com/media/3oEduJbDtIuA2VrtS0/giphy.gif'},
  ]
  
  const cards2 = [
    {name: '10', image: 'https://media.giphy.com/media/12b3E4U9aSndxC/giphy.gif'},
    {name: '11', image: 'https://media4.giphy.com/media/6csVEPEmHWhWg/200.gif'},
    {name: '12', image: 'https://media4.giphy.com/media/AA69fOAMCPa4o/200.gif'},
    {name: '13', image: 'https://media.giphy.com/media/OVHFny0I7njuU/giphy.gif'},
  ]

export default class Home extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    
    title:'SquadMate',
    headerLeft: <Button title="Profile" onPress={()=> navigation.navigate("Profile") }/> ,
     headerRight: <Button title="Signin" onPress={()=> navigation.navigate("Signin")} /> 
  });
constructor(props){
    super(props);
    this.state = {
        cards: cards,
        outOfCards: true
    }
    this.onPressLearnMore.bind(this)
    console.log("home component created")
  }

  onPressLearnMore(){
    console.log("Toast component created")
    ToastAndroid.show('A pikachu appeared nearby !', ToastAndroid.SHORT);
  }
    handleYup (card) {
        console.log("yup")
      }
    
      handleNope (card) {
        console.log("nope")
      }
    



cardRemoved (index) {
    console.log(`The index is ${index}`);

    let CARD_REFRESH_LIMIT = 3

    if (this.state.cards.length - index <= CARD_REFRESH_LIMIT + 1) {
      console.log(`There are only ${this.state.cards.length - index - 1} cards left.`);

      if (!this.state.outOfCards) {
        console.log(`Adding ${cards2.length} more cards`)

        this.setState({
          cards: this.state.cards.concat(cards2),
          outOfCards: true
        })
      }

    }

  }

 render() {
        return (<View style={{flexDirection: 'row', flex: 1, padding: 20}}>
            <SwipeCards  
            cards={this.state.cards}
        loop={false}

        renderCard={(cardData) => <Card {...cardData} />}
        renderNoMoreCards={() => <NoMoreCards />}
        showYup={true}
        showNope={true}

        handleYup={this.handleYup}
        handleNope={this.handleNope.bind(this)}
        cardRemoved={this.cardRemoved.bind(this)}
            />
        </View>)            
}

}


const styles = StyleSheet.create({
    card: {
      alignItems: 'center',
      borderRadius: 5,
      overflow: 'hidden',
      borderColor: 'grey',
      backgroundColor: 'white',
      borderWidth: 1,
      elevation: 1,
      width: 300,
      height: 300
    },
    thumbnail: {
      width: 300,
      height: 300,
    },
    text: {
      fontSize: 40,
      paddingTop: 10,
      paddingBottom: 10
    },
    noMoreCards: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }
  })