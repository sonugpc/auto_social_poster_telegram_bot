# Auto Social Poster API

This is a Cloudflare Worker API that allows you to post updates to your social media profiles via Buffer.

## Setup & Configuration

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables

How you set variables depends on whether you're running the worker locally or deploying it to Cloudflare.

#### For Local Development (`npm run dev`)

Create a file named `.dev.vars` in the root of your project. Wrangler uses this file to load variables for your local server. **This file should not be committed to version control.**

```
# .dev.vars
BUFFER_AUTH="your_buffer_auth_token"
OPEN_AI_KEY="your_openai_api_key"
```

#### For Production Deployment (`npm run deploy`)

For the deployed worker, you must set secrets using Wrangler. These are securely stored and encrypted by Cloudflare.

Run the following commands in your terminal, pasting your secret value when prompted:

```bash
npx wrangler secret put BUFFER_AUTH
```
```bash
npx wrangler secret put OPEN_AI_KEY
```

These secrets will be automatically available in your deployed worker's environment (`env`).

**Important Note on Security:** Cloudflare does not use your local `.dev.vars` file when you deploy. This is a crucial security feature. Your deployment (`wrangler deploy`) bundles only your application code (`src/*.js`, `package.json`, etc.), not your local secret files. This prevents you from accidentally leaking sensitive keys into your codebase or version control (like Git). The `wrangler secret put` command is the secure and correct way to provide these variables to your live application.

## Running Locally

To start the local development server, run:

```bash
npm run dev
```

This will start a local server, typically on `http://localhost:8787`.

## Testing

You can test the API by sending a POST request to the local server.

**Example using `curl`:**

A basic example:
```bash
curl -X POST http://localhost:8787 -H "Content-Type: application/json" -d '{"caption": "My first post!", "profile_ids": ["your_profile_id"]}'
```

With caption modifier:
```bash
curl -X POST http://localhost:8787 \
-H "Content-Type: application/json" \
-d '{
  "caption": "This is a test post from my new API!",
  "profile_ids": ["your_profile_id_1", "your_profile_id_2"],
  "caption_modifier": true
}'
```

**With a media URL:**

```bash
curl -X POST http://localhost:8787 \
-H "Content-Type: application/json" \
-d '{
  "caption": "This is a test post with an image!",
  "profile_ids": ["your_profile_id_1"],
  "media": "https://example.com/your-image.jpg",
  "caption_modifier": false
}'
```

**Posting an Instagram Reel:**

To post a video as an Instagram Reel, include a video `media` URL and set `is_reel` to `true`.

```bash
curl -X POST http://localhost:8787 \
-H "Content-Type: application/json" \
-d '{
  "caption": "Check out my new Reel!",
  "profile_ids": ["your_instagram_profile_id"],
  "media": "https://example.com/your-video.mp4",
  "is_reel": true
}'
```

## Deployment

Before deploying, ensure you have set your production secrets as described in the configuration section.

To deploy the worker to Cloudflare, run:

```bash
npm run deploy
