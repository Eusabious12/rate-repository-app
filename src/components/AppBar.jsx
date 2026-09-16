import { View, StyleSheet, ScrollView, Text, Pressable } from 'react-native';
import Constants from 'expo-constants';
import { Link } from 'react-router-native';
import { useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';
import useSignOut from '../hooks/useSignOut';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',
    flexDirection: 'row',
  },
  tab: { color: 'white', fontWeight: 'bold', fontSize: 16, padding: 15 },
});

const AppBar = () => {
  const { data } = useQuery(ME);
  const signOut = useSignOut();
  const me = data?.me;

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/">
          <Text style={styles.tab}>Repositories</Text>
        </Link>
        {me ? (
          <Pressable onPress={signOut}>
            <Text style={styles.tab}>Sign out</Text>
          </Pressable>
        ) : (
          <Link to="/signin">
            <Text style={styles.tab}>Sign in</Text>
          </Link>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;