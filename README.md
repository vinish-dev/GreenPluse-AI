# 🌱 GreenPulse AI

> **A community-driven urban greening platform powered by AI — bridging citizens, experts, and government to combat urban heat islands and green cover loss.**

---

## 📌 Description

GreenPulse is an AI-powered civic platform designed to combat rising **urban heat islands** and the rapid **loss of green cover** caused by urbanization.

It empowers citizens to geo-tag and report unused spaces, tree loss, and heat-prone areas with photo evidence. AI-driven analysis (Gemini + Cloud Vision) validates reports, scores feasibility, and helps experts and government bodies **prioritize, approve, and implement** impactful greening initiatives — all on one platform.

The platform bridges the gap between **citizens, environmental experts, and government authorities**, ensuring data-backed, collaborative, and scalable urban sustainability solutions.

---

## 🚀 Features

### Core Features

|  #  | Feature                    | Description                                                                              |
|:---:|:---------------------------|:-----------------------------------------------------------------------------------------|
|  1  | **Geo-Tagged Reporting**   | Citizens submit location-pinned reports of unused spaces, tree loss, and heat zones      |
|  2  | **AI Image Analysis**      | Gemini API validates photos and scores greening feasibility automatically                |
|  3  | **Spam Prevention**        | AI auto-rejects irrelevant images (indoor, selfies, screenshots) before entering system  |
|  4  | **Community Voting**       | Users upvote proposals to democratically prioritize high-impact greening ideas           |
|  5  | **Expert Feedback**        | Environmental experts review and annotate reports before government approval             |
|  6  | **Authority Dashboard**    | Government bodies get a structured workflow to review, approve, and assign projects      |
|  7  | **Live Impact Map**        | Google Maps-powered heat map showing reported zones and green cover in real time         |
|  8  | **Progress Tracking**      | Monitor status of every report — submitted → approved → in progress → resolved           |
|  9  | **Role-Based Access**      | Separate views and permissions for Citizens, Experts, and Authorities                    |
| 10  | **Real-Time Dashboard**    | Live stats on reports submitted, issues resolved, and green cover growth                 |
| 11  | **Leaderboard**            | Gamified ranking to incentivize citizen participation                                    |
| 12  | **Collaboration Hub**      | Cross-role space for experts and authorities to co-plan greening projects                |
| 13  | **Urban Forestry Guide**   | Built-in resource on native species and planting best practices                          |
| 14  | **Multi-language Support** | Language switcher (EN / ES / HI) for wider accessibility                                 |

---

## 🛠 Tech Stack

| Layer              | Technology                                          |
|:-------------------|:----------------------------------------------------|
| **Frontend**       | React.js, Vite, Tailwind CSS, Framer Motion         |
| **Backend**        | Firebase Cloud Functions (Node.js)                  |
| **Database**       | Firebase Firestore (real-time)                      |
| **Authentication** | Firebase Authentication (role-based JWT)            |
| **Storage**        | Firebase Cloud Storage                              |
| **Maps & Geo**     | Google Maps Platform                                |
| **AI Analysis**    | Google Gemini API, Google Cloud Vision API          |
| **Hosting**        | Firebase Hosting                                    |
| **Infrastructure** | Google Cloud Platform                               |

---

## ☁️ Google Technologies Used

> ⚠️ Using Google products is mandatory for this hackathon

- **Firebase Authentication**             – Secure role-based login for citizens, experts, and authorities
- **Firebase Firestore**                  – Real-time storage for geo-tagged reports, votes, and feedback
- **Firebase Hosting**                    – Hosting the web application globally
- **Firebase Cloud Functions**            – Serverless backend logic and API layer
- **Google Maps Platform**                – Location tagging, heat-zone visualization, and mapping unused spaces
- **Google Cloud Vision API**             – Analyzes uploaded images to identify land type and vegetation loss
- **Google Gemini API**                   – AI-powered feasibility analysis, idea prioritization, and summarization
- **Google Cloud Platform & Cloud Storage** – Scalable infrastructure and secure data storage

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────┐
│              React Frontend (Vite)              │
│   Home · Report · Dashboard · Map · Leaderboard │
└───────────────────┬─────────────────────────────┘
                    │ HTTP / Firestore SDK
