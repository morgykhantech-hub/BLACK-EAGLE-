const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys')
const { Boom } = require('@hapi/boom')
const fs = require('fs')
const path = require('path')

const prefix = '.'

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('session')
    const sock = makeWASocket({ 
        auth: state,
        printQRInTerminal: true
    })

    sock.ev.on('creds.update', saveCreds)
    
    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update
        if(connection === 'close') {
            const shouldReconnect = (lastDisconnect.error)?.output?.statusCode!== DisconnectReason.loggedOut
            console.log('Connection closed. Reconnecting...', shouldReconnect)
            if(shouldReconnect) {
                startBot()
            }
        } else if(connection === 'open') {
            console.log('🔥 BLACK EAGLE v5.7 CONNECTED 🔥')
        }
    })

    sock.ev.on('messages.upsert', async (m) => {
        if(!m.messages[0].message) return
        const msg = m.messages[0]
        const from = msg.key.remoteJid
        const body = msg.message.conversation || msg.message.extendedTextMessage?.text || ''
        
        if(!body.startsWith(prefix)) return
        
        const args = body.slice(prefix.length).trim().split(/ +/)
        const command = args.shift().toLowerCase()
        
        // Basic menu command
        if(command === 'menu'){
            await sock.sendMessage(from, { 
                text: `*BLACK EAGLE v5.7*\n\n.ai - Chat with AI\n.sticker - Make sticker\n.ytmp3 - Download song\n.menu - Show this menu\nBot by MORGYKHANTECH` 
            })
        }
    })
}

// START THE BOT
startBot(BLACK-EAGLE-BOT)
    owner:
    prefix = [ ]
    Commands:  1800
    mode:
    version 32.0.0
        
    [A& CHAT - 20]
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

[GROUP ADMIN - 30]
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
. untag

[FUN & GAMES - 50]
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
.afk - 1800 COMMANDS ==========

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
