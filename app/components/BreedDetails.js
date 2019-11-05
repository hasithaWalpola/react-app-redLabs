import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, Button} from 'react-native';

export default class BreedDetails extends Component{
    constructor(props){
        super(props);
        this.state = {
            breed: props.navigation.getParam('item', 'SAMPLE_BREED'),
            image: "",
            sub_breeds: props.navigation.getParam('sub_breeds', [])
           
        }
        console.log(this.state);
    }

    componentDidMount(){
        this.fetchData();
    }

    fetchData =()=>{
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
      //console.log(breed)
      let {breed, image, sub_breeds} = this.state; 
    return(
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center"}}>
        <Text style= {styles.titleText}>{breed.toUpperCase()}</Text>
        {/* <Text>{image}</Text> */}
        { image != "" ? (
            <Image source={{uri: image}}
            style={{width: 300, height:300}} />
        ): null}
        <Text style= {styles.titleText}>Sub Breeds</Text>
        { sub_breeds.map((sub_breed, index) => (
            <Text style= {styles.titleText} key={index}>{sub_breed}</Text>
        ))}
          <Button 
                onPress={this.fetchData}
                title="Change The Picture"
            />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    baseText: {
    //   fontFamily: 'Cochin',
    },
    titleText: {
      //fontFamily: 'Cochin',
      fontSize: 20,
      fontWeight: 'bold',
    },
  });
  