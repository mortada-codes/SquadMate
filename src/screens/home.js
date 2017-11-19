import React from 'react'
import SwipeCards from 'react-native-swipe-cards'
import { Animated, View, StyleSheet, Text, ToastAndroid, Image } from 'react-native'
import { Header, Body, Left, Right, Title, Button, DeckSwiper, Content,Container, ActionSheet } from 'native-base'
import Developers from '../data/Developers'
import DeveloperCard from './DeveloperCard';




const stackTags = ['android', 'ios', 'front-end', 'back-end', 'full-stack'];
const CANCEL_INDEX = 1;
const DESTRUCTIVE_INDEX = 1;


class Card extends React.Component {



  constructor(props) {
    super(props);
  }


  render() {
    return (
      <View style={[styles.card, { backgroundColor: this.props.backgroundColor }]}>
        <Text style={[styles.text]}>{this.props.name}</Text>
        <Image style={[styles.thumbnail]} />
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
      <View style={[{ alignSelf: 'center' }]}>
        <Text style={styles.noMoreCardsText} onPress={this.props.loadMore} >No more cards</Text>

      </View>
    )
  }
}




export default class Home extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.navigate("Profile")}  ><Text>Profile</Text></Button>
        </Left>
        <Body style={{ alignItems: 'center' }}>
          <Title >SquadMate</Title>
        </Body>
        <Right>
          <Button transparent onPress={() => navigation.navigate("Signup")} ><Text>Signup</Text></Button>
        </Right>
      </Header>
    )

  });
  constructor(props) {
    super(props);
    this.state = {
      cards: new Array(),
      outOfCards: true,
      fadeAnim: new Animated.Value(0),
      clicked:'',
    }
    this.onPressLearnMore.bind(this)

  }
  addDevelopers(...developers) {
    this.setState({
      cards: this.state.cards.concat(...developers),
      outOfCards: true
    });

  }

  componentDidMount() {
    setTimeout(() => { this.loadMoreDevelopers() }, 1000);
         // this._animate()

  }

  loadMoreDevelopers() {

    Developers.findDevelopers(this.state.clicked).then(r => {

      this.addDevelopers(r);
    })
  }

  onPressLearnMore() {
    this.loadMoreDevelopers()
  }
  handleYup(card) {
    console.log("yup")
  }

  handleNope(card) {
    console.log("nope")
  }


_animate = ()=>{
  Animated.timing(                  // Animate over time
    this.state.fadeAnim,            // The animated value to drive
    {
      toValue: 1,                   // Animate to opacity: 1 (opaque)
      duration: 500,              // Make it take a while
    }
  ).start(()=>{console.log('animation finished',this.state.fadeAnim);});    
}

  cardRemoved(index) {
    console.log(`The index is ${index}`);

    let CARD_REFRESH_LIMIT = 3

    if (this.state.cards.length - index <= CARD_REFRESH_LIMIT + 1) {
      console.log(`There are only ${this.state.cards.length - index - 1} cards left.`);

      if (!this.state.outOfCards) {
        console.log(`Adding ${cards.length} more cards`)

        this.setState({
          cards: this.state.cards.concat(cards),
          outOfCards: true
        })
      }

    }

  }

renderDefault(){
  console.log('render default');
  return (
  
      
        <Text style={{alignSelf:'center'}}>Select search criteria</Text>

 
  )
}
  renderHome(){
    console.log('render home');
    return (


      <SwipeCards

        cards={this.state.cards}

        renderCard={(item) => <DeveloperCard item={item} />}
        loop={false}

        renderNoMoreCards={() => <NoMoreCards loadMore={this.loadMoreDevelopers.bind(this)} />}
        showYup={true}
        showNope={true}

        handleYup={this.handleYup}
        handleNope={this.handleNope.bind(this)}
        cardRemoved={this.cardRemoved.bind(this)}
      />
    )
  }

  render() {
  return (  <Container>
            <Button full light
        onPress={() => ActionSheet.show(
          {
            options: stackTags,
            cancelButtonIndex: CANCEL_INDEX,
            destructiveButtonIndex: DESTRUCTIVE_INDEX,
            title: "Select Target Stack"
          },
          buttonIndex => {
            this._animate();
            this.setState({ clicked: stackTags[buttonIndex] });
          }
        )}>
        <Text>Filter </Text>
      </Button>
    <Animated.View style={{ ...this.props.style, flex:1,  opacity: this.state.fadeAnim,  }}>
      {this.state.clicked.length===0?this.renderDefault():this.renderHome()
  }
  </Animated.View>
</Container>)
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