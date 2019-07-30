import { useState, useEffect } from "react"
import { fetchVideos } from "./utils"

export const useVideos = () => {
  const initialState = JSON.parse(localStorage.getItem("videos"))
  const [videos, setVideos] = useState(initialState)
  const [loading, setLoading] = useState(videos === null)
  const [error, setError] = useState(false)

  const refreshVideos = () => {
    setLoading(true)
    setVideos(null)
    setError(false)
  }

  useEffect(() => {
    let isCurrent = true
    if (videos === null) {
      fetchVideos()
        .then(videos => {
          if (isCurrent) {
            localStorage.setItem("videos", JSON.stringify(videos))
            setVideos(videos)
            setLoading(false)
            setError(false)
          }
        })
        .catch(() => {
          setVideos([])
          setLoading(false)
          setError("Error fetching videos!")
        })
    }

    return () => {
      isCurrent = false
    }
  }, [videos])

  return {
    videos: videos === null ? {} : videos,
    refreshVideos,
    loading,
    error,
  }
}
