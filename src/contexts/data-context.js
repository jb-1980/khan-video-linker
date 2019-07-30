import React, { useState } from "react"

const DataContext = React.createContext({})

const DataProvider = ({ children }) => {
  const [selectedVideos, setSelectedVideos] = useState([])
  return (
    <DataContext.Provider
      value={{
        selectedVideos,
        setSelectedVideos,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export { DataContext, DataProvider }
