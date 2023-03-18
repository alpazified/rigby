import { client } from ".."
import { Event } from "../structures/Event"

export default new Event('debug', async (info) => {
    if (client.debugMode) {
        console.log(info)
    }
})