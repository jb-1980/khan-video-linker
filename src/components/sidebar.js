import React, { useState, useContext } from "react"
import { css } from "emotion"

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

export const Sidebar = ({ selectHandler, selected }) => {
  const [keyword, setKeyword] = useState("")
  const { videos, loading, error, refreshVideos } = useContext(DataContext)
  const { filteredVideos, selectedVideos } = videos.reduce(
    (acc, video) => {
      if (video.title.includes(keyword)) {
        acc.filteredVideos.push(video)
      }
      if (selected.includes(video.youtube_id)) {
        acc.selectedVideos.push(video)
      }
      return acc
    },
    { filteredVideos: [], selectedVideos: [] }
  )

  const videoList = filteredVideos.slice(0, 10).map(video => (
    <div
      key={video.youtube_id}
      className={videoClass}
      onClick={() =>
        selectHandler(prevState =>
          prevState.includes(video.youtube_id)
            ? prevState
            : [...prevState, video.youtube_id]
        )
      }
    >
      {video.title}
      <div className={addVideoClass}>+</div>
    </div>
  ))

  const selectedVideosList = selectedVideos.map(video => (
    <div
      key={video.youtube_id}
      className={videoClass}
      onClick={() =>
        selectHandler(prevState =>
          prevState.filter(v => v !== video.youtube_id)
        )
      }
    >
      {video.title}
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
        <h2> Retrieving video list ...</h2>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <>
          {selectedVideosList.length > 0 && (
            <>
              <h4>Selected Videos</h4>
              <div>{selectedVideosList}</div>
              <hr
                style={{
                  height: 3,
                  border: "none",
                  background: "#b0003a",
                }}
              />
            </>
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
          {videoList}
        </>
      )}
    </div>
  )
}
