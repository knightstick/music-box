import { useEffect, useState } from "react"
import { useDebounce } from '@/lib/hooks'
import Link from "next/link"

type Track = {
  id: string
  name: string
}

export const Search = () => {
  const [search, setSearch] = useState<string>('')
  const debouncedSearch = useDebounce(search, 300)
  const [results, setResults] = useState<Track[]>([])

  const searchFor = async (search: string) => {
    const response = await fetch(`/api/search?q=${search}`)
    const results = await response.json()
    return results
  }

  useEffect(() => {
    if (debouncedSearch) {
      searchFor(debouncedSearch).then((results) => {
        console.log(results)
        setResults(results)
      })
    }
  }, [debouncedSearch])


  return (
    <>
      <input type="text" onChange={(e) => setSearch(e.target.value)} value={search} />
      <div>
        {results.length > 0 && (
          <ul>
            {results.map((result) => (
              <li key={result.id}>
                <Link href={`/tracks/${result.id}`}>
                  {result.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}
