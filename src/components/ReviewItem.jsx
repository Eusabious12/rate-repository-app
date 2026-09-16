import { View, Text, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  container: { padding: 15, backgroundColor: 'white', flexDirection: 'row' },
  ratingContainer: { width: 48, height: 48, borderRadius: 24, borderWidth: 2, borderColor: '#0366d6', alignItems: 'center', justifyContent: 'center', marginRight: 15 },
  rating: { color: '#0366d6', fontWeight: 'bold' },
  contentContainer: { flex: 1 },
  title: { fontWeight: 'bold', fontFamily: theme.fonts.main },
  date: { color: '#586069', marginBottom: 5 },
});

const ReviewItem = ({ review }) => {
  const date = new Date(review.createdAt).toLocaleDateString();
  const title = review.repository ? review.repository.fullName : review.user.username;
  return (
    <View style={styles.container}>
      <View style={styles.ratingContainer}>
        <Text style={styles.rating}>{review.rating}</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>{date}</Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

export default ReviewItem;
