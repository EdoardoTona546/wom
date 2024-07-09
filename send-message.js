require('dotenv').config();
const { Client, IntentsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

const roles = [
    {
        id: '1242548526026850334',
        label: '📕Wom Notifs'
    },
    {
        id: '1256173128996880405',
        label: '📗Fabian Notifs'
    },
    {
        id: '1256173230234931230',
        label: '📙Damjan Notifs'
    },
    {
        id: '1256173290633039882',
        label: '📘Faycie Notifs'
    },
]

client.on('ready', async (c) => {
  try {
    const channel = await client.channels.cache.get('1242545426079682570');
    if (!channel) return;

    const row = new ActionRowBuilder();

    roles.forEach((role) => {
        row.components.push(
            new ButtonBuilder().setCustomId(role.id).setLabel(role.label).setStyle(ButtonStyle.Primary)
        )
    })

    await channel.send({
        content: 'Click the button(s) to be assigned analyst alert.',
        components: [row],
    });
    process.exit();
  } catch (error) {
    console.log(error);
  }
});

client.on('interactionCreate', async (interaction) => {
  try {
    if (!interaction.isButton()) return;
    await interaction.deferReply({ ephemeral: true });

    const role = interaction.guild.roles.cache.get(interaction.customId);
    if (!role) {
      interaction.editReply({
        content: "I couldn't find that role",
      });
      return;
    }

    const hasRole = interaction.member.roles.cache.has(role.id);

    if (hasRole) {
      await interaction.member.roles.remove(role);
      await interaction.editReply(`The role ${role} has been removed.`);
      return;
    }

    await interaction.member.roles.add(role);
    await interaction.editReply(`The role ${role} has been added.`);
  } catch (error) {
    console.log(error);
  }
});

client.login(process.env.TOKEN);