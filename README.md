# Dr Soyemi Patient Results Portal — Prototype

This is a browser-based prototype of the type of patient-result system used by hospitals and diagnostic clinics.

## Included
- Patient result access page
- Staff/admin result creation page
- Unique access code generation
- Patient result page
- WhatsApp message generation
- SMS message generation
- Mobile-responsive premium UI

## Demo flow
1. Open `admin.html`.
2. Enter patient/result information.
3. Click **Create Secure Link**.
4. Use **Send via WhatsApp**, **Send via SMS**, or **Open Result**.
5. The patient can also enter the generated access code at `index.html`.

## Important
This prototype uses browser localStorage only. That is NOT appropriate for real patient medical information.

For production, the system should use:
- HTTPS everywhere
- authenticated staff accounts + role-based permissions
- encrypted database/storage
- short-lived, signed patient access tokens
- optional OTP verification to the patient's phone
- audit logs for every result view/download
- automatic link expiry/revocation
- secure PDF/object storage
- malware/file validation
- backups and disaster recovery
- consent/privacy controls
- a compliant SMS provider
- WhatsApp Business Platform/API rather than personal WhatsApp links
- appropriate Nigerian privacy/medical-record compliance review

## Suggested production architecture
Frontend: Next.js/React
Backend: Node.js/NestJS or Laravel
Database: PostgreSQL
File storage: encrypted object storage
Authentication: staff 2FA + patient OTP
Messaging: approved SMS gateway + WhatsApp Business API
Hosting: reputable HTTPS cloud infrastructure

The actual medical report should be stored server-side; the patient link should contain only a random, non-guessable token.
