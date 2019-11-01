import React, {Component} from 'react';
import { AppRegistry, Text, View, ListView, FlatList, StyleSheet } from 'react-native';


export default class myapp extends Component{
    constructor() {
        super();
        //const ds = new DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
          dataSource: []
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
                    dataSource: this.state.dataSource.cloneWithRows(response)
                });
            });
    }

    renderRow(breed, sectionId, rowId, highlightRow){
        return(
            <View style={styles.row}>
                <Text style={styles.rowText}>{breed.message}</Text>
            </View>
        )
    }
      
    render(){
        return(
        <View>
        <FlatList
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}
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
        }
    });
    

AppRegistry.registerComponent('myapp', () => myapp);