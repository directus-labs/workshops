---
# try also 'default' to start simple
theme: ./theme
favicon: 'https://directus.io/favicon.ico'
# some information about your slides, markdown enabled
title: Database to Data Engine
info: |
  Connecting your SQL database to Directus for instant APIs, user authentication, dashboards, automation and more.
# apply any unocss classes to the current slide
class: text-center
# https://sli.dev/custom/highlighters.html
highlighter: shiki
# https://sli.dev/guide/drawing
drawings:
  persist: false
# slide transition: https://sli.dev/guide/animations#slide-transitions
transition: slide-left
# enable MDC Syntax: https://sli.dev/guide/syntax#mdc-syntax
mdc: true
background: '/backgrounds/dark-geo.png'
fonts:
  sans: Inter
  serif: Roboto Slab
  mono: Fira Code
  display: Poppins

---

<img src="/directus-white.png" class="h-12 mx-auto mb-12" />

*Let's Build*

# Database to <br> *Data Engine*

<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    Press Space for next page <carbon:arrow-right class="inline"/>
  </span>
</div>

<!--
The last comment block of each slide will be treated as slide notes. It will be visible and editable in Presenter Mode along with the slide. [Read more in the docs](https://sli.dev/guide/syntax.html#notes)
-->

---
layout: cover
---

### What We're *Building*

<br />

*From siloed SQL database to*
# Powerful Data Engine

- Connect Directus to your database
- Create instant REST and GraphQL APIs
- Restrict permissions to our data
- Share data with non-technical users
- Build a dashboard without writing code
- Automate a workflow

---

# Prerequisites

Here's what you'll need for the workshop.

- Docker ([download it here](https://docs.docker.com/get-docker/))
- VS Code ([download it here](https://code.visualstudio.com/download))


<br>

*Duration*
- Budget - roughly 1 hrs

---
layout: cover
background: '/backgrounds/dark-glow.png'
---

# **Let's Hop In 🐰**

---

# 1. *Download* the sample database

<hr class="mb-4" />

- Create a couple new directories locally - `/data-engine` and `/data-engine/database`
- [Download State of Data DB](https://github.com/directus-labs/workshops/raw/main/database-to-data-engine/database/state-of-data.db) into the `/data-engine/database` directory
    ```markdown
    https://github.com/directus-labs/workshops/raw/main/database-to-data-engine/database/state-of-data.db
    ```
- Open `/data-engine` in VS Code

<style>
    li {
        font-size: 1.5rem !important;
        line-height: 3rem !important;
    }
</style>

---
layout: two-cols
background: '/backgrounds/dark-geo.png'
---

# 2. Create a *Docker Compose* file

<hr class="mb-4" />

- Within `/database-engine` create a new file named <br> `docker-compose.yaml`.
- Copy and paste the code on the right into the file.
- Save the file.
- From your terminal (`⌘T` within VS Code), run `docker compose up`

::right::
```yml
version: "3"
services:
  directus:
    image: directus/directus:10.10.6
    ports:
      - 8055:8055
    volumes:
      - ./database:/directus/database
      - ./uploads:/directus/uploads
      - ./extensions:/directus/extensions
    environment:
      KEY: "unique-key-here"
      SECRET: "private-secret-here"
      ADMIN_EMAIL: "admin@example.com"
      ADMIN_PASSWORD: "password"
      DB_CLIENT: "sqlite3"
      DB_FILENAME: "/directus/database/state-of-data.db"

```

<style>
    li {
        font-size: 1.2rem !important;
        /* line-height: 3rem !important; */
    }
</style>



---

# Directus bootstraps onto your database

Your data remains pure. All Directus metadata gets stored in prefixed tables that are simple to delete later if no longer needed.

<div class="flex gap-6 w-full">
    <img src="/terminal-docker-compose-up.png" class="w-1/2 max-h-[450px] object-contain" />
    <img src="/directus-tables.png" class="w-1/2 max-h-[450px] object-contain" />
</div>

---
layout: cover
---

# BOOM 💥
You've got REST and GraphQL APIs ready to go. Full CRUD in seconds.

### REST

```
GET
http://localhost:8055/items/answers

```
<br>

### GraphQL
```
POST
http://localhost:8055/graphql

query {
    answers {
        id
        answer
        question_id
        survey_response_id
    }
}
```

---
layout: cover
---

# Oops Wait A Minute 🛑

Hold the presses. Directus keeps your data secure by design (and default). <br>
So we need to adjust permissions.



<img src="/error-forbidden.png" class="max-h-[300px] rounded-xl"/>


::right::


---
layout: default
---
# 3. Adjust the Access Control settings

- Login to Directus
- Open [Access Control settings](http://localhost:8055/admin/settings/roles/)
- Public Role
- Add "Read" permissions for each collection


<img src="/permissions.png" class="w-full object-contain rounded-xl border border-gray-300 mt-4"/>


---
layout: default
---

# 4. Test Your New *APIs*

### Get Items
`GET`

```
http://localhost:8055/items/answers
```

<hr class="my-4">

### Get Item
`GET`

```
http://localhost:8055/items/answers/00004f55-c2cc-46bd-a0f2-b8d1a24cf671
```




---

## Global Parameters
<hr class="mb-2">

### `fields`

The REST APIs are GraphQL-like. Allowing you to only fetch the exact fields you want, even relational fields.

```
http://localhost:8055/items/answers?fields=answer,question_id.title,survey_response_id.*
```
<hr class="my-4">

### `filter`
Return items that match specific conditions. See available [Filter Rules](https://docs.directus.io/reference/filter-rules.html)

```
http://localhost:8055/items/answers?filter[question_id][_eq]=gEMB4PWaQ18V
```
<hr class="my-4">

[View all Global Query Parameters](https://docs.directus.io/reference/query.html)

---

## Global Parameters
<hr class="mb-2">

### `aggregate`

Perform calculations and return a single result for items within a collection.
```
http://localhost:8055/items/answers?aggregate[count]=*
```
<hr class="my-4">

### `groupBy`
Combine with aggregate to group results based on a shared value. You can group by multiple fields at the same time.
```
http://localhost:8055/items/answers?aggregate[count]=*&groupBy[]=question_id&groupBy[]=answer
```
<hr class="my-4">

[View all Global Query Parameters](https://docs.directus.io/reference/query.html)

---
layout: cover
---
# *Recap*

In roughly an hour, you have:
- Given a sad lonely SQL database new purpose.
- Built a powerful data engine that can power almost any digital project.
- Created full CRUD REST and GraphQL APIs.
- Built a dashboard to analyze data.
- Created an automated workflow – summarization of long text.

---

# Where to go *from here*

- Learn more about Directus on our website


---
layout: cover
background: '/backgrounds/dark-glow.png'
---
<div class="">
    <p class="text-center text-9xl font-bold">Fin.</p>
</div>
