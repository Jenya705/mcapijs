const mcapi = require('./index.js')

rest_client = new mcapi.rest.Client("localhost:8080", "3b2b37ff8fe24696b9cc1a82ad8120730000001645012819763")

rest_client.get_player("jenya705").then(console.log)

gateway_client = new mcapi.gateway.Client("localhost:8080", "3b2b37ff8fe24696b9cc1a82ad8120730000001645012819763")
gateway_client.on('join', console.log)
gateway_client.connect()