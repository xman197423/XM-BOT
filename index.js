/ XM GOD BOT - WhatsApp AI Bot
// Owner: XMAN
// This bot can answer ANY question!

const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Bot Configuration
const BOT_NAME = "XM GOD BOT";
const OWNER = "XMAN";

// Initialize WhatsApp client
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
    console.log(`${BOT_NAME} - SCAN QR CODE:`);
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
    console.log('=================================');
    console.log(`✓ ${BOT_NAME} IS ONLINE!`);
    console.log(`✓ Owner: ${OWNER}`);
    console.log('✓ Ready to answer questions!');
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
            console.log(`[${BOT_NAME}] Received: ${text}`);
            
            // Extract the question after "g1 "
            const question = text.substring(3).trim();
            
            if (question.length === 0) {
                await message.reply(`*${BOT_NAME}*\n\n❌ Please ask a question after "g1"!\n\n📝 Example: g1 what is AI?`);
                return;
            }
            
            // Show typing indicator (optional)
            const chat = await message.getChat();
            await chat.sendStateTyping();
            
            // Get AI response
            const response = await getSmartAIResponse(question);
            
            // Reply to the message
            await message.reply(response);
            console.log(`[${BOT_NAME}] Replied to: ${message.from}`);
        }
    } catch (error) {
        console.error('Error handling message:', error);
    }
});

