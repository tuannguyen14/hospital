import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, Image, TouchableOpacity, Dimensions, ScrollView, FlatList } from "react-native";
import { InputGroup, Input } from 'native-base';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Entypo';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-easy-toast'

let { width, height } = Dimensions.get("window");

const ImagePicker = require("react-native-image-picker");

const options = {
  title: "Chọn ảnh từ:",
  quality: 0.01,
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

export default class BasicInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.navigation.state.params.item.name,
      address: this.props.navigation.state.params.item.address,
      phoneNumber: this.props.navigation.state.params.item.phoneNumber,
      website: this.props.navigation.state.params.item.department,
      listUploadImage: this.props.navigation.state.params.item.imageUrls
    };
    console.log(this.state.listUploadImage)
  }

  uploadPhoto() {
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        const listUploadImage = this.state.listUploadImage;
        let listUploadImageTemp = listUploadImage;
        for (const o in listUploadImage) {
          if (listUploadImage[o].uri < Number.MAX_SAFE_INTEGER) {
            listUploadImageTemp = []
          }
          this.setState({
            listUploadImage: []
          });
          break;
        }
        const uriTemp = { uri: response.uri };
        listUploadImageTemp.push({ uri: uriTemp });
        console.log(listUploadImageTemp);
        this.setState({ listUploadImage: listUploadImageTemp });
      }
    });
  }

  render() {
    const { navigate, goBack } = this.props.navigation;
    return (
      <ScrollView style={styles.container}>
        <ImageBackground source={require('../../img/backgroundLogin.png')} style={styles.backgroundImage}>
          <TouchableOpacity onPress={() => goBack()}>
            <View style={styles.backButtonContainer}>
              <Icon name={'arrow-long-left'} size={27} color={'white'} />
            </View>
          </TouchableOpacity>
          <View style={styles.containerLogo}>
            <Image
              source={require("../../img/hospitalLogo.png")}
              style={styles.logo}
            />
          </View>

          <View style={styles.inputGroup}>
            <View>
              <InputGroup>
                <Icon name={'user'} size={27} color={'white'} />
                <Input
                  style={{ color: "white", marginLeft: "3%" }}
                  placeholder="Tên địa điểm"
                  placeholderTextColor="rgba(255,255,255,255)"
                  autoCorrect={false}
                  onChangeText={name => this.setState({ name })}
                  value={this.state.name}
                  returnKeyType={"next"}
                  onSubmitEditing={() => { this.addressInput._root.focus() }} />
              </InputGroup>

              <InputGroup>
                <Icon name={'address'} size={27} color={'white'} />
                <Input
                  style={{ color: "white", marginLeft: "3%" }}
                  placeholder="Địa chỉ"
                  placeholderTextColor="rgba(255,255,255,255)"
                  autoCorrect={false}
                  onChangeText={address => this.setState({ address })}
                  value={this.state.address}
                  ref={(input) => { this.addressInput = input; }}
                  returnKeyType={"next"}
                  onSubmitEditing={() => { this.phoneNumberInput._root.focus() }} />
              </InputGroup>

              <InputGroup>
                <Icon name={'phone'} size={27} color={'white'} />
                <Input
                  style={{ color: "white", marginLeft: "3%" }}
                  placeholder="Số điện thoại"
                  placeholderTextColor="rgba(255,255,255,255)"
                  onChangeText={phoneNumber => this.setState({ phoneNumber })}
                  value={this.state.phoneNumber}
                  keyboardType="numeric"
                  autoCorrect={false}
                  ref={(input) => { this.phoneNumberInput = input; }}
                  onSubmitEditing={() => { this.emailInput._root.focus() }}
                />
              </InputGroup>

              <InputGroup>
                <IconMaterialIcons name={'public'} size={27} color={'white'} />
                <Input
                  style={{ color: "white", marginLeft: "3%" }}
                  placeholder="Website"
                  placeholderTextColor="rgba(255,255,255,255)"
                  onChangeText={website => this.setState({ website })}
                  value={this.state.website}
                  autoCorrect={false}
                  ref={(input) => { this.websiteInput = input; }}
                />
              </InputGroup>

            </View>

            <View style={{ marginTop: '3%' }}>
              <FlatList
                data={this.state.listUploadImage}
                horizontal={true}
                renderItem={({ item: rowData }) => {
                  return (
                    <View style={styles.rowView}>
                      <Image
                        style={styles.imageUpload}
                        source={rowData.uri} />
                      <View style={styles.lineVertical} />
                    </View>
                  );
                }}
                keyExtractor={(item, index) => index.toString()}
              />

            </View>
            <View style={[styles.containerLogo]} >
              <Button
                onPress={() => this.uploadPhoto()}
                title='Thêm hình'
                buttonStyle={{
                  backgroundColor: "#E57373",
                  width: 150,
                  height: 30,
                  borderColor: "transparent",
                  borderWidth: 0,
                  borderRadius: 5,
                }}
              />
            </View>
            <View style={styles.buttonGroup}>
              <Button
                onPress={() => navigate("WorkingTimeScreen", {})}
                title='Tiếp theo'
                buttonStyle={{
                  backgroundColor: "#E57373",
                  width: 300,
                  height: 45,
                  borderColor: "transparent",
                  borderWidth: 0,
                  borderRadius: 5,
                }}
              />
            </View>
          </View>
          <Toast ref="toast" />
        </ImageBackground >
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rowView: {
    flexDirection: 'row'
  },
  backButtonContainer: {
    marginLeft: "5%",
    marginTop: "1%"
  },
  inputGroup: {
    marginLeft: "6%",
    marginRight: "6%",
  },
  containerLogo: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: '10%'
  },
  buttonGroup: {
    marginTop: "7%",
    marginLeft: "4%",
    marginBottom: '30%'
  },
  backgroundImage: {
    width: width,
    height: height
  },
  text: {
    color: 'white',
    fontSize: 18
  },
  line: {
    backgroundColor: '#E0E0E0',
    height: height * 0.001,
    marginTop: '3%'
  },
  lineVertical: {
    backgroundColor: 'black',
    width: height * 0.005
  },
  imageUpload: {
    width: width * 0.35,
    height: height * 0.2
  },
});