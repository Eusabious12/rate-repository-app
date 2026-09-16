import { View, Text, Image, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  container: { padding: 15, backgroundColor: 'white' },
  topContainer: { flexDirection: 'row' },
  avatar: { width: 48, height: 48, borderRadius: 5, marginRight: 15 },
  infoContainer: { flex: 1 },
  fullName: { fontWeight: 'bold', fontSize: 16, marginBottom: 5, fontFamily: theme.fonts.main },
  description: { color: '#586069', marginBottom: 5, fontFamily: theme.fonts.main },
  statCount: { fontWeight: 'bold', fontFamily: theme.fonts.main },
  language: {
    color: 'white',
    backgroundColor: '#0366d6',
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  statsContainer: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 15 },
  statItem: { alignItems: 'center' },
  statCount: { fontWeight: 'bold' },
  statLabel: { color: '#586069' },
});

const formatCount = (count) =>
  count >= 1000 ? `${(count / 1000).toFixed(1)}k` : String(count);

const StatItem = ({ label, count }) => (
  <View style={styles.statItem}>
    <Text style={styles.statCount}>{formatCount(count)}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container} testID="repositoryItem">
      <View style={styles.topContainer}>
        <Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }} />
        <View style={styles.infoContainer}>
          <Text style={styles.fullName}>{item.fullName}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.language}>{item.language}</Text>
        </View>
      </View>
      <View style={styles.statsContainer}>
        <StatItem label="Stars" count={item.stargazersCount} />
        <StatItem label="Forks" count={item.forksCount} />
        <StatItem label="Reviews" count={item.reviewCount} />
        <StatItem label="Rating" count={item.ratingAverage} />
      </View>
    </View>
  );
};

export default RepositoryItem;