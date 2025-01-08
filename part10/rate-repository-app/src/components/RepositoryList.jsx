import { FlatList, View, StyleSheet, Text } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../../graphql/queries';
import RepositoryItem from './RepositoryItem';
import { useState } from 'react';
import HeaderWrapper from './HeaderWrap';
import useDebounce from './hooks/useDebounce';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState("CREATED_AT");
  const [orderDirection, setOrderDirection] = useState("DESC");
  const [search, setSearch] = useState("")

  const searchKeyword = useDebounce(search, 500)

  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    variables: { orderBy, orderDirection, searchKeyword },
    fetchPolicy: "cache-and-network",
  });

  const repositoryNodes = data ? data.repositories?.edges?.map(edge => edge.node) : [];

  return (
    <>
      {loading ? (
        null
      ) : error ? (
        <Text>Error occurred while loading data: {error.message}</Text>
      ) : (
        <FlatList
          ListHeaderComponent={
            <HeaderWrapper
              setOrderBy={setOrderBy}
              setOrderDirection={setOrderDirection}
              orderBy={orderBy}
              orderDirection={orderDirection}
              setSearch={setSearch}
              search={search}
            />
          }
          data={repositoryNodes}
          ItemSeparatorComponent={ItemSeparator}
          renderItem={({ item }) => <RepositoryItem item={item} />}
          keyExtractor={item => item.id}
        />
      )}
    </>
  );
};

export default RepositoryList;