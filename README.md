# ai-pitch-deck
A simple app that generates decks for presentation

## server

- environment variables
```
WEB_ORIGINS=<your-web-origins-comma-separated>
PORT=<your-port>
DATABASE_URL=<your-database-url>
BETTER_AUTH_URL=<your-better-auth-url>
BETTER_AUTH_SECRET=<your-better-auth-secret>
GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>
OPENAI_API_KEY=<your-openai-api-key>
IMAGEKIT_PRIVATE_KEY=<your-imagekit-private-key>
USE_PLACEHOLDER_IMAGES=<true-or-false>

<!-- only needed for production deployment -->
INNGEST_EVENT_KEY=<your-inngest-event-key>
INNGEST_SIGNING_KEY=<your-inngest-signing-key>

<!-- only needed for local development -->
INNGEST_DEV=1
```

- run the dev server
```
cd server
pnpm install
pnpm approve-builds (if needed)
docker compose up -d
pnpm prisma migrate dev/deploy(for production)
pnpm prisma generate
pnpm dev
```