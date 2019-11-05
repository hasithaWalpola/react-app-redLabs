import React, { Component } from "react";
import { Text, View, FlatList, StyleSheet, TouchableHighlight } from "react-native";
import SearchInput from "react-native-search-filter";
import { THEME } from "../constants";
import { toSentenceCase } from "../utils";
import { APP_CONFIG } from "../configs";

export class Breeds extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breeds: [],
            filterQuery: ""
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        const breedArray = [];

        fetch(`${ APP_CONFIG.API_ENDPOINT }/breeds/list/all`)
            .then(response => response.json())
            .then(response => {
                for (const [ key, value ] of Object.entries(response.message)) {
                    breedArray.push({
                        name: key,
                        subBreeds: value
                    })
                }
                this.setState({
                    breeds: breedArray
                });
            });
    }

    renderItem = ({ item }) => {
        const { navigation } = this.props;
        return (
            <TouchableHighlight onPress={ () => navigation.push("Details", { item }) }>
                <View style={ styles.listItem }>
                    <Text style={ styles.title }>{ toSentenceCase(item.name) }</Text>
                </View>
            </TouchableHighlight>
        );
    };

    onSearchUpdated = (term) => {
        this.setState({ filterQuery: term });
    };

    render() {
        const { breeds, filterQuery } = this.state;
        const filteredBreeds = breeds.filter((breed) => {
            return breed.name.toLowerCase().indexOf(filterQuery.toLowerCase()) !== -1;
        });
        return (
            <View style={ styles.container }>
                <View style={ styles.searchInputContainer }>
                    <SearchInput
                        onChangeText={ term => {
                            this.onSearchUpdated(term);
                        } }
                        style={ styles.searchInput }
                        placeholder="Type a breed to search"
                    />
                </View>
                <FlatList style={ styles.list } data={ filteredBreeds } renderItem={ this.renderItem }/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: THEME.COLORS.GALLERY_GRAY
    },
    list: {
        marginTop: 14,
        alignSelf: "stretch",
    },
    listContainer: {
        marginTop: 15
    },
    listItem: {
        backgroundColor: THEME.COLORS.WHITE,
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 18,
        paddingRight: 16,
        marginLeft: 14,
        marginRight: 14,
        marginTop: 0,
        marginBottom: 6,
        borderRadius: THEME.GLOBAL.BORDER_RADIUS,
        shadowColor: THEME.COLORS.BLACK,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
        shadowOpacity: 0.05,
        elevation: 2
    },
    title: {
        fontSize: 18
    },
    searchInput: {
        borderRadius: THEME.GLOBAL.BORDER_RADIUS,
        borderWidth: 1,
        borderColor: THEME.COLORS.GALLERY_GRAY,
        height: 45,
        backgroundColor: THEME.COLORS.WHITE,
        paddingLeft: 10,
        paddingRight: 10,
        shadowColor: THEME.COLORS.BLACK,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
        shadowOpacity: 0.05,
        elevation: 2
    },
    searchInputContainer: {
        marginTop: 10,
        alignSelf: "stretch",
        marginLeft: 14,
        marginRight: 14
    }
});
