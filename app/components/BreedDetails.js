import React, { Component } from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import { THEME } from "../constants";
import { APP_CONFIG } from "../configs";

export class BreedDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breed: props.navigation.getParam("item", "SAMPLE_BREED"),
            image: null
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = () => {
        const { breed } = this.state;
        fetch(`${ APP_CONFIG.API_ENDPOINT }/breed/${ breed.name }/images/random`,)
            .then((response) => response.json())
            .then((response) => {
                this.setState({
                    image: response.message
                });
            });
    }

    render() {
        let { breed, image } = this.state;
        return (
            <View style={ styles.container }>
                <View style={ styles.card }>
                    {
                        image
                            ? (<Image source={ { uri: image } } style={ { width: 300, height: 300 } }/>)
                            : null
                    }
                    <Text style={ styles.cardTitle }>{ breed.name.toUpperCase() }</Text>
                    {
                        breed.subBreeds && breed.subBreeds.length && breed.subBreeds.length > 0
                            ?
                            <View style={ styles.subBreedContainer }>
                                <Text style={ styles.subBreedHeader }>Sub Breeds</Text>
                                {
                                    breed.subBreeds.map((subBreed, index) => (
                                        <Text style={ styles.titleText }
                                              key={ index }>{ index + 1 }{ ". " }{ subBreed }</Text>
                                    ))
                                }
                            </View>
                            : null
                    }
                </View>
                <Button
                    onPress={ this.fetchData }
                    title="Change the picture"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: THEME.COLORS.GALLERY_GRAY
    },
    card: {
        marginTop: 10,
        backgroundColor: THEME.COLORS.WHITE,
        paddingBottom: 10,
        marginLeft: 14,
        marginRight: 14,
        marginBottom: 6,
        borderRadius: THEME.GLOBAL.BORDER_RADIUS,
        shadowColor: THEME.COLORS.BLACK,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
        shadowOpacity: 0.05,
        elevation: 2
    },
    cardTitle: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 15,
        paddingRight: 15,
        fontSize: 16,
        fontWeight: "bold",
    },
    subBreedContainer: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 15,
        paddingRight: 15,
        borderTopColor: THEME.COLORS.GALLERY_GRAY,
        borderTopWidth: 1
    },
    subBreedHeader: {
        fontWeight: "bold",
        color: THEME.COLORS.DARK_GRAY,
        marginBottom: 5
    }
});
