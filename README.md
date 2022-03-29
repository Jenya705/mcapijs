# mcapijs
mcapi library for nodejs

# Installation
`npm install mcapilibjs`

# Example usage

```js
const mcapi = require('mcapijslib')

rest_client = new mcapi.rest.Client(
    "localhost:8080", // host 
    "3b2b37ff8fe24696b9cc1a82ad8120730000001645012819763" // bot token
)

rest_client.get_player("jenya705").then(console.log)

// gateway is listening events from server
gateway_client = new mcapi.gateway.Client(
    "localhost:8080", // host 
    "3b2b37ff8fe24696b9cc1a82ad8120730000001645012819763" // bot token
)
gateway_client.on('player_join', console.log)
gateway_client.on('player_quit', console.log)
gateway_client.connect()
```