┌───────────────────▼─────────────────────────────┐
│           Firebase Cloud Functions              │
│        (API Layer — Node.js backend)            │
└──────┬──────────────┬──────────────┬────────────┘
       │              │              │
┌──────▼──────┐ ┌─────▼──────┐ ┌───▼────────────┐
│  Firestore  │ │  Gemini AI │ │ Cloud Vision   │
│  (Real-time │ │ (Analysis  │ │ (Image Object  │
│   Database) │ │  + Scoring)│ │  Detection)    │
└─────────────┘ └────────────┘ └────────────────┘
       │
┌──────▼──────────────┐
│   Google Maps API   │
│  (Geo + Heat Map)   │
└─────────────────────┘
```

### Report Lifecycle

```
Citizen Submits Report
        ↓
Cloud Function triggered
        ↓
Gemini AI validates image → Irrelevant? → Rejected ✗
        ↓ (Valid)
Report stored in Firestore with AI score
        ↓
Expert adds feedback & recommendation
        ↓
Authority reviews → Approves / Rejects
        ↓
Real-time status update pushed to Citizen ✅
```

### Role-Permission Matrix

| Feature               | 🧑 Citizen | 🔬 Expert | 🏛️ Authority |
|:----------------------|:----------:|:---------:|:------------:|
| Submit Report         |     ✅     |     ✅    |      ✅      |
| Vote on Proposals     |     ✅     |     ✅    |      —       |
| Add Expert Feedback   |     —      |     ✅     |      —       |
| Review Reports        |     —      |     ✅     |      ✅     |
| Approve / Reject      |     —      |     —      |      ✅      |
| View Dashboard        |     ✅     |     ✅    |      ✅      |
| View Leaderboard      |     ✅     |     ✅    |      ✅      |

---

## ⚙️ Setup Instructions

### Prerequisites

- Node.js (v18+ recommended; Cloud Functions require v24)
- Firebase CLI — `npm install -g firebase-tools`
- Google Maps API key
- Firebase project setup
- Gemini API key (from [Google AI Studio](https://aistudio.google.com/app/apikey))

### Steps to Run Locally

```bash
# 1. Clone the repository
git clone <your-repository-url>

# 2. Install & run Frontend
cd frontend
npm install
npm run dev          # Runs at http://localhost:5173

# 3. Install & run Cloud Functions (backend)
cd ../functions
npm install
firebase emulators:start
```

### Environment Variables

Create `frontend/.env` from the example:

```bash
cp frontend/.env.example frontend/.env
```

Fill in your keys:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_API_BASE_URL=https://us-central1-your_project_id.cloudfunctions.net
```

---

## 🔮 Future Roadmap

| Priority      | Feature                                                           |
|:--------------|:------------------------------------------------------------------|
| 🔴 High       | **Native Mobile App** (Android/iOS, offline-first)               |
| 🔴 High       | **Satellite Image Analysis** via Google Earth Engine             |
| 🟡 Medium     | **Carbon Credit Tracking** per approved project                  |
| 🟡 Medium     | **Predictive Heat Mapping** using ML models                      |
| 🟡 Medium     | **AI Project Planner** — auto-generates planting plans           |
| 🟢 Low        | **Open Data API** for researchers and city planners              |
| 🟢 Low        | **Blockchain Audit Trail** for transparent approvals             |
| 🟢 Low        | **IoT Sensor Integration** for real-time AQI/temperature alerts  |

---

## 🌍 Impact & Feasibility

- ♻️ Reduces urban heat by targeting high-impact greening zones
- 🗺️ Improves city planning through real-time citizen insights
- 🤝 Encourages community ownership and participation
- ⚡ Enables faster, data-backed government decisions
- 📈 Scalable from streets → cities → regions

---

## 👥 Team — NULL POINTER BROS

👥 Team Members – NULL POINTER BROS

Muhammed Musthafa
muhammedmusthaf02@gmail.com

Veol Steve Jose
24h55.veol@sjec.ac.in

Siddalingesh
sidduwa33121@gmail.com

Vinish 
24h59.vinish@sjec.ac.in

