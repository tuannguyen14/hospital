import React, { Component } from 'react';
import { Dimensions, StyleSheet, View, ScrollView, TouchableOpacity, Image, ImageBackground, Modal } from 'react-native';
import { Text, Header } from 'react-native-elements';
import { List, ListItem } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import axios from 'axios';
import { AppColors } from '../styles/AppColors.js';
import { IPServer } from '../Server/IPServer.js';
import { Font } from '../styles/Font.js';
import Styles from '../styles/Styles.js';
let { width, height } = Dimensions.get("window");

export default class AllItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      listAllItems: {},
      label: this.props.navigation.state.params.label,
      visiblModalFilter: false
    };
  }

  onOpenDetailItem(data) {
    if (global.isLogin) {
      if ((this.state.user.userId) !== (data._idDoctor)) {
        axios({
          method: 'get',
          url: IPServer.ip + '/location/' + data._id,
          responseType: 'stream'
        });
      }
    }
    let numberOFView = data.countView + 1;
    data.countView = numberOFView
    this.props.navigation.navigate("ItemScreen", { item: data });
  }

  componentWillMount() {
    this.setState({
      user: global.user,
      listAllItems: this.props.navigation.state.params.allLocations
    });
  }

  componentDidMount() {
    this.props.navigation.addListener(
      'didFocus',
      payload => {
        this.componentWillMount();
      }
    );
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Header
          innerContainerStyles={{ alignItems: 'center' }}
          outerContainerStyles={{ borderBottomWidth: 0 }}
          backgroundColor={AppColors.color}
          leftComponent={{ icon: 'keyboard-backspace', color: '#fff', size: 31, onPress: () => this.props.navigation.goBack() }}
          centerComponent={{ text: 'ĐỊA ĐIỂM', style: { color: '#fff', fontSize: 20 } }}
        />

        <View style={styles.bigLine}></View>

        <View style={{ flex: 5, backgroundColor: 'white' }}>
          {
            this.state.listAllItems.map((l, i) => (
              <ListItem
                style={{ marginLeft: 0, marginTop: 0 }}
                key={i}>
                <TouchableOpacity style={{ flex: 1 }} onPress={() => this.onOpenDetailItem(l)} >
                  <View style={[styles.rowView, { marginLeft: '3%', marginBottom: '1%' }]}>
                    {
                      l.isOpen ?
                        <Image
                          source={require('../img/open.png')}
                          style={styles.imageOpenClose} />
                        :
                        <Image
                          source={require('../img/close.png')}
                          style={styles.imageOpenClose} />
                    }
                    <ImageBackground style={styles.imageRating}>
                      <Text style={{ fontFamily: Font.textFont, color: 'white' }}>{(l.totalRatingAvg + "") == '0' ? '-' : ((l.totalRatingAvg + "").includes('.') ? l.totalRatingAvg : l.totalRatingAvg + '.0')}</Text>
                    </ImageBackground>
                    <View style={{ marginTop: '1%', marginLeft: '3%' }}>
                      <Text style={{ fontFamily: Font.textFont, color: 'black' }}>{l.name}</Text>
                      <Text style={{ fontFamily: Font.textFont, }}>{l.address.street + ', ' + l.address.ward + ', ' + l.address.district + ', ' + l.address.city}</Text>
                    </View>
                  </View>
                  <Image
                    source={{ uri: l.imageUrls[0].replace('http://localhost:3000', IPServer.ip) }}
                    style={{ width: width, height: height / 3 }} />

                  <View style={[styles.rowView, {}]}>
                    <View style={[styles.rowView, { alignItems: 'center', justifyContent: 'center', }]}>
                      <Icon name={'eye'} size={15} color={'gray'} />
                      <Text style={{ fontFamily: Font.textFont, marginLeft: '3%' }}>{l.countView}</Text>
                    </View>
                    <View style={[styles.rowView, { alignItems: 'center', justifyContent: 'center', }]}>
                      <Icon name={'comment'} size={15} color={'gray'} />
                      <Text style={{ fontFamily: Font.textFont, marginLeft: '3%' }}>{l.reviews.length}</Text>
                    </View>
                    <View style={[styles.rowView, { alignItems: 'center', justifyContent: 'center', }]}>
                      <Icon name={'camera'} size={15} color={'gray'} />
                      <Text style={{ fontFamily: Font.textFont, marginLeft: '3%' }}>{l.imageUrls.length}</Text>
                    </View>
                    <View style={[styles.rowView, { alignItems: 'center', justifyContent: 'center', }]}>
                      <SimpleLineIcons name={'user-following'} size={15} color={'gray'} />
                      <Text style={{ fontFamily: Font.textFont, marginLeft: '3%' }}>{l.numberOfFollows}</Text>
                    </View>
                  </View>
                  <View style={styles.bigLine}></View>
                </TouchableOpacity>
              </ListItem>
            ))
          }
        </View>
      </ScrollView >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0e0e0'
  },
  imageOpenClose: {
    height: 64,
    width: 64,
    position: 'absolute',
    top: 47,
    right: 0,
    zIndex: 101
  },
  image: {
    width: width,
    height: height / 3
  },
  title: {
    fontWeight: 'bold',
    color: 'black'
  },
  rowView: {
    flexDirection: 'row'
  },
  imageRating: {
    backgroundColor: AppColors.color,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    borderRadius: 100
  },
  bigLine: {
    backgroundColor: '#BDBDBD',
    width: width,
    height: height * 0.01,
    marginTop: '6%'
  }
});
