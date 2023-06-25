import { App } from "@slack/bolt"
import dotenv from 'dotenv'
dotenv.config()

const token = process.env.NEXT_PUBLIC_SLACK_BOT_TOKEN

const app = new App({
    signingSecret: process.env.NEXT_PUBLIC_SLACK_SIGNING_SECRET,
    token: token
})

export async function sendSchoolToSlack(schoolName: string, zipCode: string, state: string, city: string, address: string, cnpj: string, inepCode: string, email: string, administrator: string) {
    const blocks = [{
        "type": "header",
        "text": {
            "type": "plain_text",
            "text": ":ivt: New School Sent",
            "emoji": true
        }
    },
    {
        "type": "divider"
    },
    {
        "type": "section",
        "text": {
            "type": "mrkdwn",
            "text": `*School's Name:* ${schoolName}`
        }
    },
    {
        "type": "section",
        "text": {
            "type": "mrkdwn",
            "text": `*Zip Code:* ${zipCode}`
        }
    },
    {
        "type": "section",
        "text": {
            "type": "mrkdwn",
            "text": `*State:* ${state}`
        }
    },
    {
        "type": "section",
        "text": {
            "type": "mrkdwn",
            "text": `*City:* ${city}`
        }
    },
    {
        "type": "section",
        "text": {
            "type": "mrkdwn",
            "text": `*Address:* ${address}`
        }
    },
    {
        "type": "section",
        "text": {
            "type": "mrkdwn",
            "text": `*CNPJ:* ${cnpj}`
        }
    },
    {
        "type": "section",
        "text": {
            "type": "mrkdwn",
            "text": `*Inep Code:* ${inepCode}`
        }
    },
    {
        "type": "section",
        "text": {
            "type": "mrkdwn",
            "text": `*E-Mail:* ${email}`
        }
    },
    {
        "type": "section",
        "text": {
            "type": "mrkdwn",
            "text": `*Administrator:* ${administrator}`
        }
    },
    {
        "type": "actions",
        "elements": [
            {
                "type": "button",
                "text": {
                    "type": "plain_text",
                    "text": "Add To Catalog :white_check_mark:",
                    "emoji": true
                },
                "value": "add_to_catalog",
                "url": "https://www.linkedin.com/in/murillolamberti/"
            }
        ]
    },
    {
        "type": "divider"
    },
    {
        "type": "section",
        "text": {
            "type": "plain_text",
            "text": ':warning: Please, remember do mark this message as "Done" after adding it to catalog :warning:',
            "emoji": true
        }
    }
]

    if (process.env.NEXT_PUBLIC_SLACK_CHANNEL) {
        return await app.client.chat.postMessage({
            token: token,
            channel: process.env.NEXT_PUBLIC_SLACK_CHANNEL,
            blocks
        })
    }
}