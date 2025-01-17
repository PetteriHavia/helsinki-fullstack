export const onEndReach = (data, loading, fetchMore) => {

  console.log(data)
  const canFecthMore = !loading && data?.pageInfo.hasNextPage

  if (!canFecthMore) {
    return
  }

  fetchMore({
    variables: {
      after: data.pageInfo.endCursor
    }
  })
}