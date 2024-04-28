//import { StatusBar } from 'expo-status-bar';  //statusbar는 시계, 배터리, wifi를 의미함
import React from "react";
import {View} from 'react-native';
// div 대신 text view 사용
// 모든 글자들은 text 태그에 사용
// 모든 css들을 동일하게 스타일 사용할 순 없음(대부분 가능)

export default function App() {
  return (
    <View style={{flex : 1}}>
      <View style={{flex : 1, backgroundColor:"blue"}}></View>
      <View style={{flex : 1, backgroundColor:"orange"}}></View>
      <View style={{flex : 1, backgroundColor:"yellow"}}></View>
    </View>
  );
}

// 기본적으로 모든 view는 Flex Container
// RN에서 flex direction의 기본값은 column
// RN에서는 height, width 사용 지양. flex를 이용한 비율 지향. (부모영역에 flex값 주고 자식들의 비율 설정)