export const parseVideoData = data => {
  if (Array.isArray(data)) {
    return data.reduce((acc, child) => {
      if (child.children) {
        return { ...acc, ...parseVideoData(child.children) }
      } else if (child.kind === "Video") {
        return {
          ...acc,
          [child.readable_id]: {
            youtube_id: child.youtube_id,
            title: child.title,
          },
        }
      }
    }, {})
  }

  if (data.children) {
    return parseVideoData(data.children)
  }

  if (data.kind === "Video") {
    return {
      [data.readable_id]: {
        youtube_id: data.youtube_id,
        title: data.title,
      },
    }
  }
}

export const fetchVideos = (data, setData) => {
  if (data.videos.length === 0 && data.error === null) {
    let videos = localStorage.getItem("videos")
    if (videos === null) {
      const url = "https://www.khanacademy.org/api/v1/topictree?kind=Video"
      fetch(url)
        .then(res => res.json())
        .then(json => {
          videos = Object.values(parseVideoData(json))
          localStorage.setItem("videos", JSON.stringify(videos))
          setData({
            videos,
            loading: false,
            error: null,
          })
        })
        .catch(err => {
          console.error(err)
          setData({
            videos: [],
            loading: false,
            error: "there was an error while fetching the data",
          })
        })
    } else {
      setData({
        videos: JSON.parse(videos),
        loading: false,
        error: null,
      })
    }
  }
}

// source https://hackernoon.com/copying-text-to-clipboard-with-javascript-df4d4988697f
export const copyToClipboard = str => {
  const el = document.createElement("textarea") // Create a <textarea> element
  el.value = str // Set its value to the string that you want copied
  el.setAttribute("readonly", "") // Make it readonly to be tamper-proof
  el.style.position = "absolute"
  el.style.left = "-9999px" // Move outside the screen to make it invisible
  document.body.appendChild(el) // Append the <textarea> element to the HTML document
  const selected =
    document.getSelection().rangeCount > 0 // Check if there is any content selected previously
      ? document.getSelection().getRangeAt(0) // Store selection if found
      : false // Mark as false to know no selection existed before
  el.select() // Select the <textarea> content
  document.execCommand("copy") // Copy - only works as a result of a user action (e.g. click events)
  document.body.removeChild(el) // Remove the <textarea> element
  if (selected) {
    // If a selection existed before copying
    document.getSelection().removeAllRanges() // Unselect everything on the HTML document
    document.getSelection().addRange(selected) // Restore the original selection
  }
}
