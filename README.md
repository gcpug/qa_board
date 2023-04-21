# qa_board

## debug

```sh
# Start dev build and run nuxt server
$ npm run dev

# Build with nuxt
$ npm run build
```

## Environment variables

You need to set environment variables to run the app, configured on "project settings (General tab)" of [Firebase console](https://console.firebase.google.com/).

```env
NUXT_API_KEY=<apiKey>
NUXT_AUTH_DOMAIN=<authDomain>
NUXT_DATABASE_URL=<databaseURL>
NUXT_PROJECT_ID=<projectId>
NUXT_STORAGE_BUCKET=<storageBucket>
NUXT_MESSAGING_SENDER_ID=<messagingSenderId>
NUXT_APP_ID=<appId>
```

## DB schemas

### events

| field | type | description |
|---|---|---|
| authorId | `string` | `uid` of event author obtained from login information |
| createdAt | `string` | created datetime of event |
| displayName | `string` | display name of person who created the event |
| email | `string` | email address of event author |
| eventName | `string` | display name of event |
| photoURL | `string` | avatar URL of event author |

### messages

| field | type | description |
|---|---|---|
| authorId | `string` | `uid` of the message author obtained from login information |
| createdAt | `string` | created datetime of message |
| displayName | `string` | display name of message author |
| done | `boolean` | flag to detect if message is answered |
| email | `string` | email address of message author |
| eventId | `string` | associated event id |
| message | `string` | message content |
| photoURL | `string` | avatar URL of message author |
| to | `string` | parent message id associated to this message |

### reactions

| field | type | description |
|---|---|---|
| authorDisplayName |`string` | display name of reaction author |
| authorId | `string` | `uid` of the reaction author obtained from login information |
| createdAt | `string` | created datetime of reaction |
| eventId | `string` | associated event id |
| messageId | `string` | associated message id |
| reaction | `string` | equiv string of each emoji (`+1`, `eyes`, `heart`, `joy`) |
