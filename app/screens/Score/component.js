/* eslint-disable react-native/no-color-literals */
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Share from 'react-native-share';
import { BottomSheet } from 'react-native-btr';
import MainScreen from '../../components/layouts/MainScreen';
import Header from '../../components/elements/Header';
import Button from '../../components/elements/Button';
import Account from '../../../assets/svgs/Account';
import styles from './styles';
import { scale } from '../../utils/scaling';
import { blue, white, red } from '../../styles/colors';
import metrics from '../../constants/metrics';
import IMAGES from '../../configs/images';
import { ENDPOINT } from '../../configs';

export default class Component extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nilai: 0,
      falseAnswer: 0,
      trueAnswer: 0,
      soal: 5
    };
  }
  componentDidMount() {
    this._getparams();
  }
  _getparams = async () => {
    const { params } = this.props.navigation.state;
    const getindex = params ? params.index : 'umroh';
    const answer = params ? params.result : 'bakaa';
    const soal = params ? params.soal : 'bakaa';
    // this is fucking log
    // console.log(getindex);
    // const jawaban = `{answer: ${this.state.jawaban}}`;
    // console.log(answer)
    // console.log(JSON.stringify(answer));
    // console.log(JSON.parse(answer));
    // const jsonanswer = await JSON.stringify(answer);
    // console.log(jsonanswer)
    // console.log(result);
    const result = await ENDPOINT.getNilai(getindex, answer);
    this.setState({
      soal,
      nilai: result.data.value,
      trueAnswer: result.data.trueAnswer,
      falseAnswer: result.data.falseAnswer
    });
  };
  _onPress = () => {
    this.props.navigation.navigate('Beranda');
  };
  _onPressShareWA = async () => {
    try {
      const shareOptions = {
        title: 'Share via',
        message: `Can You Beat My Score ? This is my score :  ${this.state.nilai}`,
        social: Share.Social.WHATSAPP
      };
      Share.shareSingle(shareOptions);
    } catch (error) {
      alert(error.message);
    }
  };
  _onPressShareFB = async () => {
    try {
      const shareOptions = {
        title: 'Share via',
        message: `Can You Beat My Score ? This is my score :  ${this.state.nilai}`,
        social: Share.Social.FACEBOOK
      };
      Share.shareSingle(shareOptions);
    } catch (error) {
      alert(error.message);
    }
  };
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: this.state.nilai > 50 ? blue.blue_40 : red.red_40
        }}
      >
        <View style={{ paddingTop: 32, paddingLeft: 16 }}>
          <Text style={{ fontSize: scale(32), color: white }}>
            {this.state.nilai > 50 ? 'Mantabbb :D' : 'Hmmmm :('}
          </Text>
          <View
            style={{
              paddingRight: 15,
              marginTop: scale(10),
              marginRight: 15,
              width: scale(329),
              borderBottomColor: white,
              borderBottomWidth: 1
            }}
          />
          <Text style={{ fontSize: scale(18), color: white, marginTop: 30 }}>Skor Kamu</Text>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 140, color: white, fontWeight: 'bold', lineHeight: 191 }}>
              {this.state.nilai}
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <View
                style={{
                  width: scale(56),
                  borderColor: white,
                  backgroundColor: this.state.nilai > 50 ? '#94A9FF' : '#FF7787',
                  borderWidth: 3,
                  height: scale(56),
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: scale(24)
                }}
              >
                <Text style={{ color: white }}>{this.state.trueAnswer}</Text>
                <Text style={{ color: white }}>Benar</Text>
              </View>
              <View
                style={{
                  width: scale(56),
                  borderColor: white,
                  backgroundColor: this.state.nilai > 50 ? '#94A9FF' : '#FF7787',
                  borderWidth: 3,
                  height: scale(56),
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: scale(24)
                }}
              >
                <Text style={{ color: white }}>{this.state.falseAnswer}</Text>
                <Text style={{ color: white }}>Salah</Text>
              </View>
              <View
                style={{
                  width: scale(56),
                  borderColor: white,
                  backgroundColor: this.state.nilai > 50 ? '#94A9FF' : '#FF7787',
                  borderWidth: 3,
                  height: scale(56),
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: scale(24)
                }}
              >
                <Text style={{ color: white }}>{this.state.soal}</Text>
                <Text style={{ color: white }}>Soal</Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            backgroundColor: white,
            width: metrics.screenWidth,
            marginTop: scale(24),
            height: scale(240),
            borderTopRightRadius: 50,
            borderTopLeftRadius: 50,
            padding: scale(24)
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: '800' }}>Yuk share ke temen-temen kamu</Text>
          <View style={{ flexDirection: 'row', marginBottom: scale(43) }}>
            <TouchableOpacity onPress={this._onPressShareWA} style={{ marginLeft: scale(17) }}>
              <Image
                style={{ width: scale(52), height: scale(50), marginTop: scale(16) }}
                source={IMAGES.iconWa}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={this._onPressShareFB} style={{ marginLeft: scale(17) }}>
              <Image
                style={{ width: scale(52), height: scale(50), marginTop: scale(16) }}
                source={IMAGES.iconFb}
              />
            </TouchableOpacity>
          </View>
          <Button
            customContainer={{
              height: 50,
              width: scale(300),
              backgroundColor: this.state.nilai > 50 ? '#5D7DFF' : '#FF4057',
              borderWidth: 1,
              borderColor: this.state.nilai > 50 ? '#5D7DFF' : '#FF4057'
            }}
            title="Selesai"
            customText={{ color: '#FFF' }}
            onPress={this._onPress}
          />
        </View>
      </View>
    );
  }
}
