import React, { useState, useEffect } from "react"

import { fetchVideos } from "./utils"

const DataContext = React.createContext({})

const initialState = {
  videos: [],
  loading: true,
  error: null,
}

const DataProvider = ({ children }) => {
  const [data, setData] = useState(initialState)

  const refreshVideos = () => {
    localStorage.removeItem("videos")
    setData(initialState)
  }

  useEffect(() => fetchVideos(data, setData))

  return (
    <DataContext.Provider value={{ ...data, refreshVideos }}>
      {children}
    </DataContext.Provider>
  )
}

export { DataContext, DataProvider }