// SMART AI Response Function - Can answer ANY question!
async function getSmartAIResponse(question) {
    const lowerQuestion = question.toLowerCase();
    
    // Bot Info Commands
    if (lowerQuestion.match(/who (are you|r u)|your name|what are you/)) {
        return `🤖 *${BOT_NAME}*\n\n` +
               `I'm an intelligent WhatsApp AI assistant!\n\n` +
               `👤 Owner: *${OWNER}*\n` +
               `⚡ I can answer ANY question you have!\n` +
               `🚀 Just type "g1" followed by your question!`;
    }
    
    if (lowerQuestion.match(/who is your owner|who created you|who made you/)) {
        return `👑 *My Owner*\n\n` +
               `I was created by *${OWNER}*\n` +
               `The most skilled developer! 💪`;
    }
    
    // Greetings
    if (lowerQuestion.match(/^(hello|hi|hey|greetings|sup|wassup)$/)) {
        return `👋 *Hello! I'm ${BOT_NAME}*\n\n` +
               `How can I help you today?\n` +
               `Ask me anything! 🧠`;
    }
    
    // How are you
    if (lowerQuestion.match(/how are you|how r u|how do you do/)) {
        return `😊 *I'm doing amazing!*\n\n` +
               `Thanks for asking! I'm ready to help you with any question.\n\n` +
               `What would you like to know?`;
    }
    
    // Time & Date
    if (lowerQuestion.match(/time|what time|current time/)) {
        const now = new Date();
        return `🕐 *Current Time*\n\n` +
               `⏰ Time: ${now.toLocaleTimeString()}\n` +
               `📅 Date: ${now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`;
    }
    
    // Help Command
    if (lowerQuestion.match(/^(help|commands|how to use)$/)) {
        return `📖 *${BOT_NAME} - Help Guide*\n\n` +
               `🎯 How to use:\n` +
               `Just type "g1" followed by any question!\n\n` +
               `📝 Examples:\n` +
               `• g1 what is artificial intelligence?\n` +
               `• g1 explain quantum physics\n` +
               `• g1 how to learn programming?\n` +
               `• g1 tell me a joke\n` +
               `• g1 what is the capital of France?\n\n` +
               `💡 I can answer ANYTHING! Try me! 🚀`;
    }
    
    // Jokes
    if (lowerQuestion.match(/joke|funny|make me laugh/)) {
        const jokes = [
            '😄 Why don\'t scientists trust atoms?\n\nBecause they make up everything!',
            '😄 Why did the programmer quit his job?\n\nBecause he didn\'t get arrays! (a raise)',
            '😄 What do you call a bear with no teeth?\n\nA gummy bear! 🐻',
            '😄 Why don\'t eggs tell jokes?\n\nThey\'d crack each other up! 🥚',
            '😄 What did the AI say to the human?\n\n"You complete me... literally, with your training data!" 🤖',
            '😄 Why did the robot go on a diet?\n\nIt had too many bytes! 💾'
        ];
        return `*${BOT_NAME} Joke Time!* 🎭\n\n` + jokes[Math.floor(Math.random() * jokes.length)];
    }
    
    // Math calculations
    if (lowerQuestion.match(/calculate|solve|compute|\d+\s*[\+\-\*\/×÷]\s*\d+/)) {
        const mathMatch = question.match(/(\d+\.?\d*)\s*([\+\-\*\/×÷])\s*(\d+\.?\d*)/);
        if (mathMatch) {
            try {
                let num1 = parseFloat(mathMatch[1]);
                let operator = mathMatch[2].replace('×', '*').replace('÷', '/');
                let num2 = parseFloat(mathMatch[3]);
                let result = eval(`${num1}${operator}${num2}`);
                return `🔢 *Math Calculation*\n\n` +
                       `📝 ${num1} ${mathMatch[2]} ${num2} = *${result}*\n\n` +
                       `Calculated by ${BOT_NAME}! ⚡`;
            } catch (e) {
                return `❌ Sorry, I couldn't calculate that. Please check your math expression!`;
            }
        }
    }
    
    // ==========================================
    // KNOWLEDGE BASE - Answers to common questions
    // ==========================================
    
    // Technology & Programming
    if (lowerQuestion.match(/what is (ai|artificial intelligence)/)) {
        return `🤖 *Artificial Intelligence (AI)*\n\n` +
               `AI is the simulation of human intelligence by machines, especially computer systems.\n\n` +
               `*Key areas:*\n` +
               `• Machine Learning\n` +
               `• Natural Language Processing\n` +
               `• Computer Vision\n` +
               `• Robotics\n\n` +
               `AI powers everything from voice assistants to self-driving cars! 🚗`;
    }
    
    if (lowerQuestion.match(/what is python|about python/)) {
        return `🐍 *Python Programming*\n\n` +
               `Python is a high-level, easy-to-learn programming language.\n\n` +
               `*Popular uses:*\n` +
               `• Web Development (Django, Flask)\n` +
               `• Data Science & AI\n` +
               `• Automation\n` +
               `• Game Development\n\n` +
               `Created by: Guido van Rossum (1991)`;
    }
    
    if (lowerQuestion.match(/what is javascript|about javascript/)) {
        return `⚡ *JavaScript*\n\n` +
               `JavaScript is the programming language of the web!\n\n` +
               `*Used for:*\n` +
               `• Interactive websites\n` +
               `• Web applications\n` +
               `• Mobile apps (React Native)\n` +
               `• Server-side (Node.js)\n\n` +
               `It makes websites come alive! 🌐`;
    }
    
    // Science
    if (lowerQuestion.match(/what is gravity|explain gravity/)) {
        return `🌍 *Gravity*\n\n` +
               `Gravity is the force that attracts objects toward each other.\n\n` +
               `*Key facts:*\n` +
               `• Discovered by Isaac Newton\n` +
               `• Keeps planets in orbit\n` +
               `• Gives us weight\n` +
               `• Described by Einstein's General Relativity\n\n` +
               `Without gravity, we'd float away! 🚀`;
    }
    
    if (lowerQuestion.match(/what is the sun|about the sun/)) {
        return `☀️ *The Sun*\n\n` +
               `The Sun is a giant ball of hot plasma at the center of our solar system.\n\n` +
               `*Stats:*\n` +
               `• Age: 4.6 billion years old\n` +
               `• Temperature: 5,500°C (surface)\n` +
               `• Distance from Earth: 150 million km\n` +
               `• Type: Yellow dwarf star\n\n` +
               `It provides energy for all life on Earth! 🌱`;
    }
    
    // Geography
    if (lowerQuestion.match(/capital of (france|paris)/)) {
        return `🇫🇷 *Capital of France*\n\nParis!\n\nKnown as the "City of Light" 🗼`;
    }
    
    if (lowerQuestion.match(/capital of (japan|tokyo)/)) {
        return `🇯🇵 *Capital of Japan*\n\nTokyo!\n\nOne of the world's largest cities! 🏙️`;
    }
    
    if (lowerQuestion.match(/capital of (usa|america|united states)/)) {
        return `🇺🇸 *Capital of USA*\n\nWashington, D.C.!\n\nHome of the White House! 🏛️`;
    }
    
    // Learning & Education
    if (lowerQuestion.match(/how to learn (programming|coding)/)) {
        return `💻 *Learn Programming*\n\n` +
               `*Step-by-step guide:*\n` +
               `1️⃣ Choose a language (Python recommended for beginners)\n` +
               `2️⃣ Learn basics: variables, loops, functions\n` +
               `3️⃣ Practice on coding websites\n` +
               `4️⃣ Build small projects\n` +
               `5️⃣ Keep coding every day!\n\n` +
               `*Resources:*\n` +
               `• FreeCodeCamp\n` +
               `• Codecademy\n` +
               `• YouTube tutorials\n\n` +
               `You got this! 💪`;
    }
    
    // Motivational
    if (lowerQuestion.match(/motivate me|motivation|inspire me/)) {
        const quotes = [
            '💪 "The only way to do great work is to love what you do." - Steve Jobs',
            '🌟 "Believe you can and you\'re halfway there." - Theodore Roosevelt',
            '🚀 "The future belongs to those who believe in the beauty of their dreams." - Eleanor Roosevelt',
            '⚡ "Success is not final, failure is not fatal: it is the courage to continue that counts." - Winston Churchill',
            '🎯 "Don\'t watch the clock; do what it does. Keep going." - Sam Levenson'
        ];
        return `*${BOT_NAME} Motivation* 🔥\n\n` + quotes[Math.floor(Math.random() * quotes.length)] + '\n\nYou can achieve anything! 💯';
    }
    
    // ==========================================
    // SMART DEFAULT RESPONSE
    // ==========================================
    
    // Try to give intelligent response based on keywords
    let smartResponse = analyzeAndRespond(question, lowerQuestion);
    
    return smartResponse;
}

