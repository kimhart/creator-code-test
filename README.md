# Vimeo Cue Generator

[View here!](https://kimhart.github.io/creator-code-test/)

Usually I'd set up a Node server to run this so I could use ES6 syntax with Babel, Gulp/Webpack and Sass — but for the sake of simplicity, I kept it all static files with Vanilla JS. This sacrifices some file structure/organization and the ability to store the data long-term, but it made sense to keep it simple for this small project.

This could've been written more elegantly with React (yay JSX & virtual DOM!), but I chose to solve it without extra frameworks/libraries as per the instructions.

### This page features the following:

- A clean interface that mimics Vimeo's existing site
- The option to add views to one sample video
- Instructions for the user to add a cue
- A template to add a cue at a specific time stamp. The template must include a valid time + a message in order to submit
- A list of the existing cues in order of appearance in the video
- Cues that surface as an overlay on the video at the appropriate times
- The option to delete any of the cues

### Features I would add if I built this on a server/ with more elegant frameworks / I had unlimited time
- Adding markdown capability to the cue input (to allow images, links, etc.)
- Persistent storage
- Changing video along with its cues
- The option to edit existing cues
- A sidebar that contains all the videos a user has added cues to
- Ways to save several versions of the same videos with different cues 
- Make the cue duration customizable

### Known Bugs to Fix
- Adding more than one cue at the same time stamp will cause them to list more than once
- "The Play request was interrupted by a call to pause" flags when you pause before the video has completely loaded.
- Not really a bug... but DRY up some of the functions


