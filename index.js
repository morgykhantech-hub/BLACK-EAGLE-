const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys')
const { Boom } = require('@hapi/boom')
const fs = require('fs')
const path = require('path')

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('session')
    
    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true,
        logger: { level: 'silent' }
    })

    sock.ev.on('creds.update', saveCreds)
    
    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update
        if(connection === 'close') {
            const shouldReconnect = (lastDisconnect.error)?.output?.statusCode !== DisconnectReason.loggedOut
            console.log('connection closed due to ', lastDisconnect.error, ', reconnecting ', shouldReconnect)
            if(shouldReconnect) startBot()
        } else if(connection === 'open') {
            console.log('🦅 BLACK EAGLE BOT CONNECTED 🦅')
        }
    })
}

startBot(){
  "name": "black-eagle-bot",
  "version": "2.0.0",
  "description": "WhatsApp Bot with 200 Commands",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "@whiskeysockets/baileys": "^6.6.0"
  }========== BLACK EAGLE BOT v    "versioRepository name: BLACK-EAGLE-BOT
Description: My WhatsApp Bot with 200 Commands
Public  <- Select this
Add a README <- Check this box
Add .gitignore: Node  <- Select this
License: NonRepository name: BLACK-EAGLE-BOT
Description: My WhatsApp Bot with 200 Commands
Public  <- Select this
Add a README <- Check this box
Add .gitignore: Node  <- Select this
License: None bot"version": "5.7",0========== BLACK EAGLE BOT v2.0 - 200 COMMANDS ==========

[AI & CHAT - 20]
.ai
.gpt
.gpt4
.gemini
.claude
.llama
.imagine
.img2img
.upscale
.rmbg
.chatbot
.voice
.tts
.stt
.pdf
.summarize
.rewrite
.email
.code
.bugfix

[DOWNLOAD - 25]
.ytmp3
.ytmp4
.ytplay
.ytsearch
.ytlist
.tiktok
.tiktoksearch
.ig
.igstory
.fb
.twitter
.pinterest
.mediafire
.gdrive
.terabox
.spotify
.soundcloud
.song
.lyrics
.album
.play
.playlist
.video
.anime-dl
.manga-dl

[STICKER & EDIT - 20]
.sticker
.s
.attp
.ttp
.toimg
.circle
.rmbg
.hd
.blur
.pixel
.invert
.glitch
.logo
.logo2
.emojimix
.memegen
.wanted
.trigger
.gay
.beautiful

[GROUP ADMIN - 25]
.menu
.tagall
.hidetag
.welcome
.goodbye
.antilink
.antispam
.antitoxic
.antivv
.antidelete
.kick
.add
.promote
.demote
.mute
.unmute
.group
.open
.close
.setpp
.setname
.setdesc
.poll
.warn
.unwarn

[FUN & GAMES - 20]
.truth
.dare
.tictactoe
.slot
.coinflip
.dice
.8ball
.ship
.couple
.lovetest
.rate
.howgay
.joke
.meme
.gif
.quote
.fact
.roast
.compliment
.horoscope

[TOOLS - 20]
.weather
.news
.calc
.translate
.define
.qr
.qrread
.ssweb
.github
.npm
.ip
.dns
.shorturl
.time
.date
.pray
.hijri
.bible
.quran
.hadith

[MEDIA & ANIME - 15]
.wallpaper
.anime
.animequote
.character
.waifu
.neko
.cosplay
.art
.painting
.pinterest-search
.movie
.tv
.anime-info
.manga
.game

[OWNER ONLY - 15]
.ping
.runtime
.restart
.shutdown
.broadcast
.bcgc
.join
.leave
.ban
.unban
.block
.unblock
.backup
.eval
.exec

[CONVERTER - 10]
.toaudio
.tovn
.tomp3
.tomp4
.togif
.tosticker
.toimage
.tourl
.tourl2
.base64

[INFO & MISC - 10]
.owner
.script
.support
.alive
.donate
.report
.help
.speed
.list
.afk - 200 COMMANDS ==========

[AI & CHAT - 20]
.ai
.gpt
.gpt4
.gemini
.claude
.llama
.imagine
.img2img
.upscale
.rmbg
.chatbot
.voice
.tts
.stt
.pdf
.summarize
.rewrite
.email
.code
.bugfix

[DOWNLOAD - 25]
.ytmp3
.ytmp4
.ytplay
.ytsearch
.ytlist
.tiktok
.tiktoksearch
.ig
.igstory
.fb
.twitter
.pinterest
.mediafire
.gdrive
.terabox
.spotify
.soundcloud
.song
.lyrics
.album
.play
.playlist
.video
.anime-dl
.manga-dl

[STICKER & EDIT - 20]
.sticker
.s
.attp
.ttp
.toimg
.circle
.rmbg
.hd
.blur
.pixel
.invert
.glitch
.logo
.logo2
.emojimix
.memegen
.wanted
.trigger
.gay
.beautiful

[GROUP ADMIN - 25]
.menu
.tagall
.hidetag
.welcome
.goodbye
.antilink
.antispam
.antitoxic
.antivv
.antidelete
.kick
.add
.promote
.demote
.mute
.unmute
.group
.open
.close
.setpp
.setname
.setdesc
.poll
.warn
.unwarn

[FUN & GAMES - 20]
.truth
.dare
.tictactoe
.slot
.coinflip
.dice
.8ball
.ship
.couple
.lovetest
.rate
.howgay
.joke
.meme
.gif
.quote
.fact
.roast
.compliment
.horoscope

[TOOLS - 20]
.weather
.news
.calc
.translate
.define
.qr
.qrread
.ssweb
.github
.npm
.ip
.dns
.shorturl
.time
.date
.pray
.hijri
.bible
.quran
.hadith

[MEDIA & ANIME - 15]
.wallpaper
.anime
.animequote
.character
.waifu
.neko
.cosplay
.art
.painting
.pinterest-search
.movie
.tv
.anime-info
.manga
.game

[OWNER ONLY - 15]
.ping
.runtime
.restart
.shutdown
.broadcast
.bcgc
.join
.leave
.ban
.unban
.block
.unblock
.backup
.eval
.exec

[CONVERTER - 10]
.toaudio
.tovn
.tomp3
.tomp4
.togif
.tosticker
.toimage
.tourl
.tourl2
.base64

[INFO & MISC - 10]
.owner
.script
.support
.alive
.donate
.report
.help
.speed
.list
.afk
    }
