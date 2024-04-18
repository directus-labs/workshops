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
- Restrict permissions to your data
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
- Roughly 1 hr

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
      WEBSOCKETS_ENABLED: true

```

<style>
    li {
        font-size: 1.2rem !important;
        /* line-height: 3rem !important; */
    }
</style>



---

# Directus becomes *best friends* with your db

Directus sits alongside your database so your data remains pure. All Directus metadata gets stored in prefixed tables that are simple to delete later if no longer needed.

<div class="grid grid-cols-2 gap-6 w-full">
    <!-- <img src="/terminal-docker-compose-up.png" class=" max-h-[450px] object-contain" /> -->
    <img src="/directus-tables.png" class=" max-h-[450px] object-contain" />
    <img src="/best-friends.gif" class=" max-h-[200px] object-contain" />
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

Here we fetch the question and the survey response in a single call.

```
http://localhost:8055/items/answers?fields=answer,question_id.title,survey_response_id.*
```
<hr class="my-4">

### `filter`
Return items that match specific conditions like only showing answers for a specific question. See available [Filter Rules](https://docs.directus.io/reference/filter-rules.html)

```
http://localhost:8055/items/answers?filter[question_id][_eq]=gEMB4PWaQ18V
```
<hr class="my-4">

[View all Global Query Parameters](https://docs.directus.io/reference/query.html)

---

## Global Parameters
<hr class="mb-2">

### `aggregate`

Perform calculations and return a single result for items within a collection like counting the total number of answers.
```
http://localhost:8055/items/answers?aggregate[count]=*
```
<hr class="my-4">

### `groupBy`
Combine with aggregate to group results based on a shared value. You can group by multiple fields at the same time.

Here we group by question and answers so we can get a count of how many respondents chose each answer. Perfect for analytics and dashboards.
```
http://localhost:8055/items/answers?aggregate[count]=*&groupBy[]=question_id&groupBy[]=answer
```
<hr class="my-4">

[View all Global Query Parameters](https://docs.directus.io/reference/query.html)

---
layout: cover
background: '/backgrounds/dark-glow.png'
---

# **Adding Your <br>*Team Members* 🐰🐰🐰**


---
layout: two-cols
---
# 5. Create a *Beautiful UI*

<hr class="mb-4" />

- Go to [Data Model settings](http://localhost:8055/admin/settings/data-model)
- For `answers` collection - add two new textarea fields
  - `team_notes`
  - `ai_summary`
- Adjust the forms and interfaces for each collection (answers, questions, survey_responses) to your own liking


::right::

<img src="/answer-form.png" class="rounded-xl" />



---
layout: two-cols
---
# 6. Add a new *Role*

<hr class="mb-4" />

- Open [Access Control settings](http://localhost:8055/admin/settings/roles/)
- Create a new role "User" or "Team Member"
- Enable App Access
- Add "Read" permissions for each collection


::right::
<img src="/team-member-role.png" class="rounded-xl" />


---
layout: two-cols
---

# 7. Invite a new *User*

<hr class="mb-4" />

- Open [User Directory](http://localhost:8055/admin/users/+)
- Create a new user
- Add email and password
- Don't forget to apply the role you created
- Save user
- Login to Directus in incognito window


::right::

<img src="/new-user.png" class="rounded-xl mb-4" />

<img src="/new-user-role.png" class="rounded-xl" />

---
layout: cover
background: '/backgrounds/dark-glow.png'
---

# **Building a <br>*Dashboard* 📈**

---
layout: cover
---
## *Dashboards* – without code or SQL queries

<div class="flex gap-6 mt-4">
    <img src="/state-of-data-dashboard.png" class="rounded-xl w-1/2 object-contain" />
    <img src="/panel-options.png" class="rounded-xl w-1/2 object-contain" />
</div>


---
layout: two-cols
---


# 8. Import *Dashboard*

<hr class="mb-4" />

- Copy / paste code into a new `.json` file. <br>😅🤦‍♂️ *<span class="text-gray-500">Ohh the irony  - this is just a shortcut for this workshop.</span>*
- Open [Insights module](http://localhost:8055/admin/insights).
- Open Sidebar and click Import option.
- Choose file and start import.

<br>

[Learn about all the different Panels](https://docs.directus.io/user-guide/insights/panels.html)


::right::
```json {all}{maxHeight:'450px'}
[
	{
		"name": "State of Data",
		"icon": "globe_uk",
		"note": "Dashboard for the Directus State of Data 2024 Survey",
		"color": null,
		"panels": [
			{
				"name": "Answers",
				"icon": "library_add_check",
				"color": null,
				"show_header": true,
				"note": "A summary of the responses to the question",
				"type": "metric-list",
				"position_x": 1,
				"position_y": 28,
				"width": 30,
				"height": 20,
				"options": {
					"collection": "answers",
					"groupByField": "answer",
					"limit": -1,
					"aggregateFunction": "count",
					"filter": {
						"_and": [
							{
								"question_id": {
									"id": {
										"_eq": "{{question}}"
									}
								}
							}
						]
					},
					"aggregateField": "answer"
				}
			},
			{
				"name": "Total Complete Survey Responses",
				"icon": null,
				"color": "#6644FF",
				"show_header": true,
				"note": null,
				"type": "metric",
				"position_x": 1,
				"position_y": 11,
				"width": 30,
				"height": 6,
				"options": {
					"collection": "survey_responses",
					"field": "id",
					"function": "count",
					"sortField": "submitted_at",
					"conditionalFormatting": [
						{
							"operator": ">=",
							"value": 0,
							"color": "#6644FF"
						}
					]
				}
			},
			{
				"name": "Question",
				"icon": "question_mark",
				"color": null,
				"show_header": true,
				"note": "Choose a specific question to summarize responses",
				"type": "relational-variable",
				"position_x": 1,
				"position_y": 22,
				"width": 30,
				"height": 6,
				"options": {
					"field": "question",
					"collection": "questions",
					"displayTemplate": "{{title}}"
				}
			},
			{
				"name": null,
				"icon": "info",
				"color": null,
				"show_header": false,
				"note": null,
				"type": "label",
				"position_x": 1,
				"position_y": 8,
				"width": 30,
				"height": 3,
				"options": {
					"text": "This dashboard is just a simple example of what you can build with Directus.",
					"whiteSpace": "normal",
					"textAlign": "left",
					"fontWeight": 500,
					"font": "monospace",
					"color": "#A2B5CD"
				}
			},
			{
				"name": null,
				"icon": null,
				"color": null,
				"show_header": false,
				"note": null,
				"type": "label",
				"position_x": 1,
				"position_y": 5,
				"width": 30,
				"height": 3,
				"options": {
					"text": "Welcome to the State of Data survey dashboard 👋",
					"whiteSpace": "normal",
					"textAlign": "left",
					"fontWeight": 700,
					"font": "serif"
				}
			},
			{
				"name": null,
				"icon": "info",
				"color": null,
				"show_header": false,
				"note": null,
				"type": "label",
				"position_x": 1,
				"position_y": 19,
				"width": 30,
				"height": 3,
				"options": {
					"text": "Select a specific question below to see summarized responses.",
					"whiteSpace": "normal",
					"textAlign": "left",
					"fontWeight": 500,
					"font": "monospace",
					"color": "#A2B5CD"
				}
			}
		]
	}
]
```

---
layout: cover
background: '/backgrounds/dark-glow.png'
---

# **Automating your <br>*Workflow* 🤖**

---
layout: cover
---
## Engines need *automation*


<img src="/workflow.png" class="rounded-xl mt-4 object-contain" />



---
layout: two-cols
---

# 9. Explore the *Marketplace*

- Go to the [Marketplace](http://localhost:8055/admin/settings/marketplace)
- Find and install the [AI Writer Operation](http://localhost:8055/admin/settings/marketplace/extension/8c20b301-38aa-48a7-99c4-3142338da1b2) extension
- Reload the page

::right::
<img src="/marketplace-ai.png" class="rounded-xl object-contain" />


---
layout: two-cols
---

# 10. Start a *Flow*

- Go to [Flows](http://localhost:8055/admin/settings/flows) from within Settings
- Create new Flow named 'Summarize Long Text Answers'
- Choose Manual trigger
  - Select Answers collection
  - Require confirmation

::right::
<img src="/manual-flow.png" class="rounded-xl object-contain" />


---
layout: two-cols
---

# 11. Add a *Read Data* operation

- Key: `get_answer`
- Permissions: Full Access
- Collection: `answers`
- IDs
    ```vue
    "{{$trigger.body.keys}}"
    ```
- Query:
    ```json
    {
        "fields": [
            "*",
            "question_id.*"
        ]
    }
    ```

::right::
<img src="/read-operation.png" class="rounded-xl object-contain" />


---
layout: two-cols
---

## 12. Add an *AI Writer* extension operation

- Key: `summarize`
- OpenAI API Key: [Grab your API key](https://platform.openai.com/api-keys)
- GPT Model: Your Choice
- Prompt: Write Custom Prompt
- Custom Prompt:
    ```vue
    You are a summarization wizard.
    You'll be given a survey question and a user's answer to the question.
    Your job is to expertly summarize it in a very short sentence.
    ```
- Text:
    ```vue
    Question: {{get_answer.question_id.title}}
    Answer: {{get_answer.answer}}
    ```

::right::
<img src="/summarize-operation.png" class="rounded-xl object-contain" />


---
layout: two-cols
---
# 13. Add a *Update Data* operation

- Permissions: Full Access
- Collection: `answers`
- IDs
    ```vue
    "{{$trigger.body.keys}}"
    ```
- Payload:
    ```json
    {
        "ai_summary": "{{summarize}}"
    }
    ```

::right::
<img src="/update-operation.png" class="rounded-xl object-contain" />

---
layout: two-cols
---
# 14. Test your new *workflow*

- Search `answers` collection for lengthy answers. <br>Here's one `62ede016-371f-44a6-8857-b93c1aaf5d71`.
- Open Sidebar and click button to start flow


::right::
<img src="/flow-test.png" class="rounded-xl object-contain" />

<style>
    li {
        font-size: 1.2rem !important;
        margin-top: 8px !important;
        /* line-height: 3rem !important; */
    }
</style>

---
layout: cover
---
# *Recap*

In roughly an hour, you have:
- Given a sad lonely SQL database new purpose.
- Created full CRUD REST and GraphQL APIs.
- Built a data engine to share your data with your team *(or anyone really)*.
- Built a dashboard to analyze data.
- Created an automated workflow.
- Learned the basics and benefits of building with Directus.

---
layout: two-cols
---

# Where to go *from here*

Ready to go deeper down the rabbit hole?

- [Request commerical license pricing and/or get a one on one demo](https://directus.io/license-request?utm_source=workshop&utm_medium=database-to-data-engine)
- [Build your (CMS, LMS, PIM, SaaS) ASAP with Directus Plus](https://directus.io/plus?utm_source=workshop&utm_medium=database-to-data-engine) – a collection of Directus starter kits + advanced workshops and training.
- [Refer a friend](#) and if they book a demo, we'll send you a super sweet, super soft Directus logo tee.

::right::
<img src="/follow-white-rabbit.png" class="rounded-xl" />
<p class="text-center text-gray-500"><em>Follow the White Rabbit</em></p>

<style>
    li {
        font-size: 1.2rem !important;
        margin-top: 8px !important;
        /* line-height: 3rem !important; */
    }
</style>

---
layout: cover
background: '/backgrounds/dark-glow.png'
---
<div class="">
    <p class="text-center text-9xl font-bold">Fin.</p>
</div>


---

# Helpful *links* to learn more about Directus

<hr class="mb-2" />

## Directus Documentation

- [Quick Start Guide](https://docs.directus.io/self-hosted/quickstart.html)
- [API Reference](https://docs.directus.io/reference/introduction.html)
- [Developer Blog](https://docs.directus.io/blog/)

<hr class="my-4" />


## Directus Website

- [Directus TV](https://directus.io/tv)
