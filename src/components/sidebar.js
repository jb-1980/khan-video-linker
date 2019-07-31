import React from "react"
import { css } from "emotion"

import { AtomSpinner } from "./atom-spinner"
import { useDataContext } from "../contexts/data-context"

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

export const Sidebar = ({ selectedVideos, setSelectedVideos }) => {
  const [keyword, setKeyword] = React.useState("")
  const { videos, loading, error, refreshVideos } = useDataContext()

  // Use these to populate the two sidebar areas
  const filteredVideos = videos.reduce((acc, { youtubeid, title }) => {
    const hasSubstring = title.toLowerCase().includes(keyword.toLowerCase())
    const videoSelected = selectedVideos.find(v => v.youtubeid === youtubeid)
    if (hasSubstring && !videoSelected) {
      acc.push({ youtubeid, title })
    }

    return acc
  }, [])

  const videoList = filteredVideos.slice(0, 10).map(({ youtubeid, title }) => (
    <div
      key={youtubeid}
      data-testid={youtubeid}
      className={videoClass}
      onClick={() => {
        const checkVideo = selectedVideos.find(v => v.youtubeid === youtubeid)
        if (!checkVideo) {
          setSelectedVideos([...selectedVideos, { youtubeid, title }])
        }
      }}
    >
      {title}
      <div className={addVideoClass}>+</div>
    </div>
  ))

  const selectedVideosList = selectedVideos.map(({ youtubeid, title }) => (
    <div
      key={youtubeid}
      className={videoClass}
      onClick={() =>
        setSelectedVideos(selectedVideos.filter(v => v.youtubeid !== youtubeid))
      }
    >
      {title}
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <h2 style={{ margin: 0 }}>Retrieving videos</h2>
          <h4 style={{ margin: 0 }}>(this could take a minute)</h4>
          <AtomSpinner />
        </div>
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
