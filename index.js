require('dotenv').config();
const { Client, IntentsBitField, ActivityType, EmbedBuilder } = require('discord.js');
const eventHandler = require('./handlers/eventHandler');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

let status = [
    {
      name: 'trading',
      type: ActivityType.Playing,
    },
    {
      name: 'Wom videos',
      type: ActivityType.Watching,
    },
    {
      name: 'to Wom videos',
      type: ActivityType.Listening,
    },
  ];

    client.on('interactionCreate', (interaction) => {
        if (!interaction.isChatInputCommand()) return;
      
        if (interaction.commandName === 'embed') {
          const embed = new EmbedBuilder()
            .setTitle('Hello')
            .setDescription('Enjoy Wom')
            .setColor('Random')
            .addFields(
              {
                name: 'Field title',
                value: 'Some random value',
                inline: true,
              },
              {
                name: '2nd Field title',
                value: 'Some random value',
                inline: true,
              }
            );
      
          interaction.reply({ embeds: [embed] });
        }
      });
      
      client.on('messageCreate', (message) => {
        if (message.content === 'embed') {
          const embed = new EmbedBuilder()
            .setTitle('Embed title')
            .setDescription('This is an embed description')
            .setColor('Random')
            .addFields(
              {
                name: 'Field title',
                value: 'Some random value',
                inline: true,
              },
              {
                name: '2nd Field title',
                value: 'Some random value',
                inline: true,
              }
            );
      
          message.channel.send({ embeds: [embed] });
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

    client.on('interactionCreate', (interaction) => {
        if (!interaction.isChatInputCommand()) return;
      
        if (interaction.commandName === 'hey') {
          return interaction.reply('hey!');
        }
      
        if (interaction.commandName === 'ping') {
          return interaction.reply('Pong!');
        }
      });

eventHandler(client);

client.login(process.env.TOKEN);