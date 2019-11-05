import React, { Component } from "react";
import {Text, View, FlatList, StyleSheet, TouchableHighlight, ScrollView} from "react-native";
import Constants from "expo-constants";
import BreedDetails from "./BreedDetails";
import { stringify } from "qs";
import SearchInput, { createFilter } from "react-native-search-filter";
const KEYS_TO_FILTERS = ['user.name', 'subject'];

export default class Breeds extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breeds: [],
      searchBreed: "",
      subBreeds :[],
      breedObj : []
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch("https://dog.ceo/api/breeds/list/all")
      .then(response => response.json())
      .then(response => {
        //console.log(response.message.bulldog)
        this.setState({
          breeds: Object.keys(response.message),
          breedObj : response.message
        });
      });
      
  }

  Capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
    }

  renderItem = ({item}) => {

    const sub_breeds = this.state.breedObj[item];

    console.log(JSON.stringify(sub_breeds));

    return (

      <TouchableHighlight onPress={() => this.props.navigation.push("Details", { item, sub_breeds })}>
        <View style={styles.item}>
          <Text style={styles.title}>{this.Capitalize(item)}</Text>
        </View>
      </TouchableHighlight>
    );
  };

  searchUpdated(term) {
    this.setState({ searchBreed: term });
  }

  render() {
    const br = this.state.breeds;
    //console.log(br);


    //console.log(Object.values(this.state.breedObj));
    const filteredBreeds = this.state.breeds.filter((element) => {
        return element.toLowerCase().indexOf(this.state.searchBreed.toLowerCase()) !== -1;
    });
    return (
      <View style={styles.container}>
        {/* {
            this.state.breeds.map((rowdata, i) =>
            <Text>
                {rowdata.dane}
            </Text>
            )
        } */}

        <SearchInput
          onChangeText={term => {
            this.searchUpdated(term);
          }}
          style={styles.searchInput}
          placeholder="Type a message to search"
        />
        <ScrollView>
            
        <FlatList data={filteredBreeds} renderItem={this.renderItem} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#f4f4f4",
    width:50,
    marginBottom: 3
  },
  rowText: {
    flex: 1
  },
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
   // flexDirection: 'row',
   // flexWrap: 'wrap',
    //alignContent:'flex-start'
    //alignItems: 'flex-start' 
  },
  item: {
   // width: '100%',
    backgroundColor: "gray",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16
  },
  title: {
    //fontFamily: 's',
    fontSize: 15
  }
});
