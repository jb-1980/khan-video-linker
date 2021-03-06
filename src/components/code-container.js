import React from "react"
import { css } from "emotion"

import { Pills } from "./pills"
import { CopyButton } from "./copy-button"

const baseUrl = "https://www.khanacademy.org/embed_video?v="

export const createButton = (i, youtubeId) => `
  <button
    onclick="changeVideo('${baseUrl + youtubeId}')"
    style="
      background: #089de3;
      border: thin solid #089de3;
      border-radius: 5px;
      padding: 5px 9px;
      margin: 0 3px;
      color: #fff;
    "
  >
    Video ${i}
  </button>
`

export const createCodeString = selected => `
<div>
    <iframe
    title="kaskill-ka-player"
    id="kaskill-ka-player"
    style="width:853px;height:480px;border:none;background-color:ghostwhite;margin:auto;"
    scrolling="no"
    src="https://www.khanacademy.org/embed_video?v=${selected[0]}"
    ></iframe>
</div>
<div>
    ${selected.map((video, i) => createButton(i + 1, video)).join("")}
</div>
<script type="text/javascript">
    function changeVideo(url){
        document.getElementById("kaskill-ka-player").src = url;
    }
</script>
`

export const CodeContainer = ({ selectedVideos }) => {
  const selected = selectedVideos.map(v => v.youtubeid)
  return (
    <div
      className={css`
        width: 60%;
        text-align: left;
        padding: 10px;
      `}
    >
      {selected.length === 0 ? (
        <h1>Please select a video</h1>
      ) : (
        <Pills
          tabs={[
            { id: "code", name: "Code" },
            { id: "rendered", name: "Rendered Code" },
          ]}
          render={view =>
            view === "code" ? (
              <Code selected={selected} />
            ) : (
              <RenderedCode selected={selected} />
            )
          }
        />
      )}
    </div>
  )
}

export const Code = ({ selected }) => {
  const renderString = createCodeString(selected)

  return (
    <>
      <CopyButton str={renderString} />
      <pre data-testid="code-string" style={{ fontFamily: "monospace" }}>
        {renderString}
      </pre>
    </>
  )
}

const RenderedCode = ({ selected }) => {
  const [view, setView] = React.useState(selected[0])
  return (
    <div>
      <div>
        <iframe
          id="kaskill-ka-player"
          title="kaskill-ka-player"
          style={{
            width: "853px",
            height: "480px",
            border: "none",
            backgroundColor: "ghostwhite",
            margin: "auto",
          }}
          scrolling="no"
          src={baseUrl + view}
        />
      </div>
      <div>
        {selected.map((video, i) => (
          <button
            key={video}
            onClick={() => setView(video)}
            className={css`
              background: #089de3;
              border: thin solid #089de3;
              border-radius: 5px;
              padding: 5px 9px;
              margin: 0 3px;
              color: #fff;
            `}
          >
            Video {i + 1}
          </button>
        ))}
      </div>
    </div>
  )
}
