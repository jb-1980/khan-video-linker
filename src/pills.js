import React, { useState } from "react"
import { css } from "emotion"

const listPill = css`
  display: inline-block;
  margin: 0 10px;
  position: relative;
  padding: 0 0 5px 0;
  cursor: pointer;
`

const selected = css`
  font-weight: bold;
  color: #b0003a;
  &:after {
    content: " ";
    position: absolute;
    width: 0;
    height: 15px;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-bottom: 7px solid #b0003a;
    left: 50%;
    margin-left: -7px;
    bottom: -3px;
    display: block;
  }
`

export const Pills = ({ render, tabs }) => {
  const [view, setView] = useState(tabs[0].id)

  return (
    <>
      <div
        style={{
          listStyle: "none",
          display: "flex",
          flexDirection: "row",
          width: "100%",
        }}
      >
        {tabs.map(tab => (
          <li
            key={tab.id}
            className={css`
              ${listPill};
              ${view === tab.id && selected};
            `}
            onClick={() => setView(tab.id)}
          >
            {tab.name}
          </li>
        ))}
      </div>
      <hr
        style={{
          margin: 0,
          height: 3,
          background: "#b0003a",
          width: "100%",
          border: "none",
        }}
      />
      {render(view)}
    </>
  )
}
