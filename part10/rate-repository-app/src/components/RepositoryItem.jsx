import { View, StyleSheet, Image } from "react-native"
import Text from "./Text"

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: "100%",
    gap: 10
  },
  flexRow: {
    flexDirection: "row",
    gap: 16
  },
  basicInfo: {
    gap: 10,
    flexWrap: "wrap",
    flexShrink: 1
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  language: {
    color: "#ffffff",
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8
  },
  statistics: {
    alignItems: "center",
  },
  avatar: {
    width: 50,
    height: 50
  }
})

const StatItem = ({ value, text }) => {

  const formatNumber = (num) => {
    if (isNaN(num)) return "0"
    return num > 1000 ? (num / 1000).toFixed(1) + "k" : `${num}`
  }

  return (
    <View style={styles.statistics}>
      <Text fontWeight="bold">{formatNumber(value)}</Text>
      <Text>{text}</Text>
    </View>
  )
}

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.card}>
      <View style={styles.flexRow}>
        <Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }} />
        <View style={styles.basicInfo}>
          <Text fontWeight="bold">{item.fullName}</Text>
          <Text>{item.description}</Text>
          <Text style={styles.language} textBackground="blue">{item.language}</Text>
        </View>
      </View>
      <View style={styles.statsContainer}>
        <StatItem text="Stars" value={item.stargazersCount} />
        <StatItem text="Forks" value={item.forksCount} />
        <StatItem text="Reviews" value={item.reviewCount} />
        <StatItem text="Rating" value={item.ratingAverage} />
      </View>
    </View>
  )
}

export default RepositoryItem