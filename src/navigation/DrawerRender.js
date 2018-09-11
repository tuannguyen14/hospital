import React, { Component } from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Platform,
    ImageBackground
} from "react-native";
import { Text, Avatar, List, ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Entypo';

// create a component
class MainDrawer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coverPhoto: 'https://images.alphacoders.com/744/74453.jpg',
            avatar: 'https://image.flaticon.com/icons/png/128/145/145867.png',
            name: 'Siêu nhân',
            email: 'superman@superman.com',
            id: '',
            listSettingsItem: {
                name: '',
                icon: ''
            },
        };
    }

    componentWillMount() {
        const listDefaultItemTemp = [
            {
                icon: 'person',
                name: 'Thông tin người dùng'
            },
            {
                icon: 'sentiment-dissatisfied',
                name: 'Đăng xuất'
            }
        ]
        this.setState({
            listSettingsItem: listDefaultItemTemp
        })
    }


    render() {
        return (
            <View style={styles.container}>

                <View>
                    <ImageBackground
                        source={{ uri: this.state.coverPhoto }}
                        style={styles.coverPhoto}
                    >
                        <View style={styles.containerTextImage}>
                            <Avatar
                                medium
                                rounded
                                source={{ uri: this.state.avatar }}
                                onPress={() => console.log("Works!")}
                                activeOpacity={0.7}
                            />
                            <Text style={[styles.textShadow, { color: 'white', fontSize: 19 }]}>
                                {this.state.name}
                            </Text>
                            <Text style={[styles.textShadow, { color: '#E0E0E0', fontSize: 19 }]}>
                                {this.state.email}
                            </Text>
                        </View>
                    </ImageBackground>
                </View>

                <View>
                    <View>
                        <Text style={[styles.title, styles.textShadow]}>Cài Đặt</Text>
                        <View>
                            {
                                this.state.listSettingsItem.map((l, i) => (
                                    <ListItem
                                        key={i}
                                        hideChevron={true}
                                        title={l.name}
                                        leftIcon={{ name: l.icon, color: '#F44336' }}
                                    />
                                ))
                            }
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF"
    },
    coverPhoto: {
        width: "100%",
        height: 260
    },
    containerTextImage: {
        marginTop: "33%",
        marginLeft: '1.5%'
    },
    textShadow: {
        textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 1
    },
    title: {
        fontSize: 21,
        color: '#9E9E9E',
        marginLeft: '1%'
    }
});

//make this component available to the app
export default MainDrawer;