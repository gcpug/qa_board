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
| authorId | `string` | `uid` of the event author obtained from login information |
| createdAt | `string` | |
| displayName | `string` | |
| email | `string` | email address obtained from login information |
| eventName | `string` | |
| photoURL | `string` | avatar URL obtained from login information |

### messages

| field | type | description |
|---|---|---|
| authorId | `string` | `uid` of the event author obtained from login information |
| createdAt | `string` | |
| displayName | `string` | |
| done | `boolean` | |
| email | `string` | |
| eventId | `string` | |
| message | `string` | |
| photoURL | `string` | |
| to | `string` | associated message id |

### reactions

| field | type | description |
|---|---|---|
| authorDisplayName |`string` | |
| authorId | `string` | `uid` of the reaction author obtained from login information |
| createdAt | `string` | |
| eventId | `string` | |
| message | `string` | |
| reaction | `string` | equiv string of each emoji (`+1`, `eyes`, `heart`, `joy`) |
