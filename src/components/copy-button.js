import React, { useState, useEffect } from "react"
import { css } from "emotion"

import { copyToClipboard } from "../lib/utils"

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
