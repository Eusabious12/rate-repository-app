import { useState } from 'react';
import { FlatList, View, StyleSheet, Pressable, TextInput } from 'react-native';
import { useNavigate } from 'react-router-native';
import { Picker } from '@react-native-picker/picker';
import { useDebounce } from 'use-debounce';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: { height: 10 },
  search: { margin: 10, padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 4, backgroundColor: 'white' },
});

export const RepositoryListContainer = ({ repositories, onPressItem, header }) => {
  const nodes = repositories ? repositories.edges.map((e) => e.node) : [];
  return (
    <FlatList
      data={nodes}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListHeaderComponent={header}
      renderItem={({ item }) => (
        <Pressable onPress={() => onPressItem && onPressItem(item.id)}>
          <RepositoryItem item={item} />
        </Pressable>
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

const RepositoryList = () => {
  const [sort, setSort] = useState('latest');
  const [search, setSearch] = useState('');
  const [keyword] = useDebounce(search, 500);
  const navigate = useNavigate();

  const orderBy = sort === 'latest' ? 'CREATED_AT' : 'RATING_AVERAGE';
  const orderDirection = sort === 'lowest' ? 'ASC' : 'DESC';

  const { repositories } = useRepositories({ orderBy, orderDirection, searchKeyword: keyword });

  const header = (
    <View>
      <TextInput style={styles.search} placeholder="Search" value={search} onChangeText={setSearch} />
      <Picker selectedValue={sort} onValueChange={setSort}>
        <Picker.Item label="Latest repositories" value="latest" />
        <Picker.Item label="Highest rated repositories" value="highest" />
        <Picker.Item label="Lowest rated repositories" value="lowest" />
      </Picker>
    </View>
  );

  return <RepositoryListContainer repositories={repositories} onPressItem={(id) => navigate(`/${id}`)} header={header} />;
};

export default RepositoryList;
