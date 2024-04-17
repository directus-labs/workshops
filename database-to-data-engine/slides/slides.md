---
# try also 'default' to start simple
theme: ./theme
favicon: 'https://directus.io/favicon.ico'
# some information about your slides, markdown enabled
title: Connecting Stripe and Directus // Directus+ Workshops
info: |
  Minimum Viable Billing: How to connect Stripe with Directus to accept paymentst
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

# Powerful Data Engine

*from a siloed SQL database*


- Connect Directus to your database
- Create instant REST and GraphQL APIs
- Restrict permissions to our data
- Share data with non-technical users
- Build a dashboard without writing code
- Automate a workflow

---

# Product Page

<img src="/product-page.png" class="mb-4" />

---

# Flow

<img src="/stripe-handler.png" />

---
layout: cover
background: '/backgrounds/dark-glow.png'
class: 'text-white '
---

# Prerequisites

Here's what you'll need for the workshop.

- Stripe account
- Directus instance
- Github account
- VSCode editor

<br>

*Duration*
- Budget roughly 2 hrs

---
layout: section
---

# **Let's Hop In 🐰**

---

# 1. Configure *Directus*

<hr class="mb-4" />

### Add `subscribers` collection to your data model.

Fields:

- `id` (Type: Manually entered string, coming from Stripe subscription)
- `email` (Type: String)
- `name` (Type: String)
- `github_username` (Type: String)
- `stripe_customer_id` (Type: String)
- `amount` (Type: Decimal)
- `status` (Type: String)
- `created` (Type: Timestamp)
- `ended_at` (Type: Timestamp)
- `metadata` (Type: JSON)

<style>
    li {
        font-size: 1rem !important;
    }
</style>

---
layout: two-cols
---

# 2. Configure *Stripe* Product

<hr class="mb-4" />

- [ ] Switch to Test mode
- [ ] Create a new product
- [ ] Create a payment link
  - [ ] Add custom field for `GitHub Username`
- [ ] Copy link

::right::
<img src="/stripe-product.png" />


---

# 3a. Create a *Product Page*

<hr class="mb-4" />

- [ ] Copy and paste into new VS Code editor
- [ ] Save as index.html


```html {all}{maxHeight:'300px'}
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Connecting Stripe with Directus</title>
    <script src="https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                    },
                    fontFamily: {
                        mono: ['Fira Mono', 'sans-serif'],
                    },

                }
            }
        }
    </script>
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=fira-mono:400,500,700" rel="stylesheet" />
</head>

<style>

</style>

<body>
    <div class="bg-white">
        <div class="pb-16 pt-6 sm:pb-24">
            <nav aria-label="Breadcrumb" class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <p class="mr-4 font-mono text-gray-900">Connecting with Stripe - Directus+ Workshop
                </p>
            </nav>
            <div class="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <div class="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
                    <div class="lg:col-span-5 lg:col-start-8  border-2 border-black  p-4">
                        <div class="flex justify-between items-baseline">
                            <h1 class="text-2xl font-bold font-mono text-gray-900">Directus Arcade</h1>
                            <p class="text-xl font-medium font-mono text-violet-600">$29/month</p>
                        </div>

                    </div>

                    <!-- Image gallery -->
                    <div class="-mt-[2px] lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
                        <h2 class="sr-only">Images</h2>
                        <div class="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
                            <img src="https://marketing.directus.app/assets/c02ae5db-9f53-4c29-aadf-c59b54056845?width=2368&format=auto"
                                class="lg:col-span-2 lg:row-span-2 border-2 border-black">
                        </div>
                    </div>

                    <div class="-mt-[2px] lg:col-span-5 border-2 border-black p-4">
                        <form class="">
                            <!-- Product details -->
                            <div class="">
                                <h2 class="text-sm font-medium text-gray-900 font-mono">Description</h2>
                                <div class="prose prose-sm mt-4 text-gray-500">
                                    <p>
                                        Step right up to Directus Arcade, where the golden era of gaming is always just
                                        a click away! With our premium subscription service, you'll unlock an unrivaled
                                        treasure trove of classic games, each one a pixel-perfect passport to nostalgia.
                                    </p>
                                    <p class="font-mono font-medium">With your subscription, you'll enjoy:</p>
                                    <ul>
                                        <li><strong class="text-violet-600">Unlimited Access:</strong> Play to your
                                            heart's content, with no
                                            quarters required.
                                        </li>
                                        <li><strong class="text-violet-600">Exclusive Competitions:</strong> Join
                                            subscriber-only tournaments
                                            and win brag-worthy
                                            prizes.</li>
                                        <li><strong class="text-violet-600">Community Forums</strong>: Swap tips,
                                            stories, and make friends with
                                            fellow retro
                                            gaming aficionados.</li>
                                        <li><strong class="text-violet-600">Monthly Mystery Game:</strong> A surprise
                                            title added every month,
                                            chosen from the
                                            rarest gems in gaming history.</li>
                                    </ul>

                                </div>
                            </div>

                            <a href="your_stripe_payment_link_here"
                                class="relative mt-8 font-mono flex w-full items-center justify-center bg-violet-500 px-8 py-3 text-xl font-medium text-white hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 border-black border-2">
                                <span class="">Buy Now</span>
                            </a>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>

</html>

<script></script>
```

