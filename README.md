

# ⚡ Sudarshan's Portfolio

A high-performance personal portfolio website built with **Next.js 16** and **TypeScript**. 
This project features a custom-built, serverless analytics system ("Silent Logger") that tracks visitor traffic in real-time without using heavy third-party cookies.

![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)
![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Redis](https://img.shields.io/badge/Upstash-Redis-red?style=for-the-badge&logo=redis)

## 🚀 Features

* **Modern UI:** Styled with Tailwind CSS for a responsive, dark-mode aesthetic.
* **Silent Analytics:** A custom Middleware intercepts requests to log visitor details (IP, Location, Device) directly to Redis.
* **Real-time Dashboard:** A hidden `/logs` route to view live visitor traffic.
* **Type Safety:** Built entirely in TypeScript for robust code.
* **Edge Performance:** Deployed on Vercel's Edge Network.

## 🛠️ Tech Stack

* **Framework:** [Next.js 16 (Turbopack)](https://nextjs.org/)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Database:** [Upstash Redis](https://upstash.com/) (Serverless)
* **Deployment:** [Vercel](https://vercel.com/)

## 🕵️‍♂️ The "Silent Logger"

Instead of using Google Analytics, I built a custom tracking engine.

1.  **Middleware:** Captures headers (`x-forwarded-for`, `x-vercel-ip-city`) on every request.
2.  **Storage:** Pushes data to a Redis List (`lpush`).
3.  **Viewer:** The `/logs` page fetches data from Redis and displays it in a terminal-style interface.

