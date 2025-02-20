# JAISLAM25

JAISLAM25 is a modern slam book application that allows users to create a digital slam book experience. Users can authenticate, interact in a community, add friends, and explore their slam book entries.

## 🚀 Features

- **User Authentication** (MongoDB-based email/password authentication)
- **Community Page** (Personalized welcome & greetings)
- **Friends Page** (Displays a list of friends with avatars)
- **Slam Book Page** (View & manage slam book details)
- **Profile Setting Page** (Manage user profile settings, password updates)
- **Settings Page** (Manage user controls, deactivations)

## 🛠 Tech Stack

- **Frontend:** Next.js, React.js, Tailwind CSS
- **Backend:** Node.js (if applicable)
- **Database:** MongoDB
- **UI Components:** Aceternity UI

## 🗂️ File Structure

```
jairajslam/
├── .env.local                       # Environment variables
├── .gitignore                       # Specifies intentionally untracked files that Git should ignore
├── components/                      # Reusable React components
│   ├── layouts/                     # Layout components
│   │   └── sidebarlayout.tsx        # Layout with sidebar
│   └── ui/                          # UI components
│       ├── buttons.tsx              # Button components
│       └── sidebar.tsx              # Sidebar component
├── data/                            # Static data
│   └── friends.json                 # List of friends with details
├── lib/                             # Utility and helper functions
│   └── mongodb.ts                   # MongoDB connection setup
├── models/                          # Data models for MongoDB
│   └── User.tsx                     # User model
├── pages/                           # Next.js pages (routes)
│   ├── api/                         # API endpoints
│   │   ├── auth/                    # Authentication API
│   │   │   ├── login.ts             # Login API endpoint
│   │   │   └── register.ts          # Register API endpoint
│   │   ├── feedback.ts              # Feedback API endpoint
│   │   └── profile.ts               # Profile API endpoint
│   ├── auth/                        # Authentication pages
│   │   ├── login.tsx                # Login page
│   │   └── register.tsx             # Register page
│   ├── community/                   # Community pages
│   │   └── [id].js                  # Dynamic route for community posts
│   ├── community.tsx                # Community main page
│   ├── profile.tsx                  # User profile page
│   ├── settings.tsx                 # Settings page
│   ├── _app.tsx                     # Custom App component
│   └── _document.tsx                # Custom Document component
├── public/                          # Static assets
│   ├── favicon.ico                  # Favicon
│   └── img/                         # Images
│       ├── cover/                   # Cover images
│       ├── female/                  # Female avatar images
│       └── kings/                   # Male avatar images
├── styles/                          # Global styles
│   └── globals.css                  # Global CSS file
├── tailwind.config.js               # Tailwind CSS configuration
├── tsconfig.json                    # TypeScript configuration
└── README.md                        # Project README
```

## 📦 Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/JaiRajGunnu/jairajslam25.git
   ```
2. Navigate to the project folder:
   ```bash
   cd jairajslam25
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
![Screenshot](https://raw.githubusercontent.com/JaiRajGunnu/jairajslam25/refs/heads/main/public/img/ss.png)  
<p align="center" style="font-size: 12px;">A sample screenshot</p>

## 👥 Contributors

- **Jai Raj Gunnu** - [GitHub](https://github.com/JaiRajGunnu)

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

Feel free to update this README with more details as the project evolves! 🚀
