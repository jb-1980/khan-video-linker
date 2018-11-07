# Khan Video Linker

## The problem

While developing courses in our LMS, we want to embed videos from Khan Academy.
While there exist a multitude of solutions for embedding videos, they don't
solve the problem of easily selecting a set of videos and embedding a them
as a selectable playlist on the content page.

## This solution

This application will retrieve data from the Khan Academy endpoint `/api/v1/topictree?kind=Video`.
Once retrieved, the data are stored in `localStorage` for quick access the next round.
These parsed data can then be quickly searched and, when selected, are added to a
code snippet that can be copied and pasted into the LMS content page.
