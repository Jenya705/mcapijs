'use strict'

const axios = require('axios')

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
        return await this.make_request_data("GET", `player/${id}`)
    }

}

exports.Client = RestClient