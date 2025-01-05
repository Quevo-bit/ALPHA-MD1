const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_IDeyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSUF5K1NSRkthWCtlT3pNQzR6UUJTWlJoc2N6YytHcUJHeGVpcE10YW1FND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOFpIZWRaOTlrb0t6dklwRld4MndQMkw1bG8rSzQ5ZHhDdExXSnBtQklIMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5QjErTE0zOHowc1JBUXkvUXFidVdXTU9CWVQ5NzRLL3VvV2VZN21FNkdZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIwZ0R4QUZNdWFJOUJHUXplVlM0RUZPRWppTXp1cUlUdVNOYTZLRkk1amhJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklHNG9NM1NINjcyRVBVNTFLR1Z4QlNIRVBHVXI0UUlTTWlJOEMvVDlBMm89In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkREcUc0ZUhSaThVNHFMUXFiRStheFV5LzdKa3RxaEZMNWxOalRwRDE1V1k9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSUxUR0Y2aU5PcGkweGt2Y20zYzdHMU5wWWY4RHVCeUpkTElRa0RhQzRYTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY2tURDhTa3ZPTWR1OXJGOWs3S3hTS1M1ZFJ5dVhraSs4TEQwTkYyY3Myaz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjlXdlFVZlh1c3JMNUtnNDFyTGIrd2hZQWt4b0xEeG1TNUVSait3RXVGUXZiMmZkR3p4djB6RjY0M1o0TXROTjExZ3RlM25WeTJ3YUVMNVNIT3dVNWpRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjUxLCJhZHZTZWNyZXRLZXkiOiJrbHhoNzdMeitoemJIelY5V29UdEhGSEJVeXB0MXJVbUFqZVlJSWtMcCtNPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJSNER6SEU0SlE3dTFOT2l2X2Vkd0RnIiwicGhvbmVJZCI6IjljM2QyMGUxLWQ2ZjAtNGQ4My04ZjU2LWI2NWNhZGRmMzZmMyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI4QmphcUY4N0h5REFmNnlSTkJOM21aOWJpbGM9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidTZyZTRlSWZrL04zS3V3YSsvOTgwYVVWdSs0PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjhEMjI3MjhLIiwibWUiOnsiaWQiOiIyNTQ3OTQxMTM3ODM6N0BzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTUNycEpvRkVLdmU2THNHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiQjZod0tNcUNPaHppS0xMbDkvakVSbGJLZjRVMmJCYmx2cVJ0V000UHpsdz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiWGZlM3pyN25OR1A2QW9DMnh5UFQ0djJINTdBVklwRURHdDBEMmZtWDRtYjI0WUgyMDZWNFlyVEZ6d2xJUkh0b0R5bCsxZUw2a1hFTys4T2Y4U1FJQlE9PSIsImRldmljZVNpZ25hdHVyZSI6InhGTmpSRll5WWdrdjhLK1l5ZXRVZWZZN0NiNllvbWlUeW1wdi9FT3dCUzFLWnNCZ2xlNFNvRUt4dmhnczd2Z29RUG9xdWVucHZxU1lNT0xkM3lEcGdRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU0Nzk0MTEzNzgzOjdAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCUWVvY0NqS2dqb2M0aWl5NWZmNHhFWld5bitGTm13VzViNmtiVmpPRDg1YyJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTczNjA2MDcyOCwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFEWXcifQ== || 'keith',
    PREFIXE: process.env.PREFIX || "+",
    GITHUB : process.env.GITHUB|| 'https://github.com/Keithkeizzah/ALPHA-MD1',
    OWNER_NAME : process.env.OWNER_NAME || "Keith",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "254748387615",  
    ANTI_LINK : process.env.ANTI_LINK || "yes",
    ANTI_BAD : process.env.ANTI_BAD || "yes",               
    AUTO_REPLY : process.env.AUTO_REPLY || "yes",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTO_REACT: process.env.AUTO_REACTION || "non",  
    AUTO_LIKE_STATUS: process.env.AUTO_LIKE_STATUS || 'non',              
    CHATBOT: process.env.CHAT_BOT || "off",              
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "yes",
    AUTO_BLOCK: process.env.BLOCK_ALL || 'yes',              
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029Vaan9TF9Bb62l8wpoD47",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029Vaan9TF9Bb62l8wpoD47",
    CAPTION : process.env.CAPTION || "ALPHA-MD",
    BOT : process.env.BOT_NAME || 'ALPHA_MD',
    URL : process.env.BOT_MENU_LINKS || '',
    MODE: process.env.PUBLIC_MODE || "no",              
    TIMEZONE: process.env.TIMEZONE || "Africa/Nairobi", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    GEMINI_API_KEY : process.env.GEMINI_API_KEY || 'AIzaSyCcZqDMBa8FcAdBxqE1o6YYvzlygmpBx14',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTICALL: process.env.ANTICALL || 'yes',              
    CHAT_BOT : process.env.CHAT_BOT || 'no',  
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