---

# 3b. Add to *Product Page*

<hr class="mb-4" />

Open index.html and add Stripe payment link to Buy Now button

**Before**
```html {1}
<a href="your_stripe_payment_link_here"
  class="relative mt-8 font-mono flex w-full items-center justify-center bg-violet-500 px-8 py-3 text-xl font-medium text-white hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 border-black border-2">
  <span class="">Buy Now</span>
</a>
```

**After**
```html {1}
<a href="https://buy.stripe.com/test_5kA9BL2XhbMMdhueUX"
  class="relative mt-8 font-mono flex w-full items-center justify-center bg-violet-500 px-8 py-3 text-xl font-medium text-white hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 border-black border-2">
  <span class="">Buy Now</span>
</a>
```

---

# 4. Create a new *GitHub repo*

<hr class="mb-4" />

- [ ] Create private repo `directus-arcade`
  - Add a readme
- [ ] Generate personal access token
  - https://github.com/settings/apps
  - Fine-grained
  - Only select repositories
  - Permissions
    - Administration
      - Read and write
- [ ] Save token

---

# 5. Create *Directus Flow*

<hr class="mb-4">

Time to create a flow to catch our Stripe webhooks.

<br>

Incoming Webhook

method: `POST`

<br>

- [ ] Setup Webhook Trigger
- [ ] Save Flow
- [ ] Copy Webhook URL

---


# 6. Configure *Stripe Webhook*

<hr class="mb-4">

### Local Development

- [ ] Install Stripe CLI - https://docs.stripe.com/stripe-cli
- [ ] Login - `stripe login`
- [ ] Setup local listener
    ```
    stripe listen --forward-to http://0.0.0.0:8055/flows/trigger/webhook-trigger-url
    ```

<br>

### Production Environment
- [ ] Paste Directus Webhook Trigger URL
- [ ] Select events
    - checkout.session.completed
    - customer.subscription.deleted


---

# 7. Test *Your Flow*

- [ ] Open the index.html in your browser.
- [ ] Click the Buy Now button.
- [ ] Complete Stripe test checkout.
    - Use `4242424242424242` as test credit card.
    - `10/30` Expiration Date
    - `123` CVV

---
layout: section
---
# ***Directus Flow*** <br> **8. Subscription Creation**

---

## Condition

If Event = Checkout Session Completed

key: `if_event_checkout_session_completed`

```json
{
    "$trigger": {
        "body": {
            "type": {
                "_eq": "checkout.session.completed"
            }
        }
    }
}
```
---

## Run Script

Format Subscriber

key: `format_subscriber`

```ts {all}{maxHeight:'300px'}
function formatSubscriber(jsonData) {
    // Check if the event type is 'checkout.session.completed'
    if (!jsonData.body || jsonData.body.type !== "checkout.session.completed") {
        throw new Error("Event type is not 'checkout.session.completed'.");
    }

    // Initialize variables to store the extracted values
    let email = jsonData.body.data.object.customer_details.email;
    let githubUsername = null;
    let stripeCustomerId = jsonData.body.data.object.customer;
    let stripeSubscriptionId = jsonData.body.data.object.subscription;
    let createdTimeUnix = jsonData.body.data.object.created; // This is in Unix time format
    let name = jsonData.body.data.object.customer_details.name;
    let amount = jsonData.body.data.object.amount_total / 100; // Convert to dollars

    // Access the custom fields array
    let customFields = jsonData.body.data.object.custom_fields;

    // Extract the custom fields for GitHub username
    if (customFields && customFields.length > 0) {
        for (let field of customFields) {
            if (field.key === "githubusername") {
                githubUsername = field.text.value;
            }
        }
    }

    // Ensure GitHub username is found
    if (githubUsername === null) {
        throw new Error("GitHub username not found in custom fields.");
    }

    // Convert created time to timestampz format
    let createdTime = new Date(createdTimeUnix * 1000).toISOString();

    return {
        id: stripeSubscriptionId,
        name,
        email,
        github_username: githubUsername,
        stripe_customer_id: stripeCustomerId,
        created: createdTime,
        metadata: jsonData.body,
        amount,
        status: 'active'
    };
}

module.exports = async function(data) {
    try {
        const info = formatSubscriber(data.$trigger);
        return info;
    } catch (error) {
        throw new Error(e);
    }
}
```

---

## Create Data

