import * as Location from 'expo-location';
import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import { Fontisto } from "@expo/vector-icons";
// div 대신 text view 사용
// 모든 글자들은 text 태그에 사용
// 모든 css들을 동일하게 스타일 사용할 순 없음(대부분 가능)
// horizontal : prop
// 모바일기기에서 개발자도구 -> show element inspector로 각 요소 속성 확인 가능
// Dimensions : 모바일 화면 크기 알려주는 api
// icons.expo.fyi : 아이콘

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const API_KEY = "cf67c910a0c6839756ac95fc3a08cd5e";
const icons = {
  Clouds: "cloudy",
  Clear: "day-sunny",
  Atmosphere: "cloudy-gusts",
  Snow: "snow",
  Rain: "rains",
  Drizzle: "rain",
  Thunderstorm: "lightning",
};

export default function App() {
  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);

  const getWeather = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setOk(false);     //유저가 권한 요청을 거절했을 때
      return;
    }

    const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({ accuracy: 5 });
    const location = await Location.reverseGeocodeAsync({ latitude, longitude }, { useGoogleMaps: false });
    setCity(location[0]?.city ?? "Unknown");      //유저의 위치 가져오기

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`   //온도를 섭씨로 변환하기 위해 units=metric 추가
    );
    const json = await response.json();
    setDays(
      json.list.filter((weather) => weather.dt_txt.includes("03:00:00"))      // "00:00:00"는 표준시 00시를 기준, 한국은 표준시보다 9시간을 더해야함. 따라서 한국의 정오(낮 12시)로 설정하려면 "03:00:00"으로 설정
    );
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        horizontal
        contentContainerStyle={styles.weather}
      >
        {days.length === 0 ? (
          <View style={{ ...styles.day, alignItems: "center" }}>
            <ActivityIndicator color="white" style={{ marginTop: 10 }} size="large" />
          </View>
        ) : (
          days.map((day, index) => (
            <View key={index} style={styles.day}>
              <View style={{
                flexDirection:"row", 
                alignItems:"center",
                width:"100%",
                justifyContent:"space-between"
                }}>
                <Text style={styles.temp}>
                  {day.main?.temp ? day.main.temp.toFixed(1) : "N/A"}                                         
                  {/* toFixed(1) : 소수점 아래 한자리까지만 갖게 함 */}
                </Text>
                <Fontisto name={icons[day.weather[0]?.main]} size={68} color="black" />
              </View>
              <Text style={styles.description}>{day.weather[0]?.main ?? "No data"}</Text>
              <Text style={styles.tinyText}>{day.weather[0]?.description ?? "No description"}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "skyblue",
  },
  city: {
    flex: 1.2,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 58,
    fontWeight: "500",
  },
  weather: {},
  day: {
    width: SCREEN_WIDTH,
    alignItems: "center",
    alignItems: "flex-start",
    paddingHorizontal: 20,
  },
  temp: {
    marginTop: 50,
    fontWeight: "600",
    fontSize: 178,
    fontSize: 100,
  },
  description: {
    marginTop: -30,
    fontSize: 60,
    marginTop: -10,
    fontSize: 30,
    fontWeight: "500",
  },
  tinyText: {
    fontSize: 20,
    marginTop: -5,
    fontSize: 25,
    fontWeight: "500",
  },
});