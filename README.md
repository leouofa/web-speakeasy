# The Web Speakeasy 🥷

A self-hosted, end-to-end encrypted messaging app that hides in plain sight.

Messages are encrypted on-device before they ever leave the browser, and they travel over ordinary [Pusher](https://pusher.com/docs/) traffic — so an eavesdropper can't read what you send, and can't even tell that a conversation is happening. Built for crypto communities, DAOs, and anyone who wants a conversation nobody can prove took place. Clone it, host it yourself, and run it for your own community.

## Why Web Speakeasy is good for private communication

### On-device, end-to-end encryption

Your passphrase never leaves your browser. When you enter it at the door, it is hashed locally with SHA-256: the digest becomes the AES key, and the first 20 characters of that digest become the room's [Pusher](https://pusher.com/docs/) channel name. Messages are AES-encrypted on the device *before* they are sent, and only decrypted on the device of someone who knows the same passphrase. The server is a dumb relay: it forwards ciphertext, never sees plaintext, and never holds your key.

### How a message travels

```mermaid
sequenceDiagram
    autonumber
    participant A as Alice (browser)
    participant S as Your server (/api/addMessage)
    participant P as Pusher (TLS relay)
    participant B as Bob (browser)

    Note over A,B: Shared out-of-band: the passphrase
    A->>A: SHA-256(passphrase) -> digest<br/>channel = digest[0:20], key = digest
    B->>B: same digest -> same channel + key
    A->>A: AES-encrypt message with key
    A->>S: POST channel + ciphertext
    S->>P: trigger(channel, "new-message", ciphertext)
    Note over S: Never sees plaintext, stores nothing
    P-->>B: broadcast ciphertext
    B->>B: AES-decrypt with key
```

### Nothing to leak

There is no messages table and no history endpoint. Chats are pushed in real time to connected clients and live only in their browser memory for the session, so there is no archive to subpoena, breach, or leak. Metadata is kept minimal too: your chat identity is a randomly generated `patron-<number>` name, and your wallet address is shared only if you explicitly choose to.

### Hidden in plain sight (security through obscurity)

Encryption keeps your messages secret. Obscurity keeps the *existence* of the conversation secret.

- Room channels are 20-character hex strings derived from a hash of the passphrase. Without the passphrase you cannot compute or guess the channel, so you cannot even tell that a room exists.
- The transport is standard, TLS-encrypted Pusher traffic. It is indistinguishable from the enormous volume of ordinary applications that use Pusher: no custom protocol, no unusual ports, nothing that flags "someone is communicating privately here."
- The idea is that an interceptor has to know a conversation is taking place before they can even try to intercept it — and this design is built so they don't. Blending into normal Pusher traffic makes it hard to know it is happening in the first place.

### Looks like an ordinary SaaS business

Not all of the obscurity lives in the channel names or the wire traffic — some of it is in the front door. To anyone who stumbles onto the site without knowing what it is, Web Speakeasy presents as a completely conventional subscription product: marketing pages, pricing tiers, [Stripe Checkout](https://stripe.com/docs/payments/checkout), a customer billing portal, and real, paid plans.

That cover is deliberate. The Stripe integration and plan purchases are genuine — real customers, real payments, real invoices — which is exactly what makes them convincing. Anyone who finds the site has to conclude they're looking at an ordinary paid web app rather than a private communication channel.

Put together, the layers stack: encryption hides the message, hash-derived channels hide the room, and the ordinary SaaS veneer hides the whole thing from casual discovery.

### Crypto-native identity (optional disclosure)

Web Speakeasy is built with crypto communities in mind:

- Connect with MetaMask to enter your speakeasy (via [@usedapp/core](https://usedapp.io/) and ethers). There is no email address or real-name handle attached to your chat identity.
- You appear to the room as a throwaway `patron-<number>` name. Your wallet address stays private by default.
- Flip on **Share Address Public** and your address is attached only to the messages you send. That gives crypto-native peers a way to pay you or verify you on-chain — a decentralized identity handshake that replaces "send me your number."
- The wallet is intentionally decoupled from access and billing, so your on-chain identity is never forced to become public just to use the app.

### Self-hosted by design

You run the relay. Keys and passphrases are generated on your users' devices and never leave them, and no third-party platform holds your message log or user records. Pusher sees only ciphertext and opaque channel names; the rest of the stack (Supabase, Stripe, Vercel) is under your control.

> **A note on honesty:** obscurity is a second layer *on top of* on-device encryption, not a replacement for it. Use both.

## Features

- Complete On-device encryption.
- Stealth: indistinguishable from normal Pusher traffic — hard to detect that a conversation is happening at all.
- Zero message persistence — nothing is written to the database.
- Wallet-native identity — connect with MetaMask; reveal your public address only when you choose.
- Plausible cover — presents as an ordinary paid SaaS product, with real Stripe billing.
- Tiny codebase. Small attack vector.
- Real-time messaging with [Pusher](https://pusher.com/docs/)
- Secure user management and authentication with [Supabase](https://supabase.io/docs/guides/auth)
- Data access & management tooling on top of PostgreSQL with [Supabase](https://supabase.io/docs/guides/database)
- Integration with [Stripe Checkout](https://stripe.com/docs/payments/checkout) and the [Stripe customer portal](https://stripe.com/docs/billing/subscriptions/customer-portal)
- Automatic syncing of pricing plans and subscription statuses via [Stripe webhooks](https://stripe.com/docs/webhooks)

## Architecture

![Architecture diagram](./public/architecture_diagram.svg)

## Deploy with Vercel

The Vercel deployment will guide you through creating a Supabase account and project. After installing the Supabase integration, you'll need to configure Stripe with a few simple steps.

**Note:** We're working on our Stripe integration. We've documented the required steps below under "Configure Stripe" until the integration is ready.

To get started, click the "Deploy with Vercel" button below.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fleouofa%2Fweb-speakeasy&project-name=my-speakeasy&repository-name=my-speakeasy&demo-title=WebSpeaksy&demo-description=A%20private%20messaging%20platform%20backed%20by%20Next.js%20and%20Metamask&demo-url=https%3A%2F%2Fwww.webspeakeasy.com&integration-ids=oac_jUduyjQgOyzev1fjrW83NYOv&external-id=nextjs-subscription-payments)

[![Screenshot of Vercel deployment](./public/vercel-deploy.png)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fnextjs-subscription-payments&project-name=nextjs-subscription-payments&repo-name=nextjs-subscription-payments&demo-title=Next.js%20Subscription%20Payments%20Starter&demo-description=Demo%20project%20on%20Vercel&demo-url=https%3A%2F%2Fsubscription-payments.vercel.app&demo-image=https%3A%2F%2Fsubscription-payments.vercel.app%2Fdemo.png&integration-ids=oac_jUduyjQgOyzev1fjrW83NYOv&external-id=nextjs-subscription-payments)

Once the project has deployed, continue with the configuration steps below.

The initial build will fail due to missing Stripe environment variables. After configuring Stripe, redeploy the application.

## Configure Supabase Auth

#### Setup redirect wildcards for deploy previews

For auth redirects (magic links, OAuth providers) to work correctly in deploy previews, navigate to the auth settings (i.e. `https://app.supabase.com/project/:project-id/auth/url-configuration`) and add the following wildcard URL to "Redirect URLs": `https://**vercel.app/*/*`.

You can read more about redirect wildcard patterns in the [docs](https://supabase.com/docs/guides/auth#redirect-urls-and-wildcards).

#### [Optional] - Set up OAuth providers

You can use third-party login providers like GitHub or Google. Refer to the [docs](https://supabase.io/docs/guides/auth#third-party-logins) to learn how to configure these. Once configured you can add them to the `provider` array of the `Auth` component on the [`signin.tsx`](./pages/signin.tsx) page.

## Configure Stripe

To start developing your SaaS application, we'll need to configure Stripe to handle test payments. For the following steps, make sure you have the ["Test Mode" toggle](https://stripe.com/docs/testing) switched on.

### Configure webhook

We need to configure the webhook pictured in the architecture diagram above. This webhook is the piece that connects Stripe to your Vercel Serverless Functions.

1. Click the "Add Endpoint" button on the [test Endpoints page](https://dashboard.stripe.com/test/webhooks).
1. Set the endpoint URL to `https://your-deployment-url.vercel.app/api/webhooks`.
1. Click `Select events` under the `Select events to listen to` heading.
1. Click `Select all events` in the `Select events to send` section.
1. Copy `Signing secret` as we'll need that in the next step.

### Set environment variables

To securely interact with Stripe, we need to add a few [Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables) in the Vercel dashboard.

- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET_LIVE`

You can find the first two keys on the [API keys tab](https://dashboard.stripe.com/test/apikeys) in Stripe. The `STRIPE_WEBHOOK_SECRET_LIVE` is the `Signing secret` copied in the previous webhook configuration step.

### Redeploy

We need to redeploy the application so that the latest environment variables are present.

Redeploy your application by going to the deployments tab, finding your deployment, and clicking "redeploy."

### Create product and pricing information

For Stripe to automatically bill your users for recurring payments, you need to create your product and pricing information in the [Stripe Dashboard](https://dashboard.stripe.com/test/products). When you create or update your product and price information, the changes automatically sync with your Supabase database.

Stripe Checkout currently supports pricing that bills a predefined amount at a specific interval. More complex plans (e.g., different pricing tiers or seats) are not yet supported.

For example, you can create business models with different pricing tiers, e.g.:

- Product 1: Hobby
  - Price 1: 10 USD per month
  - Price 2: 100 USD per year
- Product 2: Freelancer
  - Price 1: 20 USD per month
  - Price 2: 200 USD per year

#### Generate test data with the Stripe CLI

The [Stripe CLI](https://stripe.com/docs/stripe-cli#install) `fixtures` command executes a series of API requests defined in a JSON file. To speed up the setup, we have added a [fixtures file](fixtures/stripe-fixtures.json) to bootstrap test product and pricing data in your Stripe account. Simply run `stripe fixtures fixtures/stripe-fixtures.json`.

**Important:** Be sure to start the webhook forwarding (see below) so that the products created by the fixtures command above are imported into your database.

### Configure the Stripe customer portal

1. Set your custom branding in the [settings](https://dashboard.stripe.com/settings/branding)
1. Configure the Customer Portal [settings](https://dashboard.stripe.com/test/settings/billing/portal)
1. Toggle on "Allow customers to update their payment methods"
1. Toggle on "Allow customers to update subscriptions"
1. Toggle on "Allow customers to cancel subscriptions"
1. Add the products and prices that you want
1. Set up the required business information and links

### Generate types from your Supabase database

You can use the [Supabase CLI](https://supabase.com/docs/reference/cli/usage#supabase-gen-types-typescript) to generate types from your Database by running

```bash
supabase gen types typescript --db-url "postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres" > types_db.ts
```

## Configuring Pusher
To interact with Pusher, we need to add more [Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables) to vercel dashboard.
- ```PUSHER_APP_ID```
- ```PUSHER_SECRET```
- ```NEXT_PUBLIC_PUSHER_CLUSTER```
- ```NEXT_PUBLIC_PUSHER_CLIENT_KEY```

1. Signup for a free [Pusher](https://www.pusher.com) account. 
2. Create new app under (channel not beam), 
3. Head over the ```API Keys``` section on the left and populate the missing environment variables.

### That's it

That's it. Now you're ready to earn recurring revenue from your customers 🥳

## Going live

### Archive testing products

Archive all test mode Stripe products before going live. Before creating your live mode products, make sure to follow the steps below to set up your live mode env vars and webhooks.

### Configure production environment variables

To run the project in live mode and process payments with Stripe, modify the environment variables from Stripe "test mode" to "production mode." After switching the variables, be sure to redeploy the application.

To verify you are running in production mode, test checking out with the [Stripe test card](https://stripe.com/docs/testing). The test card should not work.

### Redeploy

Afterward, you will need to rebuild your production deployment for the changes to take effect. Within your project Dashboard, navigate to the "Deployments" tab, select the most recent deployment, click the overflow menu button (next to the "Visit" button) and select "Redeploy."

## Develop locally

Deploying with Vercel will create a repository for you, which you can clone to your local machine.

Next, use the [Vercel CLI](https://vercel.com/download) to link your project:

```bash
vercel login
vercel link
```

### Setting up the env vars locally

Use the Vercel CLI to download the development env vars:

```bash
vercel env pull .env.local
```

Running this command will create a new `.env.local` file in your project folder. For security purposes, you will need to set the `SUPABASE_SERVICE_ROLE_KEY` manually from your [Supabase dashboard](https://app.supabase.io/) (Settings > API). Lastly, the webhook secret differs for local testing vs. when deployed to Vercel. Follow the instructions below to get the corresponding webhook secret.

### Use the Stripe CLI to test webhooks

First [install the CLI](https://stripe.com/docs/stripe-cli) and [link your Stripe account](https://stripe.com/docs/stripe-cli#login-account).

Next, start the webhook forwarding:

```bash
stripe listen --forward-to=localhost:3000/api/webhooks
```

Running this Stripe command will print a webhook secret (such as, `whsec_***`) to the console. Set `STRIPE_WEBHOOK_SECRET` to this value in your `.env.local` file.

### Install dependencies and run the Next.js client

```bash
npm install
npm run dev
# or
yarn
yarn dev
```