**Create Subscriber**

key: `create_subscriber`

collection: `subscribers`

payload:
```
"{{format_subscriber}}"
```

---

## Webhook Request

**Add to Repo**

key: `add_to_repo`

method: `PUT`

url:

```json
https://api.github.com/repos/{{your_name}}/{{your_repo}}/collaborators/{{format_subscriber.github_username}}
```

headers:
- Authorization: `Bearer github_pat_personal_token`
- X-GitHub-Api-Version: `2022-11-28`
- Accept: `application/vnd.github+json`

body:

```json
{"permission":"read"}
```

<style>
    .slidev-layout {
        font-size: 1rem;
    }
</style>

---

# 9. Test *Your Flow* AGAIN

<hr class="mb-4" />

- [ ] Open the index.html in your browser.
- [ ] Click the Buy Now button.
- [ ] Complete Stripe test checkout.
  - Use `4242424242424242` as test credit card.
  - `10/30` Expiration Date
  - `123` CVV
- [ ] Inspect Directus
    - `subscribers` collection
    - Review Flows activity logs

---
layout: section
---

# ***Directus Flow*** <br> **10. Subscription Cancellation**

---

## Condition

**If Event = Subscription Deleted**

key: `if_event_subscription_deleted`

collection: `subscribers`

```json
{
    "$trigger": {
        "body": {
            "type": {
                "_eq": "customer.subscription.deleted"
            }
        }
    }
}
```

---
title: Subscription Change
---

## Run Script

**Subscription Change**

key: `subscription_change`

```js {all}{maxHeight:'300px'}
function formatSubscriptionDeleted(webhookData) {
    let response = {
        id: null,
        stripe_customer_id: null,
        status: null,
        ended_at: null
    };

    if (!webhookData || !webhookData.body || !webhookData.body.data || !webhookData.body.data.object) {
        throw new Error('Invalid webhook data');
    }

    const subscriptionData = webhookData.body.data.object;

    response.id = subscriptionData.id;
    response.stripe_customer_id = subscriptionData.customer;
    response.status = subscriptionData.status;
    response.ended_at = new Date(subscriptionData.canceled_at * 1000).toISOString();

    return response;
}

module.exports = async function (data) {
    try {
        const result = formatSubscriptionDeleted(data.$trigger)
        return result
    } catch (error) {
        throw new Error(error)
    }

}
```

---

## Update Data

**Update Subscriber**

key: `update_subscriber`

collection: `subscribers`

payload:

```json
"{{subscription_change}}"
```

query:

```json
{
    "filter": {
        "id": {
            "_eq": "{{subscription_change.id}}"
        }
    }
}
```

---
title: Read Data
---

## Read Data

**Find Subscriber**

key: `find_subscriber`

collection: `subscribers`

ids:
```
{{subscription_change.id}}
```

query:

```json
{
    "fields": [
        "*"
    ]
}
```

---

## Webhook Request

**Remove from Repo**

key: `remove_from_repo`

method: `DELETE`

url:

```json
https://api.github.com/repos/{{your_user}}/{{your_repo}}/collaborators/{{find_subscriber[0].github_username}}
```

body: `empty`

headers:
- Authorization: `Bearer github_pat_personal_token`
- X-GitHub-Api-Version: `2022-11-28`
- Accept: `application/vnd.github+json`

<style>
    .slidev-layout {
        font-size: 1rem;
    }
</style>


---

# 11. Test *Your Flow* AGAIN AGAIN

<hr class="mb-4" />

- [ ] Open Stripe dashboard
- [ ] Click on active subscription.
- [ ] Cancel an active subscription.
- [ ] Inspect Directus
    - `subscribers` collection
    - Review Flows activity logs


---
layout: cover
background: '/backgrounds/dark-glow.png'
---
<div class="">
    <p class="text-center text-9xl h-full">👏👏👏</p>
</div>

---
layout: cover
background: '/backgrounds/purple-geo.png'
class: 'text-center'
---

# *Bonus Round*
# Create a MRR Dashboard

---

# 1. *Create a* `metrics` *collection*

<hr class="mb-4" />

Fields:

- `id` (Type: UUID)
- `service` (Type: String)
- `key` (Type: String)
- `value` (Type: Float)
- `status` (Type: String)

---

# 2. Create a *Scheduled Flow*

Runs once per day to gather and calculate metrics.

<br>

## Trigger

**Cron**

Once per day

**`0 0 * * *`**


---

## Read Subscribers

key: `read_subscribers`

collection: `subscribers`

query:

```json
{
    "filter": {
        "status": {
            "_eq": "active"
        }
    },
    "limit": -1,
    "fields": [
        "id",
        "amount"
    ]
}
```

---

## Run Script

Calculate Totals

key: `calculate_totals`

