import React, {Component} from 'react';
import { AppRegistry, Text, View, Image} from 'react-native';

export default class BreedDetails extends Component{
    constructor(props){
        super(props);
        this.state = {
            breed: props.navigation.getParam('item', 'SAMPLE_BREED'),
            image: ""
        }
        console.log(this.state.breed);
    }

    componentDidMount(){
        this.fetchData();
    }

    fetchData(){
        const { breed } = this.state;
        console.log("here : "+breed);
        fetch(`https://dog.ceo/api/breed/${breed}/images/random`, )
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                this.setState({
                    image: response.message
                });
            });
    }

  render(){
      let {breed, image} = this.state; 
    return(
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center"}}>
        <Text>{breed}</Text>
        {/* <Text>{image}</Text> */}
        { image != "" ? (
            <Image source={{uri: image}}
            style={{width: 300, height:300}} />
        ): null}
      </View>
    );
  }
}
