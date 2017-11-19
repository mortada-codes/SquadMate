import React, { Component } from 'react';
import { Animated, View } from 'react-native';
import { Button, Text } from 'native-base';
export default class FadeInView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fadeIn: new Animated.Value(0),
            xyVector: new Animated.ValueXY(),
            renderSomthing: false,
        }
    }

    componentDidMount() {

        Animated.timing(this.state.xyVector, {
            toValue: { x: 200, y: 100 },
            duration: 1000
        }).start(() => { this.setState({ xyVector: new Animated.ValueXY({ x: 0, y: 0 }) }) })

    }
    renderSomthing() {
        if (this.state.renderSomthing === true) {
            return (<Button full block
                    onPress={()=>
                        {
                            this.setState({ renderSomthing: false });
                            Animated.timing(this.state.xyVector, {
                                toValue: { x: 200, y: 100 },
                                duration: 1000
                            }).start()
                        }
                    }
            ><Text>Render something here</Text></Button>)
        }

        return (<View style={{ backgroundColor: 'brown' }}><Button full onPress={() => {
            this.setState({ renderSomthing: true });
            Animated.timing(this.state.xyVector, {
                toValue: { x: 200, y: 50 },
                duration: 1000
            }).start()
        }}><Text>render nothing</Text></Button></View>)
    }

    render() {
        let { x, y } = this.state.xyVector;
        return (
            <Animated.View style={{ ...this.props.style,alignSelf:'stretch', backgroundColor: 'green', width: x, height: y }}>
               {this.renderSomthing()}
                {this.props.children}

            </Animated.View>
        )
    }
}
