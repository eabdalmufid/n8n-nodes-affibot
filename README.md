# n8n-nodes-affibot

This is an n8n community node that allows you to interact with the [Affibot](https://bot.affidev.com) WhatsApp API.

## Installation

1. Go to **Settings > Community Nodes** in your n8n instance.
2. Click **Install a node**.
3. Enter `@affidev/n8n-nodes-affibot` and click **Install**.

## Available Nodes

This package provides two main nodes:

### 1. Affibot
Send messages and manage your WhatsApp sessions.
- **Resource: Message**
    - `Send Text`: Basic text messages.
    - `Send Image`: Images with captions.
    - `Send Document`: Files with custom names and captions.
    - `Send Video`: Videos with captions.
    - `Send Sticker`: Stickers from image URLs.
    - `Send Bulk`: Send to multiple recipients with a queue.
- **Resource: Profile**
    - `Check Number`: Verify if a phone number is registered on WhatsApp.

### 2. Affibot Trigger
Receive real-time updates from WhatsApp.
- **Events**: Incoming Message, Session Status Change.

## Setup

1. Create an account at [Affibot](https://bot.affidev.com).
2. Generate an API Key in the **API Keys** section.
3. In n8n, create a new credential for **Affibot API** and paste your API Key.
4. For the Trigger node, copy the webhook URL from n8n and set it in the Affibot dashboard (Webhooks tab).

## License

[MIT](LICENSE)
