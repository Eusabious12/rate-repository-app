import { View, StyleSheet, ScrollView, Text } from 'react-native';
import Constants from 'expo-constants';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',
    flexDirection: 'row',
  },
  tab: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    padding: 15,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/">
          <Text style={styles.tab}>Repositories</Text>
        </Link>
        <Link to="/signin">
          <Text style={styles.tab}>Sign in</Text>
        </Link>
      </ScrollView>
    </View>
  );
};

export default AppBar;