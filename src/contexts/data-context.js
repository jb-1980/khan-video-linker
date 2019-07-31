import React from "react"

const DataContext = React.createContext({})

const initialState = {
  videos: [],
  loading: true,
  error: null,
}

const DataProvider = ({ children }) => {
  const [data, setData] = React.useState(initialState)

  const refreshVideos = () => {
    localStorage.removeItem("khan-academy-videos")
    setData(initialState)
  }

  React.useEffect(() => {
    let isCurrent = true
    if (isCurrent) {
      fetchVideos(data, setData)
    }

    return () => {
      isCurrent = false
    }
  }, [data])

  return (
    <DataContext.Provider value={{ ...data, refreshVideos }}>
      {children}
    </DataContext.Provider>
  )
}

const useDataContext = () => React.useContext(DataContext)

export const parseVideoData = data => {
  if (Array.isArray(data)) {
    return data.reduce((acc, child) => {
      if (child.children) {
        return { ...acc, ...parseVideoData(child.children) }
      } else if (child.kind === "Video") {
        return {
          ...acc,
          [child.youtube_id]: {
            title: child.title,
            youtubeid: child.youtube_id,
          },
        }
      }
      return acc
    }, {})
  }

  if (data.children) {
    return parseVideoData(data.children)
  }

  if (data.kind === "Video") {
    return {
      [data.youtube_id]: {
        title: data.title,
        youtubeid: data.youtube_id,
      },
    }
  }
}

export const fetchVideos = (data, setData) => {
  // ran into COR problem with Khan Academy API. So I had to provision a
  // proxy server. Because this is on a codesandbox free server, it hibernates.
  // That makes it a really slow call.
  // When https://github.com/Khan/khan-api/issues/139 is resolved change back to
  // url = "https://khanacademy.org/api/..."
  if (data.videos.length === 0 && data.error === null) {
    let videos = localStorage.getItem("khan-academy-videos")
    if (videos === null) {
      const url =
        "https://jgilgen.pythonanywhere.com/api/v1/topictree?kind=Video"
      fetch(url)
        .then(res => res.json())
        .then(json => {
          videos = Object.values(parseVideoData(json))
          localStorage.setItem("khan-academy-videos", JSON.stringify(videos))
          setData({
            videos,
            loading: false,
            error: null,
          })
        })
        .catch(err => {
          console.error(err)
          setData({
            videos: [],
            loading: false,
            error: "Error fetching data 😞",
          })
        })
    } else {
      setData({
        videos: JSON.parse(videos),
        loading: false,
        error: null,
      })
    }
  }
}

export { useDataContext, DataProvider }
