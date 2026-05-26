# Automation Operating Model

## Principle

L&T Consulting and Design should use automation internally before selling automation externally.

The goal is not to automate everything immediately. The goal is to design the business so repeatable steps can become automated over time.

## What To Automate First

Start with the steps that are repeated for every lead or client:

- Collecting leads from local business directories
- Checking which leads have missing, outdated, or weak websites
- Sending follow-up emails
- Sending intake forms
- Capturing intake responses
- Creating project checklists
- Sending payment links
- Tracking lead status
- Storing project notes
- Requesting missing assets
- Sending review reminders
- Asking for testimonials

## Current Manual Version

At the beginning, this can be manual but structured:

- Lead list in a spreadsheet
- Manual review of scraped directory leads before outreach
- Intake form in Google Forms
- Stripe Payment Links for deposits
- Client files in Google Drive
- Project notes in markdown or Notion
- Email templates for outreach and onboarding

The important part is consistency. If the same fields are collected every time, automation becomes much easier later.

## Future Automated Version

Future system idea:

1. Lead is added to a database.
2. Directory website field is checked against live web/search results.
3. Lead is flagged as no website, weak website, outdated website, or acceptable website.
4. Personalized outreach draft is generated from verified observations.
5. Outreach email is sent or queued.
6. Follow-up reminders are created automatically.
7. Call outcome is logged.
8. If qualified, project summary and Stripe link are generated.
9. After payment, intake form is sent automatically.
10. Intake responses are saved to a client record.
11. A project checklist is generated from scope.
12. Missing information is detected and requested.
13. After launch, testimonial and maintenance emails are triggered.

## First Lead Source

Start with:

```text
https://randolphlocal.com/directory/
```

Initial automation goal:

- Extract business listings where no website is listed.
- Save business name, category, phone, email if available, address, listing URL, and source page.
- Mark every row as `needs_manual_verification`.
- Manually check Google before outreach.

Important constraint:

- If the directory serves a verification or anti-bot page, stop the automated fetch and switch to manual/browser-assisted collection.
- Do not build the first system around bypassing protections. The goal is a reliable business process, not fragile scraping.

## Data To Collect

Collect data so the business can improve over time.

Lead data:

- Source
- Directory category
- Industry
- Town
- Listed website
- Verified website
- Website status
- Website quality
- Outreach message used
- Whether they opened/responded if available
- Call booked
- Deal outcome
- Lost reason

Client data:

- Project type
- Package
- Price
- Timeline estimate
- Actual timeline
- Number of revisions
- Client responsiveness
- Automation scope
- Maintenance selected
- Testimonial status

Project data:

- What took longest
- What information was missing
- Which pages were included
- Which automations were useful
- What objections came up
- What should be improved next time

## Website Automation Ideas

Near-term website features:

- Embedded Calendly scheduler on the contact page
- Optional project intake form linked from post-call email
- Thank-you page after booking or intake submission
- Hidden lead source tracking
- "Book a Call" primary CTA

Future website features:

- Package selection
- Deposit payment
- Automated onboarding email after payment
- Client portal
- Project status tracker
- Automated maintenance subscription setup

## Warning

Do not build a complex internal automation platform before there are real clients.

First prove:

- People respond to outreach.
- Calls convert.
- The offer is priced correctly.
- Intake questions collect the right information.
- Delivery can be repeated.

Then automate the parts that are clearly repeated.
