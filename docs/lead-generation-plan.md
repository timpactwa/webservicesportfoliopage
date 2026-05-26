# Lead Generation Plan

## First Source

Start with Randolph Local:

```text
https://randolphlocal.com/directory/
```

This directory is useful because it includes local businesses and may include business names, categories, phone numbers, emails, addresses, and websites.

## First Segment

Start with businesses that have no website listed.

Reasoning:

- The pain point is obvious.
- The outreach message can be simple.
- The offer is easier to understand.
- A first website project creates a strong proof of concept.

Important: a missing website field in the directory does not prove the business has no website. Every lead must be manually verified before outreach.

## Verification Steps

For every no-website lead:

1. Search the exact business name on Google.
2. Check Google Business Profile links.
3. Search the business name plus `Randolph NJ`.
4. Check whether the business has a Facebook, Instagram, booking page, or third-party profile acting as a website.
5. Mark the lead as one of:

- `no_website_found`
- `third_party_profile_only`
- `website_found`
- `inactive_or_unclear`
- `not_a_fit`

Only outreach to `no_website_found` and strong `third_party_profile_only` leads at first.

## Data Fields

Track:

- Business name
- Category
- Phone
- Email
- Address
- Directory listing URL
- Website listed in directory
- Verified website
- Verification status
- Google Business Profile URL
- Notes
- Outreach status
- Last contacted date
- Follow-up date
- Call booked
- Outcome

## Scraping Approach

The first version can be semi-automated.

Recommended process:

1. Extract visible directory listings from Randolph Local.
2. Filter for rows without a website field.
3. Export to a spreadsheet.
4. Manually verify each row.
5. Send personalized outreach.

Scraping constraint:

- Randolph Local is a WordPress/Sabai directory.
- Some listing data is visible in the HTML.
- Some requests can return a verification page.
- Any scraper should fetch politely and stop if verification appears.
- Do not build around bypassing bot protection.

## Outreach Angle

For no-website leads, lead with usefulness instead of criticism.

Example:

```text
Hi [Name],

I found [Business Name] through the Randolph Local directory. I may have missed it, but I could not find a dedicated website for the business.

My partner Tim and I run L&T Consulting and Design. We help local businesses set up clean, mobile-friendly websites so customers can find services, hours, contact info, and next steps without digging through social pages or directory listings.

Would you be open to a quick 15-20 minute Google Meet this week? No pressure either way. I can also send over a few quick ideas first if that is easier.

Best,
Luke
L&T Consulting and Design
```

## Booking

Use Google Calendar appointment scheduling and Google Meet for calls.

Recommended call name:

```text
L&T Website Consultation
```

Default call length:

```text
20 minutes
```

## Intake

Use Google Forms first.

Reason:

- It is free.
- It connects cleanly to Google Sheets.
- It is easy to automate later.
- It is good enough once a client has already booked or paid.

Typeform can be revisited later if the intake experience needs stronger branding or a better public-facing feel.
