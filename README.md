```markdown
# 🕰️ SeekPast — AI Chatbot for Historical Analysis

**SeekPast** is an AI-powered chatbot designed to provide insightful historical analysis and context using advanced natural language processing. Whether you're a student, researcher, or history enthusiast, SeekPast helps you explore the past through interactive conversation.

🔗 Live Demo: [seek-past.vercel.app](https://seek-past.vercel.app)

---

## 🧠 Features

- Conversational AI chatbot for historical Q&A
- Integrates with external APIs for dynamic historical data
- Clean, responsive UI with Tailwind CSS
- Built using modern frontend tooling (Vite + TypeScript)

---

## 🧰 Tech Stack

- **Frontend:** React, TypeScript, Vite
- **Styling:** Tailwind CSS
- **Backend/API:** Node.js (API integration for historical data)
- **Deployment:** Vercel
- **Environment Configuration:** `.env`

---

## 📁 Project Structure

```

.
├── public/                # Static assets
├── server/                # API routes or backend logic
├── src/                   # Frontend source code
│   ├── components/        # Reusable React components
│   └── pages/             # App pages/views
├── .env                   # Environment variables (not committed)
├── .env.example           # Template for environment setup
├── package.json           # Project metadata & scripts
├── tailwind.config.js     # Tailwind configuration
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript configuration
├── index.html             # Main HTML file

````

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/HeyitsSup03/seekpast.git
cd seekpast
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Create `.env` File

Copy `.env.example` to `.env` and add your API keys or environment variables.

```bash
cp .env.example .env
```

> ⚠️ Do **not** commit your `.env` file.

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view in browser.

---

## 🧪 Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Run local dev server     |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |

---

## 🌐 Deployment

**Deployed on Vercel**

* 🔄 [seek-past.vercel.app](https://seek-past.vercel.app)
* Total Deployments: 5 (as of last month)

---

## 🔐 Environment Variables

Make sure to configure the following in your `.env` file:

```env
API_KEY=your_api_key_here
API_ENDPOINT=https://your-api-endpoint.com
```

Use `.env.example` as a template.

---

## 📌 TODO

* [ ] Add context-aware follow-up question handling
* [ ] Improve historical source citations
* [ ] Add voice interaction support
* [ ] Build user authentication & saved chats

---

## 📄 License

MIT License — [HeyitsSup03](https://github.com/HeyitsSup03)

---

## 🧑‍💻 Author

Made with ⚙️ and 💡 by **HeyitsSup03**

Feel free to fork, contribute, and enhance SeekPast for your own historical adventures.

```

---


