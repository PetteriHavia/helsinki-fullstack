import { FlatList, View, StyleSheet, Text } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../../graphql/queries';
import RepositoryItem from './RepositoryItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES, { fetchPolicy: "cache-and-network" })

  const repositoryNodes = data ? data.repositories?.edges?.map(edge => edge.node) : []

  return (
    <>
      {loading ? (
        <Text>Data Loading</Text>
      ) : error ?
        (<Text>Error occured while loading data: {error.message}</Text>)
        : (<FlatList
          data={repositoryNodes}
          ItemSeparatorComponent={ItemSeparator}
          renderItem={({ item }) => <RepositoryItem item={item} />}
          keyExtractor={item => item.id}
        />
        )
      }
    </>
  )
};


export default RepositoryList;