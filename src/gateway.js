const W3CWebSocket = require('websocket').w3cwebsocket;
const zlib = require('zlib')

class GatewayClient {

    constructor(host, token) {
        this.host = `ws://${host}/tunnel`
        this.token = token
        this.subscriptions = {}
    }

    on(type, func) {
        if (this.subscriptions[type]) {
            this.subscriptions[type].push(func)
        }
        else {
            this.subscriptions[type] = [func]
            if (this.client) {
                this.send_object({subscriptions: [type]})
            }
        }
    }

    async send_object(obj) {
        let json = JSON.stringify(obj)
        let deflated = zlib.deflateSync(json)
        this.client.send(deflated)
    }

    async connect() {
        if (this.client) {
            console.log("Closing connection")
            this.client.close()
        }
        this.client = new W3CWebSocket(this.host)
        this.client.onerror = (err) => this.handle_error(err)
        this.client.onmessage = (message) => this.handle_message(message)
        this.client.onclose = () => this.handle_close()
        this.client.onopen = () => this.handle_open()
    }

    async handle_open() {
        await this.send_object({token: this.token})
        if (!this.subscriptions) return;
        let subscriptions_array = Object.keys(this.subscriptions)
        await this.send_object({subscriptions: subscriptions_array})
    }

    async handle_error(err) {
        console.error("Handled exception:")
        console.error(err)
    }

    async handle_close() {
        console.error("Trying to reconnect in 1 second")
        setTimeout(() => this.connect(), 1000)
    }

    async handle_message(message) {
        let string_message = zlib.inflateSync(message.data).toString()
        let object_message = JSON.parse(string_message)
        let end_type = object_message.type ? object_message.type : "subscriptions";
        if (this.subscriptions[end_type]) {
            this.subscriptions[end_type].forEach(element => 
                element(object_message)
            );
        }
    }
}

exports.Client = GatewayClient