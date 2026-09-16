import { FlatList, View, StyleSheet, Text } from 'react-native';
import { useParams } from 'react-router-native';
import RepositoryItem from './RepositoryItem';
import ReviewItem from './ReviewItem';
import useRepository from '../hooks/useRepository';

const styles = StyleSheet.create({ separator: { height: 10 } });

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryInfo = ({ repository }) => (
  <RepositoryItem item={repository} showButton />
);

const SingleRepository = () => {
  const { id } = useParams();
  const { repository, loading } = useRepository(id);

  if (loading || !repository) {
    return (
      <View style={{ padding: 15 }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const reviews = repository.reviews
    ? repository.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default SingleRepository;