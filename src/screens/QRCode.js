import React, { Component } from 'react'
import { Dimensions, View, Image, Text } from 'react-native';
import { Header } from 'react-native-elements';
import { AppColors } from '../styles/AppColors.js';
import { Font } from '../styles/Font.js';
import Styles from '../styles/Styles.js';
import AwesomeButton from 'react-native-really-awesome-button';

let { width, height } = Dimensions.get("window");

export default class QRCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: this.props.navigation.state.params.url
        }
    }

    onCalcel() {
        const body =
        {
            idPatient: global.user.userId,
            idLocation: this.state.location._id,
            dateBooking: dateFormat
        };
        console.log(body)
        // axios.post(IPServer.ip + '/reservation/cancel', body).then((response) => {
        //     console.log(response);
        //     this.props.navigation.navigate('BookingScreen', { location: this.state.location, dataBookingTime: response.data });
        // }).catch(err => {
        //     console.log(err)
        // });
    }

    render() {
        return (
            <View>
                <Header
                    innerContainerStyles={{ alignItems: 'center' }}
                    outerContainerStyles={{ borderBottomWidth: 0 }}
                    backgroundColor={AppColors.color}
                    leftComponent={{ icon: 'keyboard-backspace', color: '#fff', size: 31, onPress: () => this.props.navigation.navigate('RootDrawer') }}
                    centerComponent={{ text: 'MÃ THỨ TỰ', style: [Styles.header, { color: '#fff' }] }}
                />
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '3%' }}>
                    <Image source={{ uri: `${this.state.url}` }} style={{ width: width, height: height / 2 }} />
                    <Text style={{ marginTop: '3%' }}>Mang mã này đến phòng khám để lấy số thứ tự</Text>
                </View>
                <View style={{ marginTop: '7%', alignItems: 'center' }}>
                    <AwesomeButton
                        width={width * 0.8}
                        backgroundColor={AppColors.backgroundColor}
                        borderRadius={7}
                        onPress={() => this.onCalcel()}>
                        <Text style={{ fontSize: 16, fontFamily: Font.textFont, fontWeight: 'bold' }}>Hủy đặt</Text>
                    </AwesomeButton>
                </View>
            </View>
        )
    }
}