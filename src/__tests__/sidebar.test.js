import "jest-dom/extend-expect"
import React from "react"
import {
  render,
  cleanup,
  waitForElement,
  testVideos,
  fireEvent,
} from "./test-utils"
import { Sidebar } from "../components/sidebar"

afterEach(cleanup)

const titles = Object.values(testVideos)

test("It renders selected elements", async () => {
  localStorage.setItem("videos", JSON.stringify(testVideos))
  const { queryByText, queryByTestId } = render(<Sidebar />)
  const video1 = await waitForElement(() => queryByText(titles[0]))
  const video2 = await waitForElement(() => queryByText(titles[1]))
  // There should only be the two elements rendered
  expect(video1).toBeInTheDocument()
  expect(video2).toBeInTheDocument()
  expect(queryByTestId("video-list").children.length).toBe(2)
})

test("It renders the selected video elements after click", async () => {
  const { queryByText, queryByTestId } = render(<Sidebar />)

  // selected-videos should not appear on initial render
  const videoList = await waitForElement(() => queryByTestId("video-list"))
  expect(videoList).toBeInTheDocument()
  expect(queryByTestId("selected-videos")).not.toBeInTheDocument()

  fireEvent.click(queryByText(titles[0]))
  // now that a video has been clicked, selected-videos section should now appear
  // and Video 1 should be only child
  const selectedVideos = queryByTestId("selected-videos")
  expect(selectedVideos).toBeInTheDocument()
  expect(selectedVideos.children.length).toBe(1)
  expect(selectedVideos.children[0]).toHaveTextContent(titles[0])
})
