AfterLands

## API

#### Get all rooms near the passed location

`GET /getallnear/:lat,:lon`

Result: List of rooms.

#### Make a new room

`POST /make`

Required params:

`room_name`: name of the room
`lat`, `lon`: location of the room

#### Add a song to a room

`POST /addsong`

Required params:

`song`: Rdio song object
`room_id`: Object ID of the room as in Mongo
