// WhatsApp AI Bot - Ready for Replit
// This bot responds when someone sends "g1" followed by a question

const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Initialize WhatsApp client with persistent authentication
const client = new Client({
    authStrategy: new LocalAuth({
        dataPath: './whatsapp-session'
    }),
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

// When QR code is generated
client.on('qr', (qr) => {
    console.log('=================================');
    console.log('SCAN THIS QR CODE WITH WHATSAPP:');
    console.log('=================================');
    qrcode.generate(qr, {small: true});
    console.log('=================================');
    console.log('Open WhatsApp > Settings > Linked Devices > Link a Device');
});

// When authentication is successful
client.on('authenticated', () => {
    console.log('✓ Authentication successful!');
});

// When client is ready
client.on('ready', () => {
    console.log('✓ WhatsApp Bot is ONLINE and ready!');
    console.log('✓ Send messages starting with "g1" to activate the bot');
    console.log('=================================');
});

// Handle authentication failure
client.on('auth_failure', () => {
    console.log('✗ Authentication failed. Please restart and scan QR again.');
});

// Handle disconnection
client.on('disconnected', (reason) => {
    console.log('✗ Client disconnected:', reason);
});

// Listen for incoming messages
client.on('message', async (message) => {
    try {
        const text = message.body.trim();
        
        // Check if message starts with "g1" (case insensitive)
        if (text.toLowerCase().startsWith('g1 ')) {
            console.log(`Received g1 command: ${text}`);
            
            // Extract the question after "g1 "
            const question = text.substring(3).trim();
            
            if (question.length === 0) {
                await message.reply('Please ask a question after "g1"!\nExample: g1 what is the weather?');
                return;
            }
            
            // Get AI response
            const response = getAIResponse(question);
            
            // Reply to the message
            await message.reply(response);
            console.log(`Replied to: ${message.from}`);
        }
    } catch (error) {
        console.error('Error handling message:', error);
    }
});

// Simple AI response function (no real AI for now)
function getAIResponse(question) {
    const lowerQuestion = question.toLowerCase();
    
    // Greetings
    if (lowerQuestion.match(/\b(hello|hi|hey|greetings)\b/)) {
        return '👋 Hello! How can I help you today?\n\nI\'m a simple bot. Ask me anything!';
    }
    
    // How are you
    if (lowerQuestion.match(/how are you|how r u/)) {
        return '😊 I\'m doing great! Thanks for asking.\n\nI\'m here to help you with your questions!';
    }
    
    // What's your name
    if (lowerQuestion.match(/your name|who are you|what are you/)) {
        return '🤖 I\'m a WhatsApp AI Bot!\n\nI respond when you start your message with "g1".\n\nI\'m still learning and will get smarter soon!';
    }
    
    // Time
    if (lowerQuestion.match(/time|what time/)) {
        const now = new Date();
        return `🕐 Current time: ${now.toLocaleTimeString()}\n📅 Date: ${now.toLocaleDateString()}`;
    }
    
    // Help
    if (lowerQuestion.match(/help|how to use|commands/)) {
        return '📖 *How to use this bot:*\n\n' +
               '1. Start your message with "g1"\n' +
               '2. Follow it with your question\n' +
               '3. I will reply!\n\n' +
               '*Example:*\n' +
               'g1 hello\n' +
               'g1 what is the time?\n' +
               'g1 tell me a joke';
    }
    
    // Joke
    if (lowerQuestion.match(/joke|funny|laugh/)) {
        const jokes = [
            '😄 Why don\'t scientists trust atoms?\nBecause they make up everything!',
            '😄 Why did the scarecrow win an award?\nHe was outstanding in his field!',
            '😄 What do you call a bear with no teeth?\nA gummy bear!',
            '😄 Why don\'t eggs tell jokes?\nThey\'d crack up!',
            '😄 What did one wall say to the other?\nI\'ll meet you at the corner!'
        ];
        return jokes[Math.floor(Math.random() * jokes.length)];
    }
    
    // Math calculations
    const mathMatch = lowerQuestion.match(/(\d+)\s*[\+\-\*\/]\s*(\d+)/);
    if (mathMatch) {
        try {
            const result = eval(mathMatch[0]);
            return `🔢 ${mathMatch[0]} = ${result}`;
        } catch (e) {
            return '❌ Sorry, I couldn\'t calculate that!';
        }
    }
    
    // Default response
    const responses = [
        `🤔 Interesting question: "${question}"\n\nI'm a simple bot right now, but I received your message!`,
        `💭 You asked: "${question}"\n\nI'm still learning! Soon I'll have real AI powers.`,
        `📝 Question noted: "${question}"\n\nI don't have advanced AI yet, but I'm here and listening!`,
        `✨ Great question! "${question}"\n\nI'm a basic bot for now, but I'll get smarter soon!`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
}

// Keep the bot alive (for Replit)
const http = require('http');
const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('WhatsApp Bot is running!');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Keep-alive server running on port ${PORT}`);
});

// Initialize the WhatsApp client
console.log('Starting WhatsApp Bot...');
client.initialize();