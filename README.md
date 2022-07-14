# A Salesforce Integration for Stripe Apps

**This repo contains the backend code that allows you to deploy a Stripe App that integrates with your Salesforce.com (SFDC) instance. Once deployed and connected you will see customer information retrieved from your SFDC instance inside Stripe as you navigate through your customers. All of this without the need to leave the dashboard. This app helps you get work done, faster! Objectively it is also a great learning opportunity to develop Enterprise Stripe Apps**

## Functionalities

- **Sync your customer’s contact information from Stripe to SFDC**

  - Use this app to quickly leave notes on your customers' profiles on SFDC directly from within Stripe.

- **Better understand how your operations are impacting your sales**

  - At a glance, retrieve customer data to answer operational questions about customer activity, payments or invoicing.

- **Identify how you can drive better customer success**
  - Inspect advanced information such as past or ongoing issues (cases) to help you drive better decision-making during critical customer success journeys.

[Learn more about the Stripe App for SFDC here (YouTube)](https://youtu.be/EfLHVQbRLEE?t=1138)

## Requirements
To run this repo you will be required to have docker installed on your machine.
docker now comes bundled with what was previously known as [docker-compose](https://docs.docker.com/compose/) which replaces `docker-compose`


## How to install - Setup guide

- Clone this repo
- (Optional) Edit your .postgres-env file and change the POSTGRES_DB and POSTGRES_PASSWORD for your POSTGRES_DB values
- Create an `.env` file inside the this directory, with the following data:
```
DATABASE_URL=postgres://postgres:27697b4b-c31a-4823-8e8b-4085547face6@postgres:5432/sales-stripes
STRIPE_APP_SECRET=
STRIPE_API_KEY=
SALESFORCE_CONSUMER_KEY=
SALESFORCE_CONSUMER_SECRET=
SALESFORCE_REDIRECT=<your-url.com>/auth/salesforce/callback
```
  - Replace where appropriate.
    - For example, if you optionally changed the name and password of your postgres database in step 2, you're going to have adjust the `DATABASE_URL` value in the above .env file

    - The `STRIPE_API_KEY` and `STRIPE_APP_SECRET` are available in your [Stripe account dashboard](https://dashboard.stripe.com/dashboard).
    - Specifically, the `STRIPE_API_KEY` is located under the APIKeys section of [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
    - Meanwhile the `STRIPE_APP_SECRET` is created when you set-up the app's frontend through the Stripe CLI.
      - You can find it [on the Stripe dashboard under the app section](https://dashboard.stripe.com/apps/com.sfdc-stripe.sfdcinsights)
      - Click the three-dot menu (top right corner) and then "Signing Secret" to view it.
    - ⚠️ If you navigate to the [Apps section in Stripe Dashboard](https://dashboard.stripe.com/apps) and do not see anything listed you need to create the app first. [Refer to the documentation that shows how to create your app](https://stripe.com/docs/stripe-apps/create-app) 
    - `SALESFORCE_CONSUMER_KEY` and `SALESFORCE_CONSUMER_SECRET` can be obtained by creating an Oauth app for Salesforce. Refer to the documentation in the [sibling repo to get this data](https://github.com/sfdc-stripe/sfdc-stripe-frontend/blob/main/README.md)
    - Finally, `SALESFORCE_REDIRECT` needs to be adjust to point to the domain or IP on where your backend will be running:
        - It could be `localhost:1337` if you're planning to launch the docker-compose.yml, or another URL if you're planning to launch `docker-compose.prod.yml` (using the prod compose file, you're going to map the backend app to port 80)
        - Build the backend by using docker
```
docker compose build && docker compose up
```

-  The backend should be operational and running. ✨ Your frontend should be fully functional at this point.

## Questions & Support

Support is available through the opening of a github issue and tagged with the "question" label or via [StackOverflow](https://stackoverflow.com/questions/tagged/sfdcstripe) using the tag `stripeappsfdc`

## Where to go from here?

### Customize this app!

- If you need help customizing this app to fit your specific needs - [contact me through this form](https://stripe-apps-form-b45a.netlify.app/)
- Want to publish a custom version of this app onto the marketplace but keep it private? You can! This is useful for people who want to distribute a private version of an app only to members with access to a specific Stripe account. [Read this guide here to learn more](https://stripe.com/docs/stripe-apps/distribution-options)
- Fork this app and build a better version and you want to distribute it onto the public Stripe Marketplace? [Read this guide to publish your app](https://stripe.com/docs/stripe-apps/publish-app)

---

## Powered by:

<img src="https://logotyp.us/files/salesforce.svg" width="100" style="max-width: 100%;"/>

<img src="https://github.com/stripe/stripe-apps/raw/main/.readme/stripe-apps-burple.svg" width="100" style="max-width: 100%;" />
