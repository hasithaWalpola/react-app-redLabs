import React, {Component} from 'react';
import {Text, View, FlatList, StyleSheet,TouchableHighlight } from 'react-native';
import Constants from 'expo-constants';
import BreedDetails from './BreedDetails';
import { stringify } from 'qs';

export default class Breeds extends Component{
    constructor(props) {
        super(props);
        this.state = {
          breeds: []
        };
      }

    componentDidMount(){
        this.fetchData();
    }

    fetchData(){
        fetch('https://dog.ceo/api/breeds/list/all')
            .then((response) => response.json())
            .then((response) => {
                this.setState({
                    breeds: Object.keys(response.message)
                });
            });
    }

    // onPress(item){
    //    // const {navigate} = this.props.navigation;
    //     navigate('BreedDetails', {item})
    // }
    
    renderItem = ({item}) => {
        //const {navigate} = this.props.navigation;
        //console.log(item);
        return(
            <TouchableHighlight onPress={() => this.props.navigation.push('Details', {item})}>
            <View style={styles.item}>
              <Text style={styles.title}>{item}</Text>
            </View>   
            </TouchableHighlight>
        )
    }
       
    //onPress={() =>{this.onPress(item)}}
        // /onPress={() => navigate('BreedDetails', {name: item})}
      
    render(){
       // console.log(this.state.dataSource)
       
        return(
        
        <View style={styles.container} >   
            <FlatList
            data={this.state.breeds}
            renderItem={this.renderItem}
            />
            
        </View>
        
        );
    }
    }

    const styles = StyleSheet.create({
        row: {
            flexDirection:'row',
            justifyContent:'center',
            padding:10,
            backgroundColor: '#f4f4f4',
            marginBottom:3
        },
        rowText: {
            flex:1
        },
        container: {
            flex: 1,
            marginTop: Constants.statusBarHeight
          },
          item: {
            backgroundColor: '#f9c2ff',
            padding: 20,
            marginVertical: 8,
            marginHorizontal: 16
          },
          title: {
            fontSize: 32
          }
    });
