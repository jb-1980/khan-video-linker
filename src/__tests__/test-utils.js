// test-utils.js
import React from "react"
import { render } from "react-testing-library"
import { DataContext } from "../contexts/data-context"

export const testVideos = {
  dZPOCU10Tq: "Comparing place values",
  "3Xcae0OGavk": "Comparing whole number place values",
}

const customRender = (node, ...options) => {
  return render(
    <DataContext.Provider value={{ selectedVideos: Object.keys(testVideos) }}>
      {node}
    </DataContext.Provider>,
    ...options
  )
}

// re-export everything
export * from "react-testing-library"

// override render method
export { customRender as render }
