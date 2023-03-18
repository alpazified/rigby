import { Command } from '../../structures/Command';
import { interactions } from '../../interactions';
import { Collection, Snowflake, Message } from 'discord.js';

export default new Command({
    interaction: interactions.boomerang,
    excute: async ({ interaction }) => {
        await interaction.reply({ content: `:boomerang: The boomerang has been thrown! Now we wait.`, fetchReply: true })
            .then(() => {
                interaction.channel.awaitMessages({ max: 5, time: 10000, errors: ['time'] })
                    .then(collected => {
                       interaction.followUp({ content: `${collected.first().author.tag} got struck by the boomerang!` })
                    })
                    .catch(() => {
                        interaction.followUp({ content: 'The boomerang made a sharp left and avoided everyone!' })
                    });
            });
        return;
        const users = [];
        // @ts-ignore
        
        
        let collectedMessages = (await interaction.channel.awaitMessages({ max: 5, time: 10000, errors: ['time'] })
            .then((collected) => { 
                    console.log(collected)
                    collected.map((m) => { return m;
                })})
            .then((m) => {
                // @ts-ignore
                if (m.author.id && !users.includes(m.author.id)) {
                    // @ts-ignore
                    users.push(m.author.id)
                }
            })
            .catch(async () => {
            await interaction.followUp({ content: `Looks like everyone avoided the boomerang!` });
        })) as Collection<Snowflake, Message>;
        console.log(users)
    }
});