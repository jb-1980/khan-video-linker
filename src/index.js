import React, { useState, useContext } from "react"
import ReactDOM from "react-dom"
import { css } from "emotion"

import { Navbar } from "./components/navbar"
import { Sidebar } from "./components/sidebar"
import { CodeContainer } from "./components/code-container"
import { DataProvider, DataContext } from "./contexts/data-context"
import "./styles.css"

const App = () => {
  const [selected, setSelected] = useState([])

  return (
    <div>
      <Navbar />
      <div
        className={css`
          display: flex;
          min-height: calc(100vh - 50px);
          background: #eee;
          text-align: left;
        `}
      >
        <Sidebar selectHandler={setSelected} selected={selected} />
        <CodeContainer selected={selected} />
      </div>
    </div>
  )
}

const rootElement = document.getElementById("root")
ReactDOM.render(
  <DataProvider>
    <App />
  </DataProvider>,
  rootElement
)