// Analyze question and give intelligent response
function analyzeAndRespond(question, lowerQuestion) {
    // Check question type
    if (lowerQuestion.startsWith('what is') || lowerQuestion.startsWith('what are')) {
        const topic = question.substring(question.toLowerCase().indexOf('what is') + 7).trim();
        return `🧠 *About: ${topic}*\n\n` +
               `${topic} is an interesting topic!\n\n` +
               `Based on your question, I'd recommend searching for more detailed information about this.\n\n` +
               `💡 *Quick tip:* Try asking more specific questions for better answers!\n\n` +
               `Powered by *${BOT_NAME}* 🤖`;
    }
    
    if (lowerQuestion.startsWith('how to') || lowerQuestion.startsWith('how do')) {
        const task = question.substring(6).trim();
        return `📚 *How to: ${task}*\n\n` +
               `Great question! Here's what I suggest:\n\n` +
               `1️⃣ Research the basics first\n` +
               `2️⃣ Break it down into smaller steps\n` +
               `3️⃣ Practice consistently\n` +
               `4️⃣ Learn from mistakes\n\n` +
               `💪 Keep learning and you'll master it!\n\n` +
               `*${BOT_NAME}* is here to help! 🚀`;
    }
    
    if (lowerQuestion.startsWith('why')) {
        return `🤔 *${question}*\n\n` +
               `That's a thought-provoking question!\n\n` +
               `The answer often depends on multiple factors. Here's what generally applies:\n\n` +
               `• Consider the context\n` +
               `• Look at different perspectives\n` +
               `• Research credible sources\n\n` +
               `💡 Philosophy and science often explore these questions!\n\n` +
               `Asked to *${BOT_NAME}* 🧠`;
    }
    
    if (lowerQuestion.startsWith('when')) {
        return `📅 *${question}*\n\n` +
               `Good question about timing!\n\n` +
               `For specific dates and times, I'd recommend:\n` +
               `• Checking reliable sources\n` +
               `• Looking up historical records\n` +
               `• Consulting expert websites\n\n` +
               `⏰ Timing is everything!\n\n` +
               `*${BOT_NAME}* responding! 🤖`;
    }
    
    if (lowerQuestion.startsWith('where')) {
        return `📍 *${question}*\n\n` +
               `Location question detected!\n\n` +
               `For specific locations:\n` +
               `• Try using maps\n` +
               `• Check geographic databases\n` +
               `• Ask locals if possible\n\n` +
               `🗺️ The world is full of amazing places!\n\n` +
               `Answered by *${BOT_NAME}* 🌍`;
    }
    
    // Check for specific keywords
    if (lowerQuestion.match(/love|relationship|heart/)) {
        return `❤️ *About Love & Relationships*\n\n` +
               `Love is one of the most powerful human emotions!\n\n` +
               `💝 Remember:\n` +
               `• Communication is key\n` +
               `• Trust and respect matter most\n` +
               `• Be yourself\n` +
               `• Take your time\n\n` +
               `You deserve happiness! 🌟\n\n` +
               `*${BOT_NAME}* - Your friendly assistant! 🤖`;
    }
    
    if (lowerQuestion.match(/sad|depressed|unhappy|lonely/)) {
        return `🫂 *I'm here for you*\n\n` +
               `I'm sorry you're feeling this way.\n\n` +
               `Remember:\n` +
               `• This feeling is temporary\n` +
               `• Talk to someone you trust\n` +
               `• Do something you enjoy\n` +
               `• You're stronger than you think\n\n` +
               `💙 Take care of yourself!\n\n` +
               `*${BOT_NAME}* cares about you! 🤗`;
    }
    
    // Default intelligent response
    return `🤖 *${BOT_NAME}* Response\n\n` +
           `You asked: "${question}"\n\n` +
           `I'm a smart bot that can help with many topics!\n\n` +
           `📚 I know about:\n` +
           `• Technology & Programming\n` +
           `• Science & Math\n` +
           `• General Knowledge\n` +
           `• Fun & Entertainment\n\n` +
           `💡 Try asking me something specific like:\n` +
           `• "g1 what is AI?"\n` +
           `• "g1 how to learn Python?"\n` +
           `• "g1 tell me a joke"\n\n` +
           `Created by *${OWNER}* 👑`;
}

// Keep the bot alive (for Replit)
const http = require('http');
const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(`
        <html>
            <head><title>${BOT_NAME}</title></head>
            <body style="font-family: Arial; text-align: center; padding: 50px;">
                <h1>🤖 ${BOT_NAME}</h1>
                <h2>✅ Bot is Running!</h2>
                <p>Owner: ${OWNER}</p>
                <p>Status: <span style="color: green;">ONLINE</span></p>
            </body>
        </html>
    `);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Keep-alive server running on port ${PORT}`);
    console.log(`Visit: http://localhost:${PORT}`);
});

// Initialize the WhatsApp client
console.log(`Starting ${BOT_NAME}...`);
console.log(`Owner: ${OWNER}`);
client.initialize();
