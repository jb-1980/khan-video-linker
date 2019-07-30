import React, { useState, useContext } from "react"
import { css } from "emotion"

import { useVideos } from "../lib/hooks"
import { DataContext } from "../contexts/data-context"

const videoClass = css`
  color: #e91e63;
  margin: 10px 0;
  cursor: pointer;
  font-family: monospace;
`
const addVideoClass = css`
  width: 20px;
  height: 20px;
  color: #fff;
  background: #e91e63;
  float: right;
  font-size: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Sidebar = () => {
  const [keyword, setKeyword] = useState("")
  const { videos, loading, error, refreshVideos } = useVideos()
  const { selectedVideos, setSelectedVideos } = useContext(DataContext)

  // Use these to populate the two sidebar areas
  const filteredVideos = Object.entries(videos).reduce((acc, [key, title]) => {
    const hasSubstring = title.toLowerCase().includes(keyword.toLowerCase())
    if (hasSubstring && !selectedVideos.includes(key)) {
      acc.push({ key, title })
    }

    return acc
  }, [])

  const videoList = filteredVideos.slice(0, 10).map(({ key, title }) => (
    <div
      key={key}
      data-testid={key}
      className={videoClass}
      onClick={() => {
        if (!selectedVideos.includes(key)) {
          setSelectedVideos([...selectedVideos, key])
        }
      }}
    >
      {title}
      <div className={addVideoClass}>+</div>
    </div>
  ))

  const selectedVideosList = selectedVideos.map(key => (
    <div
      key={key}
      className={videoClass}
      onClick={() => setSelectedVideos(selectedVideos.filter(v => v !== key))}
    >
      {videos[key]}
      <div className={addVideoClass}>-</div>
    </div>
  ))

  return (
    <div
      className={css`
        width: 40%;
        background: #fff;
        padding: 10px;
      `}
    >
      {loading ? (
        <h2>
          Retrieving video list from Khan Academy.
          <br /> This could take a minute ...
        </h2>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <>
          {selectedVideosList.length > 0 && (
            <div data-testid="selected-videos">
              <h4>Selected Videos</h4>
              <div data-testid="video-list">{selectedVideosList}</div>
              <hr
                style={{
                  height: 3,
                  border: "none",
                  background: "#b0003a",
                }}
              />
            </div>
          )}
          <div>
            <h4 style={{ display: "inline-block", marginRight: 20 }}>
              Video finder
            </h4>
            <button
              className={css`
                display: inline-block;
                background: #e91e63;
                border: none;
                color: #fff;
                padding: 5px 7px;
                border-radius: 5px;
                font-family: monospace;
                font-size: 1em;
              `}
              onClick={refreshVideos}
            >
              Refresh List
            </button>
          </div>
          <input
            onChange={e => setKeyword(e.target.value)}
            value={keyword}
            placeholder="Type to find a video"
            type="text"
            className={css`
              border: none;
              border-bottom: thick solid #e91e63;
              width: 90%;
              margin: 10px 0;
            `}
          />
          <div data-testid="video-list">{videoList}</div>
        </>
      )}
    </div>
  )
}
