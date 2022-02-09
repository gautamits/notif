import React, {useEffect} from 'react'

export default function useGist<T extends {[key: string]: object | string}>(src: string){
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(null)
  const [files, setFiles] = React.useState<{[key in keyof T]: T[key]} | null>(null)

  useEffect(() => {
    fetch(src)
      .then(results => {
        return results.json();
      })
      .then(data => {
        return Object.entries(data.files).reduce((agg: any, [fileName, file]: any) => {
            try {
                agg[fileName] = JSON.parse(file.content)
            }catch(err){
                agg[fileName] = file.content
            }
            return agg
        }, {})
      }).then((json) => {
        setFiles(json)
      })
      .catch(setError)
      .finally(()=>{
          setLoading(false)
      })

      return () => {
          setFiles(null)
          setError(null)
          setLoading(true)
      }
  }, [src])
  return [files, loading, error]
}