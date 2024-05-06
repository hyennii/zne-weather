import * as Location from 'expo-location';
import React, {useState, useEffect} from "react";
import {View, StyleSheet, Text, ScrollView, Dimensions} from 'react-native';
// div 대신 text view 사용
// 모든 글자들은 text 태그에 사용
// 모든 css들을 동일하게 스타일 사용할 순 없음(대부분 가능)
// horizontal : prop
// 모바일기기에서 개발자도구 -> show element inspector로 각 요소 속성 확인 가능
// Dimensions : 모바일 화면 크기 알려주는 api

const { width:SCREEN_WIDTH } = Dimensions.get('window');

export default function App() {
  const [city, setCity] = useState("Loading...")
  const [location, setLocation] = useState();
  const [ok, setOk] = useState(true);
  const ask = async () => {
    const granted = await Location.requestForegroundPermissionsAsync()
    if (!granted){
      setOk(false); //유저가 권한 요청을 거절했을 때
    }
    
    const {coords:{latitude,longitude}} = await Location.getCurrentPositionAsync({accuracy:5})
    const location = await Location.reverseGeocodeAsync({latitude,longitude}, {useGoogleMaps:false})
    setCity(location[0].city);  //유저의 위치 가져오기

  };
  useEffect(() => {
    ask();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView showsHorizontalScrollIndicator={false} pagingEnabled horizontal ContentContainerStyle={styles.weather}> 
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles= StyleSheet.create({
  container : {
    flex : 1, 
    backgroundColor: "skyblue"
  },
  city : {
    flex : 1,
    justifyContent : "center",
    alignItems : "center"
  },
  cityName : {
    fontSize : 40,
    fontWeight : "500"
  },
  weather : {
  },
  day : {
    width : SCREEN_WIDTH,
    alignItems : "center",
  },
  temp : {
    fontSize : 170,
    marginTop : 50
  },
  description : {
    fontSize : 60,
    marginTop : -30
  }
})
// 기본적으로 모든 view는 Flex Container
// RN에서 flex direction의 기본값은 column
// RN에서는 height, width 사용 지양. flex를 이용한 비율 지향. (부모영역에 flex값 주고 자식들의 비율 설정)
// ScrollView에 스타일 주려면 style prop이 아닌, ContentContainerStyle 써야함