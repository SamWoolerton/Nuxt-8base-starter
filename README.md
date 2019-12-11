# inventory

- Starter app using Nuxt frontend and 8base for a hosted backend.
- Largely a CRUD interface as the original is an internal app where design doesn't matter much. With all the pieces in place though, should be easy to overhaul the visuals for fully-customised styling.
- Recommend using Netlify to deploy the frontend.
- This was originally an internal app with no need for signups (just managed through 8base UI), so the only link to the new signup page is on the homepage - you'll want to improve this UX

## Build Setup

Start by copying `sample.env` to `.env` and filling out the environment variables.

```bash
# install dependencies
$ npm run install

# serve with hot reload at localhost:3000
$ npm run dev

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Backend

[Create an 8base account](https://www.8base.com/) and go through their [tutorials](https://docs.8base.com/) to get the hang of the platform.
If you want to get started with a sample schema, `npm i -g 8base-cli`, `cd backend` and `8base import -f demo-schema.json`. This creates a table in 8base.
