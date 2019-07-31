import React from "react"
import ReactDOM from "react-dom"
import { css } from "emotion"

import { Navbar } from "./components/navbar"
import { Sidebar } from "./components/sidebar"
import { CodeContainer } from "./components/code-container"
import { DataProvider } from "./contexts/data-context"
import "./styles.css"

const App = () => {
  const [selectedVideos, setSelectedVideos] = React.useState([])

  return (
    <>
      <Navbar />
      <div
        className={css`
          display: flex;
          min-height: calc(100vh - 50px);
          background: #eee;
          text-align: left;
        `}
      >
        <Sidebar
          selectedVideos={selectedVideos}
          setSelectedVideos={setSelectedVideos}
        />
        <CodeContainer selectedVideos={selectedVideos} />
      </div>
    </>
  )
}

const rootElement = document.getElementById("root")
ReactDOM.render(
  <DataProvider>
    <App />
  </DataProvider>,
  rootElement
)
