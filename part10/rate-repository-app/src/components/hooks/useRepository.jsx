import { useEffect, useState } from "react"

const useRepositories = () => {
  const [repositories, setRepositories] = useState()
  const [loading, setLoading] = useState()

  const fetchRepositories = async () => {
    setLoading(false)

    const response = await fetch("")
    const json = await response.json()
    setLoading(false)
    setRepositories(json)
  }

  useEffect(() => {
    fetchRepositories()
  }, [])

  return { repositories, loading, refetch: fetchRepositories }
}

export default useRepositories