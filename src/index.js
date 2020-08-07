const Discord = require('discord.js')
const urban = require('urban')
const translate = require('@vitalets/google-translate-api')
const fetch = require('node-fetch')
const jsonData = require('./champs.json')
require('dotenv').config()
const date = new Date()
const fs = require('fs')
const client = new Discord.Client()
let cooldown = new Set()
let cds = 60

const channelID = '459046128307142666'
const channelID2 = '689544151296901151'
const devChannel = '689772327701184543'

const riot = process.env.RIOT_API
const servers = {}
const ytdl = require('ytdl-core')

client.once('ready', () => {
  console.log('Ready !')
  /*for (var i = 0; i < jsonData.length; i++) {
    if (jsonData[i].key == 64) {
      console.log(jsonData[i])
    }
  }
    */
})

client.on('message', async (msg) => {
  if (msg.channel.id === channelID || channelID2 /*devChannel*/) {
    if (msg.content.toLowerCase() === 'sa') {
      await msg.channel.send('ve aleynâ ve aleykum selam kardeş')
    }
    if (msg.content.toLowerCase().includes('random')) {
      var str = msg.content
      var matches = str.match(/(\d+)/)
      if (matches[0] > 10) {
        await msg.channel.send('`OHA AMINAKOYIM`').delete({
          timeout: 10000,
        })
      } else {
        var r = Math.floor(1 + Math.random() * matches[0])
        ;(await msg.channel.send('`Kardesim ' + r + ' geldi`')).delete({
          timeout: 10000,
        })
      }
    }

    if (msg.content.toLowerCase().startsWith('!p')) {
      if (cooldown.has(msg.author.id)) {
        msg.delete()
        msg.reply('yavas lan ibne')
      }

      cooldown.add(msg.author.id)
      var user = msg.mentions.users.first()
      var usr = user.id

      var move = 0
      for (move; move < 8; move++) {
        msg.guild.member(usr).voice.setChannel('427912422893027328')
        msg.guild.member(usr).voice.setChannel('441274968584749057')
      }
    }

    setTimeout(() => {
      cooldown.delete(msg.author.id)
    }, cds * 1000)

    if (msg.content.toLowerCase().includes('!poll')) {
      var x = msg.content

      console.log(msg.content.substring(6, x.length))
      var desc = msg.content.substring(6, x.length)

      const embed = new Discord.MessageEmbed()
        .setColor(0xffffff)
        .setFooter('Birini sec')
        .setDescription(desc)
        .setTitle(`${msg.author.username} enayisi anket baslatti`)

      let bmsg = await msg.channel.send(embed)

      await bmsg.react('✅')
      await bmsg.react('❌')
    }

    if (msg.content.toLowerCase().includes('!t ')) {
      var rawtr = msg.content
      var tra = msg.content.substring(3, rawtr.length)
      translate(tra, {
        to: 'tr',
      }).then((res) => {
        msg.channel.send('`🔎 ' + res.text + '`')
      })
    }
    if (msg.content.toLowerCase().includes('!u ')) {
      var urbraw = msg.content
      var urbr = msg.content.substring(3, urbraw.length)
      urban(urbr).first((json) => {
        console.log(json)

        const embed2 = new Discord.MessageEmbed()
          .setColor('RANDOM')
          .setTitle(json.word)
          .setURL(json.permalink)
          .setDescription(
            `**Definition:**\n*${json.definition}*\n\n**Example:**\n*${
              json.example.split('.')[0]
            }*`
          )
          .addField('Upvotes 👍', json.thumbs_up, true)
          .addField('Downvotes 👎', json.thumbs_down, true)
          .setFooter(`Written by ${json.author}`)

        msg.channel.send(embed2)
      })
    }

    if (
      msg.content.toLowerCase() == 'yazitura' ||
      msg.content.toLowerCase() == 'yazıtura' ||
      msg.content.toLowerCase() == 'yt'
    ) {
      var c = Math.floor(Math.random() * 2)
      if (c == 0) {
        msg.channel.send({
          files: ['./src/yazi.png'],
        })
      } else {
        msg.channel.send({
          files: ['./src/tura.png'],
        })
      }
    }
    if (msg.content.toLowerCase().includes('!lol ')) {
      //console.log(jsonData.data.Aatrox);
      if (msg.content.toLowerCase().length <= 5) {
        msg.channel.send('`Enter your id`')
      } else {
        var id = msg.content.substring(5, msg.content.length)

        fetch(
          `https://tr1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${id}?api_key=${riot}`
        )
          .then((res) => res.json())
          .then((data) => {
            const sumId = data.id
            const accId = data.accountId

            fetch(
              `https://tr1.api.riotgames.com/lol/match/v4/matchlists/by-account/${accId}?api_key=${riot}`
            )
              .then((res2) => res2.json())
              .then((data2) => {
                const embed3 = new Discord.MessageEmbed()
                const chamId = data2.matches[0].champion
                for (var i = 0; i < jsonData.length; i++) {
                  if (jsonData[i].key == chamId) {
                    console.log(jsonData[i].name)
                    embed3
                      .setColor('RANDOM')
                      .setTitle(
                        id + '\n' + jsonData[i].name + '\n' + jsonData[i].title
                      )
                      .setThumbnail(jsonData[i].icon)
                      .setDescription(`Toplam ${data2.totalGames}. maci`)
                  }
                }

                msg.channel.send(embed3)
              })
          })
      }
    }

    if (msg.content.toLowerCase() === '!flol') {
      fetch(
        `https://tr1.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=${riot}`
      )
        .then((res3) => res3.json())
        .then((data3) => {
          console.log(data3.freeChampionIds)
          const cid = data3.freeChampionIds
          let freec
          let k = 0
          let freeca = []

          for (var m = 0; m < cid.length; m++) {
            for (var y = 0; y < jsonData.length; y++) {
              if (jsonData[y].key == cid[m]) {
                freec = jsonData[y].name
                freeca[k] = freec
                k = k + 1
              }
            }
          }

          const embed4 = new Discord.MessageEmbed()
          for (var l = 0; l < freeca.length; l++) {
            embed4
              .setColor('RANDOM')
              .setTitle('BU HAFTANIN BELESLERI')
              .setDescription(`${freeca.join('\r\n')}`)
          }

          msg.channel.send(embed4)
        })
    }
    if (msg.content.toLowerCase() === '!help') {
      const embed5 = new Discord.MessageEmbed()
      embed5
        .setColor('RANDOM')
        .setTitle('~~~Komutlar')
        .setDescription(
          '**!yt** = yazi tura' +
            '\n' +
            '**random** + bir sayi(max 10)' +
            '\n' +
            '**!t** = ingilizce-turkce ceviri' +
            '\n' +
            '**!u** = urban dictionary' +
            '\n' +
            '**!poll** = anket' +
            '\n' +
            '**!lol** = oyuncunun son oynadigi sampiyon' +
            '\n' +
            '**!flol** = Haftanin ucretsiz sampiyonlari' +
            '\n' +
            '**!ip** = mc ip' +
            '\n' +
            '**!ip + ip** = mc ip kaydetmece'
        )
        .setFooter('by neaRRRRR')

      msg.channel.send(embed5)
    }

    if (msg.content.toLowerCase().includes('!ip ')) {
      //save ip
      var ipmc = msg.content.substring(4, msg.content.length)
      fs.writeFile('ip.txt', ipmc, function (err) {
        if (err) throw err
        console.log('File is created')
        msg.channel.send('Kaydettim knk' + ' ' + date.toLocaleTimeString())
      })
    }

    if (msg.content.toLowerCase() == '!ip') {
      fs.readFile('ip.txt', function (err, data) {
        if (err) throw err
        let ip = data.toString('utf8')
        msg.channel.send('> ' + ip)
      })
    }
    if (msg.content.toLowerCase() == '!i') {
      var today = new Date()
      var dd = today.getDate()
      var mm = today.getMonth()
      const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ]
      var yyyy = today.getFullYear()
      if (dd < 10) {
        dd = '0' + dd
      }

      var today = dd + ' ' + monthNames[mm] + ' ' + yyyy
      today = today.toString()

      fetch(
        `http://api.aladhan.com/v1/calendarByCity?city=Istanbul&country=Turkey&method=13&month=05&year=2020`
      )
        .then((res4) => res4.json())
        .then((data4) => {
          for (let t = 0; t < data4.data.length; t++) {
            if (data4.data[t].date.readable == today) {
              let clock = data4.data[t].timings.Sunset
              var min = clock.slice(3, 5)
              console.log(min)
            }
          }

          console.log(today)
          fs.writeFile('time.txt', data4.data, function (err) {
            if (err) throw err
            console.log('ok')
          })
        })

      if (msg.content.toLowerCase() === 'iko') {
        msg.channel.send('``bigX``: ???')
      }
    }

    // if (msg.content.toLowerCase().includes("!play ")) {
    //   const voiceCh = "286919604964687872";
    //   var link = msg.content.substring(5, msg.content.length);
    //   function play(connection, message) {
    //     var server = servers[message.guild.id];
    //     server.dispatcher = connection.playStream(
    //       ytdl(server.queue[0], { filter: "audioonly" })
    //     );
    //     server.queue.shift();
    //     server.dispatcher.on("end", function () {
    //       if (server.queue[0]) {
    //         play(connection, play);
    //       } else {
    //         connection.disconnect();
    //       }
    //     });
    //   }
    //   if (msg.content.toLowerCase().length <= 5) {
    //     msg.channel.send("> Link at enayi");
    //   }
    //   // if (!msg.member.voiceCh) {
    //   //   msg.channel.send("> Sese gir");
    //   // }
    //   if (!servers[message.guild.id])
    //     servers[message.guild.id] = {
    //       queue: [],
    //     };
    //   var server = servers[message.guild.id];
    //   server.queue.push(link);

    //   if (!message.guild.voiceConnection)
    //     message.member.voiceChannel.join().then(function (connection) {
    //       play(connection, message);
    //     });
    // }
  }
})

client.login(process.env.BOT_TOKEN)
