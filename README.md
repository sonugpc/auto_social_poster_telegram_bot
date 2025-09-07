# Auto Social Poster API

This is a Cloudflare Worker API that allows you to post updates to your social media profiles via Buffer.

## Setup

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Create a `.dev.vars` file:**

    Create a file named `.dev.vars` in the root of the project and add the following content, replacing the values with your actual credentials:

    ```
    BUFFER_AUTH="your_buffer_auth_token"
    OPEN_AI_KEY="your_openai_api_key"
    ```

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

## Deployment

To deploy the worker to Cloudflare, run:

```bash
npm run deploy
