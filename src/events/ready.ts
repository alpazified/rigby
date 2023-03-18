import { Event } from '../structures/Event';
import { registerWorkers } from '../workers';

export default new Event('ready', async (client) => {
	console.log(`Logged in as ${client.user.tag}`);
	const user = await client.users.fetch("784250655212044308");
	const userChannel = await (await user.createDM()).fetch();
	const userDms = await userChannel.messages.fetch()
	userDms.forEach((msg) => {
		if (msg.deletable) {
			msg.delete()
		}
	})
	await registerWorkers(30 * 1000);
});
