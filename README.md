AfterLands

## API

#### Get all rooms near the passed location

`GET /getallnear/:lat,:lon`

Result: List of rooms.

    {
        "response": "ok",
        "rooms": [
            {
                "name": "Hello world",
                "active": true,
                "mood": "",
                "_id": "53d455a8c027df9e7e1ea25c",
                "songs": [],
                "__v": 0,
                "location": {
                    "lat": 37.79713,
                    "lon": -122.40464
                },
                "created_at": "2014-07-27T01:28:08.828Z",
                "distance": 92.28804970634626
            }
        ]
    }

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
