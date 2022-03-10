'use strict'

const axios = require('axios')

const mcapi_message = require("./objects/message.js")
const mcapi_player = require("./objects/player.js")
const mcapi_command = require("./objects/command.js")

class RestClient {
    
    constructor(host, token) {
        this.host = `http://${host}/`
        this.token = token
    }

    end_url(url) {
        return this.host + url;
    }

    headers() {
        return {
            "Authorization": `Bot ${this.token}`
        }
    }

    async make_request(method, url, body = {}) {
        return await axios.request({
            url: this.end_url(url),
            method: method,
            headers: this.headers(),
            body: body,
            validateStatus: status => status < 500
        })
    }

    async make_request_data(method, url, body = {}) {
        return (await this.make_request(method, url, body)).data
    } 

    async get_player(id) {
        mcapi_player.validateID(id)
        return await this.make_request_data("GET", `player/${id}`)
    }

    async get_player_location(id) {
        mcapi_player.validateID(id)
        return await this.make_request_data("GET", `player/${id}/location`)
    }

    async send_message(selector, message) {
        mcapi_message.validateMessage(reason)
        return await this.make_request_data("POST", `player/${selector}/send`, body=message)
    }

    async ban(selector, reason) {
        mcapi_message.validateMessage(reason)
        return await this.make_request_data("PUT", `player/${selector}/ban`, body=reason)
    }

    async kick(selector, reason) {
        mcapi_message.validateMessage(reason)
        return await this.make_request_data("DELETE", `player/${selector}/kick`, body=reason)
    }

    async kill(selector) {
        return await this.make_request_data("DELETE", `player/${selector}/kill`)
    }

    async get_player_permission(id, permission) {
        mcapi_player.validateID(id)
        return await this.make_request_data("GET", `player/${id}/permission/${permission}`)
    }

    async get_player_inventory(id) {
        mcapi_player.validateID(id)
        return await this.make_request_data("GET", `player/${id}/inventory`)
    }

    async get_player_inventory_item(id, index) {
        mcapi_player.validateID(id)
        if (isNaN(index)) throw new Error("index is not a number")
        return await this.make_request_data("GET", `player/${id}/inventory/${index}`)
    }

    async get_link_request(id) {
        mcapi_player.validateID(id)
        return await this.make_request_data("GET", `player/${id}/link`)
    }

    async get_player_list() {
        return await this.make_request_data("GET", 'players/list')
    }

    async get_offline_player(id) {
        mcapi_player.validateID(id)
        return await this.make_request_data("GET", `offline/${id}`)
    }

    async ban_offline_player(selector, reason) {
        mcapi_message.validateMessage(reason)
        return await this.make_request_data("PUT", `offline/${selector}/ban`, body=reason)
    }

    async get_bot_linked(selector) {
        return await this.make_request_data("GET", `bot/${selector}/linked`)
    }

    async get_bot_permission(selector, permission) {
        return await this.make_request_data("GET", `bot/${selector}/permission/${permission}`)
    }

    async get_bot_target_permission(selector, permission, target) {
        mcapi_player.validateUUID(target)
        return await this.make_request_data("GET", `bot/${selector}/permission/${permission}/${target}`)
    }

    async create_command(command) {
        return await this.make_request_data("POST", "command", body=command)
    }

    async delete_command(path) {
        return await this.make_request_data("DELETE", `command/${mcapi_command.asPath(path)}`)
    }

    async get_world(id) {
        return await this.make_request_data("GET", `world/${id}`)
    }

    async get_block(id, x, y, z) {
        if (isNaN(x) || isNaN(y) || isNaN(z)) throw new Error("Coordinate is not number")
        return await this.make_request_data("GET", `world/${id}/block/${x}/${y}/${z}`)
    }

    async get_block_data(id, x, y, z) {
        if (isNaN(x) || isNaN(y) || isNaN(z)) throw new Error("Coordinate is not number")
        return await this.make_request_data("GET", `world/${id}/block/${x}/${y}/${z}/data`)
    }

    async get_block_inventory(id, x, y, z) {
        if (isNaN(x) || isNaN(y) || isNaN(z)) throw new Error("Coordinate is not number")
        return await this.make_request_data("GET", `world/${id}/block/${x}/${y}/${z}/data/inventory`)
    }

    async get_block_inventory(id, x, y, z, index) {
        if (isNaN(x) || isNaN(y) || isNaN(z)) throw new Error("Coordinate is not number")
        if (isNaN(index)) throw new Error("Index is not number")
        return await this.make_request_data("GET", `world/${id}/block/${x}/${y}/${z}/data/inventory/${index}`)
    }    

    async set_block_data_field(id, x, y, z, name, value) {
        if (isNaN(x) || isNaN(y) || isNaN(z)) throw new Error("Coordinate is not number")
        return await this.make_request_data("PUT", `world/${id}/block/${x}/${y}/${z}/data/${name}`, body=value)
    }

    async get_player_ender_chest(id) {
        mcapi_player.validateID(id)
        return await this.make_request_data("GET", `player/${id}/ender`)
    }

    async get_player_ender_chest_item(id, index) {
        if (isNaN(index)) throw new Error("Index is not number")
        return await this.make_request_data("GET", `player/${id}/ender/${index}`)
    }

    async get_entity(id) {
        mcapi_player.validateID(id)
        return await this.make_request_data("GET", `entity/${id}`)
    }

    async capture_entity(id) {
        mcapi_player.validateUUID(id)
        return await this.make_request_data("PUT", `entity/${id}/capture`)
    }

    async open_inventory(selector, menu_view) {
        return await this.make_request_data("PUT", `player/${selector}/inventory/open`, body=menu_view)
    }

    async close_inventory(selector) {
        return await this.make_request_data("DELETE", `player/${selector}/inventory/close`)
    }

}

exports.Client = RestClient