```js {all}{maxHeight:'300px'}
function sumArr(data) {
    return data.reduce((total, subscriber) => {
        return total + parseFloat(subscriber.amount) * 12;
    }, 0);
}

function sumMrr(data) {
	return data.reduce((total, subscriber) => {
			return total + parseFloat(subscriber.amount);
			}, 0);
}

module.exports = function(data) {
    try {
    const arr = sumArr(data.read_subscribers)
    const mrr = sumMrr(data.read_subscribers)
    const activeSubscribers = data.read_subscribers.length
    return [
        {
            "service": "your_service",
            "key": "arr",
            "value": arr,
        },
        {
            "service": "your_service",
            "key": "mrr",
            "value": mrr,
        },
        {
            "service": "your_service",
            "key": "active-subscribers",
            "value": activeSubscribers,
        }
    ];
    } catch(error) {
        throw new Error(error)
    }
}
```

---

## Create Data

collection: `metrics`

payload:

```json
"{{calculate_totals}}"
```

---
layout: two-cols
---
# 3. Create *Dashboard*

```json {all}{maxHeight:'400px'}
[
	{
		"name": "Subscriptions",
		"icon": "attach_money",
		"note": null,
		"color": null,
		"panels": [
			{
				"name": "MRR Over Time",
				"icon": null,
				"color": null,
				"show_header": true,
				"note": null,
				"type": "time-series",
				"position_x": 1,
				"position_y": 25,
				"width": 30,
				"height": 11,
				"options": {
					"collection": "metrics",
					"dateField": "timestamp",
					"valueField": "value",
					"function": "sum",
					"precision": "day",
					"range": "auto",
					"filter": {
						"_and": [
							{
								"service": {
									"_contains": "stripe"
								}
							},
							{
								"key": {
									"_contains": "mrr"
								}
							}
						]
					},
					"color": "#2ECDA7"
				}
			},
			{
				"name": "New Subscribers Per Day",
				"icon": null,
				"color": null,
				"show_header": true,
				"note": null,
				"type": "time-series",
				"position_x": 1,
				"position_y": 12,
				"width": 30,
				"height": 11,
				"options": {
					"collection": "subscribers",
					"dateField": "created",
					"valueField": "id",
					"function": "count",
					"precision": "day",
					"range": "auto",
					"color": "#6644FF"
				}
			},
			{
				"name": "Current MRR",
				"icon": "floor",
				"color": null,
				"show_header": true,
				"note": null,
				"type": "metric",
				"position_x": 16,
				"position_y": 2,
				"width": 15,
				"height": 8,
				"options": {
					"collection": "subscribers",
					"field": "amount",
					"function": "sum",
					"prefix": "$ ",
					"filter": {
						"_and": [
							{
								"status": {
									"_eq": "active"
								}
							}
						]
					}
				}
			},
			{
				"name": "ARR Over Time",
				"icon": null,
				"color": null,
				"show_header": true,
				"note": null,
				"type": "time-series",
				"position_x": 1,
				"position_y": 36,
				"width": 30,
				"height": 11,
				"options": {
					"collection": "metrics",
					"dateField": "timestamp",
					"valueField": "value",
					"function": "sum",
					"precision": "day",
					"range": "auto",
					"filter": {
						"_and": [
							{
								"service": {
									"_contains": "stripe"
								}
							},
							{
								"key": {
									"_contains": "arr"
								}
							}
						]
					},
					"color": "#2ECDA7"
				}
			},
			{
				"name": "Current Active Subscribers",
				"icon": "floor",
				"color": null,
				"show_header": true,
				"note": null,
				"type": "metric",
				"position_x": 1,
				"position_y": 2,
				"width": 15,
				"height": 8,
				"options": {
					"collection": "subscribers",
					"field": "id",
					"function": "count",
					"filter": {
						"_and": [
							{
								"status": {
									"_eq": "active"
								}
							}
						]
					}
				}
			}
		]
	}
]

```

::right::
<img src="/dashboard.png" />

---
layout: cover
---
# *Recap*

You've built:
- A tool for selling selling subscriptions for digital products and/or code.
- A robust workflow to manage subscriptions.
- A dashboard to track and measure your MRR, ARR, and subscribers.

---

# *Downsides* to this approach

- It's best practice to use the Stripe package to verify webhooks <br>(We elected not to do that for sake of speed and reduced complexity.)
- If you need to add a lot of additional steps or logic, flows can get a bit unwieldy.

---

# Where to go *from here*

- **Build a side project** to sell a tool or utility you've built.
- **Store private keys more securely.**
- Once you validate your ideas / products  - you might put all this logic inside **custom hooks and endpoints.**
- **Create new flows** for refunds, coupon codes, or syncing products from within Directus.


---
layout: cover
background: '/backgrounds/dark-glow.png'
---
<div class="">
    <p class="text-center text-9xl font-bold">Fin.</p>
</div>
