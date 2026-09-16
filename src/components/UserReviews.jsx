import { FlatList, View, StyleSheet, Text, Pressable, Alert } from 'react-native';
import { useNavigate } from 'react-router-native';
import useMe from '../hooks/useMe';
import useDeleteReview from '../hooks/useDeleteReview';
import ReviewItem from './ReviewItem';

const styles = StyleSheet.create({
  separator: { height: 10 },
  actions: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: 'white', paddingBottom: 15 },
  viewButton: { backgroundColor: '#0366d6', borderRadius: 4, padding: 10, flex: 1, marginHorizontal: 10, alignItems: 'center' },
  deleteButton: { backgroundColor: '#d73a4a', borderRadius: 4, padding: 10, flex: 1, marginHorizontal: 10, alignItems: 'center' },
  buttonText: { color: 'white', fontWeight: 'bold' },
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewWithActions = ({ review, onView, onDelete }) => (
  <View>
    <ReviewItem review={review} />
    <View style={styles.actions}>
      <Pressable style={styles.viewButton} onPress={() => onView(review.repository.id)}>
        <Text style={styles.buttonText}>View repository</Text>
      </Pressable>
      <Pressable style={styles.deleteButton} onPress={() => onDelete(review.id)}>
        <Text style={styles.buttonText}>Delete review</Text>
      </Pressable>
    </View>
  </View>
);

const UserReviews = () => {
  const { me, loading, refetch } = useMe(true);
  const [deleteReview] = useDeleteReview();
  const navigate = useNavigate();

  if (loading || !me) {
    return (
      <View style={{ padding: 15 }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const reviews = me.reviews ? me.reviews.edges.map((edge) => edge.node) : [];

  const handleDelete = (id) => {
    Alert.alert('Delete review', 'Are you sure you want to delete this review?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', onPress: async () => { await deleteReview(id); refetch(); } },
    ]);
  };

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => (
        <ReviewWithActions review={item} onView={(id) => navigate(`/${id}`)} onDelete={handleDelete} />
      )}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default UserReviews;
