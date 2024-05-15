# Auto Social Poster Telegram Bot

This project is a Telegram bot that picks messages from a Telegram channel and posts them to various social media platforms using the Buffer API. The bot needs to be added to the telegram channel with at least  read access of the messages. 

## Features

- **Automated Social Media Posting**:Instantly send a message to social media accounts as soon as it's posted on the Telegram channel.
- **Buffer API Integration**: Uses Buffer to schedule and post content. A free buffer account will work. You need to put the API in env variables. 
- **Customizable**: Configure which channels and social media accounts to post to.

## Installation

### Prerequisites

- Node.js and npm installed
- A Telegram bot token from BotFather
- Buffer API credentials

### Steps

1. Clone the repository:
    ```bash
    git clone https://github.com/sonugpc/auto_social_poster_telegram_bot.git
    cd auto_social_poster_telegram_bot
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Configure the bot:
    - Edit `config.js` to include your Telegram bot token, Buffer API credentials, and other settings.

    ```javascript
    module.exports = {
        telegramBotToken: 'YOUR_TELEGRAM_BOT_TOKEN',
        buffer: {
            accessToken: 'YOUR_BUFFER_ACCESS_TOKEN',
            profileIds: ['YOUR_BUFFER_PROFILE_ID']
        },
        telegramChannel: '@your_channel_name'
    };
    ```

## Usage

Run the bot with:
```bash
node src/bot.js
