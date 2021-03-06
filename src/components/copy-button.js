import React, { useState, useEffect } from "react"
import { css } from "emotion"

export const CopyButton = ({ str }) => {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (copied) {
      setTimeout(() => setCopied(false), 1000)
    }
  })

  return (
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
        float: right;
        margin: 7px;
        width: 150px;
      `}
      onClick={() => {
        copyToClipboard(str)
        setCopied(true)
      }}
    >
      <span
        className={css`
          transition: opacity 3s cubic-bezier(0.02, 1.24, 0.27, 0.93);
          opacity: ${copied ? 0.5 : 1};
        `}
      >
        {copied ? "copied" : "copy to clipboard"}
      </span>
    </button>
  )
}

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
