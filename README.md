# BucketList client
This is interactive travel and adventure planner for those with wanderlust. The user engages with the app by creating an account and clicking on the map to create custom markers. The user can then reference the map displaying their custom markers and start planning their next adventure.

## Motivation
I moved to New York City from Utah and wanted this app. Google docs, Yelp, etc. can only get you so far. I wanted a way to record information about things I was interested in and have it all displayed on a map.

## Tech used
- React.js
- Redux.js
- Leaflet
- OpenStreetMap API
- react-leaflet

## Features
- Custom markers that respond to click events on the map both for new marker creation and to render an existing marker's popup
- Secure OAuth using JWT and persisting all marker changes associated with the current user to a Rails backend
- Full CRUD ability for each piece of information (title, description, category) associated with each marker
- Search component that, on submit, sends the user's query to the OpenStreetMaps API
- react-leaflet map component with zoom/click-and-drag navigation capabilities
- Dynamic map center that changes based on user search
- Filter buttons to render some of all of the markers on the map

## Setup
1. First, ensure that you've cloned down the [BucketList backend](https://github.com/tristramjones/bucket-lister-backend) and followed the setup instructions there.
2. Clone down this repo and make sure you have both node and npm installed globally on your machine.
3. Run `npm i && npm start` from the main client directory.
4. Select "Yes" when prompted to run the client on a different port.

## Contribute
Thanks for your interest in contributing to BucketList!

The following is a set of guidelines for contributing to the BucketList client.

### Getting started
Review the documentation for [OpenStreetMap](https://wiki.openstreetmap.org/wiki/Nominatim) and [react-leaflet](https://react-leaflet.js.org/).

### Issues
Before submitting a new issue ensure that one has not already been created by reviewing the open issues. If your bug is unique to the currently open issues, submit a new one here.

#### Write detailed information
Detailed information is very helpful to understand an issue.

For example:
- How to reproduce the issue, step-by-step.
- The expected behavior (or what is wrong).
- Screenshots displaying the buggy behavior.
- The operating system.

### Pull requests
Pull Requests are always welcome. Ensure that you've run `npm i` before creating an issue or submitting a pull request. Ensure the PR description clearly describes the problem and solution. It should include:
- The operating system on which you tested.
- The relevant issue number, if applicable.
