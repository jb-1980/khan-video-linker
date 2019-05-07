import React from "react"
import ReactDOM from "react-dom"
import {
  createButton,
  createCodeString,
  Code,
} from "../components/code-container"

const selectedVideos = ["dZPOCU10TqY", "3Xcae0OGavk"]
const expectedCodeString = `
<div>
    <iframe
    id="kaskill-ka-player"
    style="width:853px;height:480px;border:none;background-color:ghostwhite;margin:auto;"
    scrolling="no"
    src="https://www.khanacademy.org/embed_video?v=dZPOCU10TqY"
    ></iframe>
</div>
<div>
    
  <button
    onclick="changeVideo('https://www.khanacademy.org/embed_video?v=dZPOCU10TqY')"
    style="
      background: #5cb85c;
      border: thin solid #4cae4c;
      border-radius: 5px;
      padding: 5px 9px;
      margin: 0 3px;
      color: #fff;
    "
  >
    Video 1
  </button>

  <button
    onclick="changeVideo('https://www.khanacademy.org/embed_video?v=3Xcae0OGavk')"
    style="
      background: #5cb85c;
      border: thin solid #4cae4c;
      border-radius: 5px;
      padding: 5px 9px;
      margin: 0 3px;
      color: #fff;
    "
  >
    Video 2
  </button>

</div>
<script type="text/javascript">
    function changeVideo(url){
        document.getElementById("kaskill-ka-player").src = url;
    }
</script>
`

test("createButton renders correct string", () => {
  const expectedString = `
  <button
    onclick="changeVideo('https://www.khanacademy.org/embed_video?v=dZPOCU10TqY')"
    style="
      background: #5cb85c;
      border: thin solid #4cae4c;
      border-radius: 5px;
      padding: 5px 9px;
      margin: 0 3px;
      color: #fff;
    "
  >
    Video 1
  </button>
`
  const actualString = createButton(1, "dZPOCU10TqY")
  expect(expectedString).toEqual(actualString)
})

test("createCodeString renders correct string", () => {
  const actualString = createCodeString(selectedVideos)
  expect(expectedCodeString).toEqual(actualString)
})

test("Code component renders code string", () => {
  const div = document.createElement("div")
  ReactDOM.render(<Code selected={selectedVideos} />, div)
  const pre = div.querySelector("pre")
  expect(pre.textContent).toBe(expectedCodeString)
})
