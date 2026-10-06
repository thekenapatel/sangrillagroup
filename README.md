# Sangrilla Group - Aspire to Grow.

Modern and elegant official website for **Sangrilla Group**, a leading real estate developer in Gujarat, India.

**Live Website:** [sangrillagroup](https://www.sangrillagroup.com/)

---

## 🌟 Lead Capture & Brochure Download Architecture

When a user enters their name and 10-digit mobile number and clicks **"Submit & Download Brochure"**:
1. **Instant Guaranteed Download**: The brochure PDF (`sangrilla-meadows-brochure.pdf`) is triggered directly within the user's click gesture context, ensuring desktop and mobile browsers (Chrome, Safari, Edge) never block it.
2. **Fail-Safe Lead Storage**:
   - The lead is instantly cached locally in `localStorage` (`sangrilla_offline_leads` and `sangrilla_contact_history`).
   - The frontend sends the lead via `POST /api/contacts` to the backend.
   - If MongoDB Atlas is connected, the document is saved directly into the `UserInfo.ContactDetails` collection.
   - If the backend is temporarily sleeping or offline, the lead remains queued locally and syncs automatically in the background. The user is **never** blocked from downloading the brochure.

---

## 🔑 Crucial MongoDB Atlas Setup (Why "SSL alert 80" Happens)

If MongoDB Atlas throws:
```
SSL routines:ssl3_read_bytes:tlsv1 alert internal error ... SSL alert number 80
```
This is MongoDB Atlas's security firewall rejecting connections because the connecting IP is not whitelisted.

### Fix in 3 Clicks:
1. Log in to [MongoDB Atlas Console](https://cloud.mongodb.com/).
2. On the left sidebar under **Security**, click **Network Access**.
3. Click the green **Add IP Address** button.
4. Click **ALLOW ACCESS FROM ANYWHERE** (this sets `0.0.0.0/0`).
5. Click **Confirm**. Wait ~60 seconds for status to show **Active**.

Once `0.0.0.0/0` is added, both your local machine and your live backend (Render / Vercel) can connect to Atlas without SSL/TLS errors.

---

## 🚀 Live Hosting Setup

The website frontend is hosted on **GitHub Pages** (`https://www.sangrillagroup.com`). Because GitHub Pages is a static host, the Express backend must be hosted on a cloud platform (e.g. Render or Vercel).

### Option A: Free Backend on Render (Recommended)
1. Go to [Render.com](https://render.com/) and create a free account.
2. Click **New +** -> **Web Service**.
3. Connect your GitHub repository `sangrillagroup`.
4. Configure the service:
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. In **Environment Variables**, add:
   - `MONGODB_URI`: `mongodb+srv://sangrillagroup_db_user:jHTBPs86IPvK9Vxu@cluster0.087gxna.mongodb.net/?retryWrites=true&w=majority`
   - `MONGODB_DATABASE`: `UserInfo`
   - `MONGODB_COLLECTION`: `ContactDetails`
6. Click **Deploy Web Service**. Render will assign you a live HTTPS URL (e.g., `https://sangrilla-api.onrender.com`).
7. In GitHub repository -> **Settings** -> **Secrets and variables** -> **Actions** -> **Variables**, set:
   - `VITE_API_BASE_URL` = `https://sangrilla-api.onrender.com`

---

## 💻 Local Development

```bash
# 1. Install dependencies
npm install

# 2. Run backend API server (runs on port 5000)
npm run server

# 3. In another terminal, run Vite frontend (runs on port 5173)
npm run dev
```

### Viewing Captured Leads:
Open `http://localhost:5000/api/contacts` in your browser to view all saved leads in real time.
Health check: `http://localhost:5000/health`.

---

## 🏗️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Vanilla CSS + Tailwind
- **Backend**: Express, MongoDB Node Driver
- **Database**: MongoDB Atlas (`UserInfo.ContactDetails`)
- **Hosting**: GitHub Pages (Custom domain `sangrillagroup.com`) + Render (Backend API)
