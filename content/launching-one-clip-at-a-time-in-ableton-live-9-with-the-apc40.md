---
title: Launching One Clip at a Time in Ableton Live 9 with the APC40
date: 2014-05-25
site: Medium
url: https://medium.com/python-language/d2b72985d2a9
image:
    file: launching-one-clip-at-a-time-in-ableton-live-9-with-the-apc40.jpg
    creator: Steve Docious
    url: https://www.flickr.com/photos/stevedocious/6911962924
---
While designing my live audio setup for Psychedelic Friendship Bingo, I ran into a frustrating limitation. I wanted to launch clips in Ableton Live 9 using the button matrix on an APC40, and I wanted to automatically limit the matrix to playing one clip at a time. In other words, pressing a button on the matrix would send a ‘stop’ signal to all other clips in the matrix. This is not possible with Live and the APC out of the box.

To achieve this, I had to dive into Live’s MIDI Remote Scripts: Python scripts installed with Live that perform all of the complex automatic mapping of commonly used controllers like the APC.
