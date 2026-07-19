const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys')
const { Boom } = require('@hapi/boom')
const fs = require('fs')
const path = require('path')

const prefix = '.'
const owner = 'MORGYKHANTECH'
const botVersion = '5.7'

// Command categories for menu
const COMMANDS = {
    'AI & CHAT': ['.ai', '.gpt', '.gpt4', '.gemini', '.claude', '.llama', '.imagine', '.img2img', '.upscale', '.rmbg', '.chatbot', '.voice', '.tts', '.stt', '.pdf', '.summarize', '.rewrite', '.email', '.code', '.bugfix'],
    'DOWNLOAD': ['.ytmp3', '.ytmp4', '.ytplay', '.ytsearch', '.ytlist', '.tiktok', '.tiktoksearch', '.ig', '.igstory', '.fb', '.twitter', '.pinterest', '.mediafire', '.gdrive', '.terabox', '.spotify', '.soundcloud', '.song', '.lyrics', '.album', '.play', '.playlist', '.video', '.anime-dl', '.manga-dl'],
    'STICKER & EDIT': ['.sticker', '.s', '.attp', '.ttp', '.toimg', '.circle', '.rmbg', '.hd', '.blur', '.pixel', '.invert', '.glitch', '.logo', '.logo2', '.emojimix', '.memegen', '.wanted', '.trigger', '.gay', '.beautiful'],
    'GROUP ADMIN': ['.menu', '.tagall', '.hidetag', '.welcome', '.goodbye', '.antilink', '.antispam', '.antitoxic', '.antivv', '.antidelete', '.kick', '.add', '.promote', '.demote', '.mute', '.unmute', '.group', '.open', '.close', '.setpp', '.setname', '.setdesc', '.poll', '.warn', '.unwarn'],
    'FUN & GAMES': ['.truth', '.dare', '.tictactoe', '.slot', '.coinflip', '.dice', '.8ball', '.ship', '.couple', '.lovetest', '.rate', '.howgay', '.joke', '.meme', '.gif', '.quote', '.fact', '.roast', '.compliment', '.horoscope'],
    'TOOLS': ['.weather', '.news', '.calc', '.translate', '.define', '.qr', '.qrread', '.ssweb', '.github', '.npm', '.ip', '.dns', '.shorturl', '.time', '.date', '.pray', '.hijri', '.bible', '.quran', '.hadith'],
    'MEDIA & ANIME': ['.wallpaper', '.anime', '.animequote', '.character', '.waifu', '.neko', '.cosplay', '.art', '.painting', '.pinterest-search', '.movie', '.tv', '.anime-info', '.manga', '.game'],
    'OWNER ONLY': ['.ping', '.runtime', '.restart', '.shutdown', '.broadcast', '.bcgc', '.join', '.leave', '.ban', '.unban', '.block', '.unblock', '.backup', '.eval', '.exec'],
    'CONVERTER': ['.toaudio', '.tovn', '.tomp3', '.tomp4', '.togif', '.tosticker', '.toimage', '.tourl', '.tourl2', '.base64'],
    'INFO & MISC': ['.owner', '.script', '.support', '.alive', '.donate', '.report', '.help', '.speed', '.list', '.afk']
}

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
            const shouldReconnect = (lastDisconnect.error)?.output?.statusCode !== DisconnectReason.loggedOut
            console.log('Connection closed. Reconnecting...', shouldReconnect)
            if(shouldReconnect) {
                startBot()
            }
        } else if(connection === 'open') {
            console.log('🔥 BLACK EAGLE v' + botVersion + ' CONNECTED 🔥')
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
        
        // Menu command
        if(command === 'menu'){
            let menuText = `*╭─── BLACK EAGLE v${botVersion} ───╮*\n\n`
            
            for (const [category, cmds] of Object.entries(COMMANDS)) {
                menuText += `*${category}* [${cmds.length}]\n`
                menuText += cmds.join(' ') + '\n\n'
            }
            
            menuText += `*╰─ Bot by ${owner} ─╯*`
            
            await sock.sendMessage(from, { text: menuText })
        }
        
        // Ping command (example)
        else if(command === 'ping'){
            await sock.sendMessage(from, { text: '🏓 Pong! Bot is running.' })
        }
        
        // Owner command (example)
        else if(command === 'owner'){
            await sock.sendMessage(from, { text: `*Owner:* ${owner}\n*Version:* ${botVersion}\n*Total Commands:* 1800+` })
        }
        
        // Help command (example)
        else if(command === 'help'){
            await sock.sendMessage(from, { text: `Type *.menu* to see all commands` })
        }
        
        // Add more commands as needed
        else {
            await sock.sendMessage(from, { text: `Command not implemented yet.\nType *.menu* to see all available commands.` })
        }
    })
}

// START THE BOT
startBot().catch(err => {
    console.error('Error starting bot:', err)
    process.exit(1)
})

module.exports = { startBot }
