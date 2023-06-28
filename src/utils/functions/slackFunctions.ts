import { App } from "@slack/bolt"
import dotenv from 'dotenv'
dotenv.config()

const token = process.env.NEXT_PUBLIC_SLACK_BOT_TOKEN

const app = new App({
    signingSecret: process.env.NEXT_PUBLIC_SLACK_SIGNING_SECRET,
    token: token
})

export async function sendSchoolToSlack(schoolName: string, zipCode: string, state: string, city: string, address: string, cnpj: string, inepCode: string, email: string, administrator: string) {
    const blocks = [
        {
            "type": "divider"
        },
        {
            "type": "header",
            "text": {
                "type": "plain_text",
                "text": "➡ New School Sent",
                "emoji": true
            }
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": `*∙ School's Name:* ${schoolName}`
            }
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": `*∙ Zip Code:* ${zipCode}`
            }
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": `*∙ State:* ${state}`
            }
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": `*∙ City:* ${city}`
            }
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": `*∙ Address:* ${address}`
            }
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": `*∙ CNPJ:* ${cnpj}`
            }
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": `*∙ Inep Code:* ${inepCode}`
            }
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": `*∙ E-Mail:* ${email}`
            }
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": `*∙ Administrator:* ${administrator}`
            }
        },
        {
            "type": "actions",
            "elements": [
                {
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "text": "Approve :white_check_mark:",
                        "emoji": true
                    },
                    "value": "add_to_catalog",
                    "url": "https://ivttoken.vercel.app/pt-br/user/admin/approve/school"
                }
            ]
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": ':warning: *Remember to mark this message as _"Done"_ after approving* :warning:'
            }
        },
        {
            "type": "divider"
        }
    ]

    if (process.env.NEXT_PUBLIC_SLACK_CHANNEL) {
        return await app.client.chat.postMessage({
            text: 'New School',
            token: token,
            channel: process.env.NEXT_PUBLIC_SLACK_CHANNEL,
            blocks
        })
    }
}

export async function sendIspToSlack(name: string, cnpj: string, email: string) {
    const blocks = [
        {
            "type": "divider"
        },
        {
            "type": "header",
            "text": {
                "type": "plain_text",
                "text": "➡ New Internet Service Provider Sent",
                "emoji": true
            }
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": `*∙ Name:* ${name}`
            }
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": `*∙ E-Mail:* ${email}`
            }
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": `*∙ CNPJ:* ${cnpj}`
            }
        },
        {
            "type": "actions",
            "elements": [
                {
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "text": "Approve :white_check_mark:",
                        "emoji": true
                    },
                    "value": "add_to_catalog",
                    "url": "https://ivttoken.vercel.app/pt-br/user/admin/approve/isp"
                }
            ]
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": ':warning: *Remember to mark this message as _"Done"_ after approving* :warning:'
            }
        },
        {
            "type": "divider"
        }
    ]

    if (process.env.NEXT_PUBLIC_SLACK_CHANNEL) {
        return await app.client.chat.postMessage({
            text: 'New ISP',
            token: token,
            channel: process.env.NEXT_PUBLIC_SLACK_CHANNEL,
            blocks
        })
    }
}

export async function sendTicketToSlack(name: string, email: string, subject: string, message: string) {
    const blocks = [
        {
            "type": "divider"
        },
        {
            "type": "header",
            "text": {
                "type": "plain_text",
                "text": "➡ New Ticket Sent",
                "emoji": true
            }
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": `*∙ Name:* ${name}`
            }
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": `*∙ E-Mail:* ${email}`
            }
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": `*∙ Subject:* ${subject}`
            }
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": `*∙ Message:* ${message}`
            }
        },
        {
            "type": "divider"
        }
    ]

    if (process.env.NEXT_PUBLIC_SLACK_CHANNEL) {
        return await app.client.chat.postMessage({
            text: 'New Ticket',
            token: token,
            channel: process.env.NEXT_PUBLIC_SLACK_CHANNEL,
            blocks
        })
    }
}