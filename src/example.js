const mcapi = require('./index.js')

rest_client = new mcapi.rest.Client("localhost:8080", "3b2b37ff8fe24696b9cc1a82ad8120730000001645012819763")

rest_client.get_player("jenya705").then(r => console.log(r))