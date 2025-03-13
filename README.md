# JRGNostalgix

**JRGNostalgix** is a modern digital slam book application that allows members to create and manage their slam book entries while interacting with a community. It includes features for user authentication, profile management, community engagement, and more.

## 🚀 Features

- **User Authentication**: MongoDB-based email/password authentication for secure login and registration.
- **Community Page**: A dynamic and personalized page where members can interact with each other.
- **Friends Page**: Displays a list of friends with their avatars and allows members to add them.
- **Slam Book Page**: Members can view, add, and manage their slam book entries.
- **Profile Setting Page**: Manage and update profile settings including password changes.
- **Settings Page**: Customizable settings for user controls, deactivations, and preferences.

## 🔑 Admin Controls

- **Admins List**: View, add, or remove admin members.
- **Members Control Panel**: View all members, grant admin privileges, edit their details, or deactivate accounts.
- **Admins Control Panel**: View all admins, grant or revoke admin privileges, or edit their details.
- **Database Configuration**: Manages database connections, models, and queries for efficient data storage.
- **Feedback Management**: Review user feedback and take necessary actions.
- **System Settings**: Modify platform access settings, update configurations, and manage global controls.


## 🛠 Tech Stack

- **Frontend**: Next.js, React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **UI Components**: Aceternity UI, Radix UI
- **UI/UX Design**: Figma
- **Authentication & Authorization**: JSON Web Tokens (JWT)
- **State Management**: Context API
- **API Handling**: Axios, Fetch API
- **Middleware**: Next.js Middleware
- **Deployment & Hosting**: Vercel
- **Logging & Debugging**: Console Debugging, DevTools
- **Version Control**: Git, GitHub


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

<table>
  <tr>
    <td>
      <img src="https://raw.githubusercontent.com/JaiRajGunnu/JRGNostalgix/refs/heads/main/public/img/screenshots/img01.png" width="400">
      <p align="center" style="font-size: 12px;">A sample screenshot</p>
    </td>
    <td>
      <img src="https://raw.githubusercontent.com/JaiRajGunnu/JRGNostalgix/refs/heads/main/public/img/screenshots/img02.png" width="400">
      <p align="center" style="font-size: 12px;">A sample screenshot</p>
    </td>
  </tr>
  <tr>
    <td>
      <img src="https://raw.githubusercontent.com/JaiRajGunnu/JRGNostalgix/refs/heads/main/public/img/screenshots/img03.png" width="400">
      <p align="center" style="font-size: 12px;">A sample screenshot</p>
    </td>
    <td>
      <img src="https://raw.githubusercontent.com/JaiRajGunnu/JRGNostalgix/refs/heads/main/public/img/screenshots/img04.png" width="400">
      <p align="center" style="font-size: 12px;">A sample screenshot</p>
    </td>
  </tr>
  <tr>
    <td>
      <img src="https://raw.githubusercontent.com/JaiRajGunnu/JRGNostalgix/refs/heads/main/public/img/screenshots/img05.png" width="400">
      <p align="center" style="font-size: 12px;">A sample screenshot</p>
    </td>
    <td>
      <img src="https://raw.githubusercontent.com/JaiRajGunnu/JRGNostalgix/refs/heads/main/public/img/screenshots/img06.png" width="400">
      <p align="center" style="font-size: 12px;">A sample screenshot</p>
    </td>
  </tr>
  <tr>
    <td>
      <img src="https://raw.githubusercontent.com/JaiRajGunnu/JRGNostalgix/refs/heads/main/public/img/screenshots/img07.png" width="400">
      <p align="center" style="font-size: 12px;">A sample screenshot</p>
    </td>
    <td>
      <img src="https://raw.githubusercontent.com/JaiRajGunnu/JRGNostalgix/refs/heads/main/public/img/screenshots/img08.png" width="400">
      <p align="center" style="font-size: 12px;">A sample screenshot</p>
    </td>
  </tr>
  <tr>
    <td>
      <img src="https://raw.githubusercontent.com/JaiRajGunnu/JRGNostalgix/refs/heads/main/public/img/screenshots/img09.png" width="400">
      <p align="center" style="font-size: 12px;">A sample screenshot</p>
    </td>
    <td>
      <img src="https://raw.githubusercontent.com/JaiRajGunnu/JRGNostalgix/refs/heads/main/public/img/screenshots/img10.png" width="400">
      <p align="center" style="font-size: 12px;">A sample screenshot</p>
    </td>
  </tr>
    <tr>
    <td>
      <img src="https://raw.githubusercontent.com/JaiRajGunnu/JRGNostalgix/refs/heads/main/public/img/screenshots/img11.png" width="400">
      <p align="center" style="font-size: 12px;">A sample screenshot</p>
    </td>
    <td>
    </td>
  </tr>
</table>

## 👥 Contributors

- **Jai Raj Gunnu** - [GitHub](https://github.com/JaiRajGunnu)

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

Feel free to update this README with more details as the project evolves! 🚀
