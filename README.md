# JRGNostalgix

**JRGNostalgix** is a modern digital slam book application that allows users to create and manage their slam book entries while interacting with a community. It includes features for user authentication, profile management, community engagement, and more.

## 🚀 Features

- **User Authentication**: MongoDB-based email/password authentication for secure login and registration.
- **Community Page**: A dynamic and personalized page where users can interact with each other.
- **Friends Page**: Displays a list of friends with their avatars and allows users to add them.
- **Slam Book Page**: Users can view, add, and manage their slam book entries.
- **Profile Setting Page**: Manage and update profile settings including password changes.
- **Settings Page**: Customizable settings for user controls, deactivations, and preferences.

## 🛠 Tech Stack

- **Frontend**: Next.js, React.js, Tailwind CSS
- **Backend**: Node.js (if applicable)
- **Database**: MongoDB
- **UI Components**: Aceternity UI



## 🗂️ File Structure

```
JRGNostalgix/
├─ .next/                              # Next.js build output
│  ├─ server/                          # Server-side pages
│  ├─ static/                          # Static assets
│  ├─ vendor-chunks/                   # Chunked vendor libraries
├─ .vscode/                            # VSCode configuration
├─ components/                         # Reusable React components
│  ├─ layouts/                         # Layout components
│  ├─ ui/                              # UI components
│  ├─ BatchActionModel.tsx             # Modal component
│  ├─ TodoList.tsx                     # Todo list component
│  ├─ tooltip.tsx                      # Tooltip component
│  └─ WeatherCard.tsx                  # Weather card component
├─ data/                               # Static data
│  └─ friends.json                     # List of friends with details
├─ feedback/                           # Feedback-related pages and components
├─ guard/                              # Authentication guards and helpers
├─ lib/                                # Utility and helper functions
│  └─ mongodb.ts                       # MongoDB connection setup
├─ models/                             # Data models for MongoDB
│  ├─ feedback.ts                      # Feedback model
│  ├─ Todo.ts                          # Todo model
│  ├─ User.ts                          # User model
├─ pages/                               # Next.js pages
│  ├─ admin/                           # Admin panel pages
│  ├─ api/                             # API routes
│  ├─ auth/                            # Authentication pages
│  ├─ community/                       # Community pages
│  ├─ Home/                            # Home page
│  ├─ feedback.tsx                     # Feedback page
│  ├─ profile.tsx                      # User profile page
│  ├─ settings.tsx                     # Settings page
│  └─ _app.tsx                         # Custom App component
├─ public/                             # Static assets (images, icons)
│  ├─ img/                             # Images folder
│  ├─ favicon.ico                      # Favicon
│  ├─ next.svg                         # Next.js logo
│  └─ jairajgunnu.jpg                  # User profile image
├─ styles/                             # Global styles
│  └─ globals.css                      # Global CSS file
├─ .env.local                          # Environment variables
├─ .gitignore                          # Git ignore file
├─ LICENSE                             # Project license
├─ next-env.d.ts                       # TypeScript environment file
├─ next.config.ts                      # Next.js configuration
├─ package-lock.json                   # NPM package lock file
├─ package.json                        # NPM package details
├─ README.md                           # Project README
├─ tailwind.config.js                  # Tailwind CSS configuration
└─ tsconfig.json                       # TypeScript configuration
```

## 📦 Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/JaiRajGunnu/JRGNostalgix.git
   ```
2. Navigate to the project folder:
   ```bash
   cd JRGNostalgix
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables:
   - Create a `.env.local` file and add your MongoDB connection string & other necessary keys.
5. Run the development server:
   ```bash
   npm run dev
   ```
6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📸 Screenshots  
![Screenshot](https://raw.githubusercontent.com/JaiRajGunnu/JRGNostalgix/refs/heads/main/public/img/ss.png)  
<p align="center" style="font-size: 12px;">A sample screenshot</p>

## 👥 Contributors

- **Jai Raj Gunnu** - [GitHub](https://github.com/JaiRajGunnu)

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

Feel free to update this README with more details as the project evolves! 🚀
