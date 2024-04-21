//import { StatusBar } from 'expo-status-bar';  //statusbar는 시계, 배터리, wifi를 의미함
import { StyleSheet, Text, View } from 'react-native';
// div 대신 text view 사용
// 모든 글자들은 text 태그에 사용
// 모든 css들을 동일하게 스타일 사용할 순 없음(대부분 가능)

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello :)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize : 28,
    color: "skyblue"
  }
});
