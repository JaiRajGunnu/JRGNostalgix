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

<table style="border-collapse: collapse; margin: 0 auto;">
  <tr>
    <td style="padding: 10px; text-align: center;">
      <img src="https://raw.githubusercontent.com/JaiRajGunnu/JRGNostalgix/refs/heads/main/public/img/screenshots/imgs01.png" style="display: block; margin: 0 auto;">
      <p style="font-size: 8px; text-align: center;">Pilot page</p>
    </td>
    <td style="padding: 10px; text-align: center;">
      <img src="https://raw.githubusercontent.com/JaiRajGunnu/JRGNostalgix/refs/heads/main/public/img/screenshots/imgs02.png" style="display: block; margin: 0 auto;">
      <p style="font-size: 8px; text-align: center;">Registration page</p>
    </td>
  </tr>
  <tr>
    <td style="padding: 10px; text-align: center;">
      <img src="https://raw.githubusercontent.com/JaiRajGunnu/JRGNostalgix/refs/heads/main/public/img/screenshots/imgs03.png" style="display: block; margin: 0 auto;">
      <p style="font-size: 8px; text-align: center;">Home page</p>
    </td>
    <td style="padding: 10px; text-align: center;">
      <img src="https://raw.githubusercontent.com/JaiRajGunnu/JRGNostalgix/refs/heads/main/public/img/screenshots/imgs04.png" style="display: block; margin: 0 auto;">
      <p style="font-size: 8px; text-align: center;">Community page</p>
    </td>
  </tr>
  <tr>
    <td style="padding: 10px; text-align: center;">
      <img src="https://raw.githubusercontent.com/JaiRajGunnu/JRGNostalgix/refs/heads/main/public/img/screenshots/imgs05.png" style="display: block; margin: 0 auto;">
      <p style="font-size: 8px; text-align: center;">My Verso page</p>
    </td>
    <td style="padding: 10px; text-align: center;">
      <img src="https://raw.githubusercontent.com/JaiRajGunnu/JRGNostalgix/refs/heads/main/public/img/screenshots/imgs06.png" style="display: block; margin: 0 auto;">
      <p style="font-size: 8px; text-align: center;">Profile Settings page</p>
    </td>
  </tr>
  <tr>
    <td style="padding: 10px; text-align: center;">
      <img src="https://raw.githubusercontent.com/JaiRajGunnu/JRGNostalgix/refs/heads/main/public/img/screenshots/imgs07.png" style="display: block; margin: 0 auto;">
      <p style="font-size: 8px; text-align: center;">Feedback page</p>
    </td>
    <td style="padding: 10px; text-align: center;">
      <img src="https://raw.githubusercontent.com/JaiRajGunnu/JRGNostalgix/refs/heads/main/public/img/screenshots/imgs08.png" style="display: block; margin: 0 auto;">
      <p style="font-size: 8px; text-align: center;">Settings page</p>
    </td>
  </tr>
  <tr>
    <td style="padding: 10px; text-align: center;">
      <img src="https://raw.githubusercontent.com/JaiRajGunnu/JRGNostalgix/refs/heads/main/public/img/screenshots/imgs09.png" style="display: block; margin: 0 auto;">
      <p style="font-size: 8px; text-align: center;">Dashboard of Admin Panel</p>
    </td>
    <td style="padding: 10px; text-align: center;">
      <img src="https://raw.githubusercontent.com/JaiRajGunnu/JRGNostalgix/refs/heads/main/public/img/screenshots/imgs10.png" style="display: block; margin: 0 auto;">
      <p style="font-size: 8px; text-align: center;">Member's Control Panel</p>
    </td>
  </tr>
  <tr>
    <td style="padding: 10px; text-align: center;">
      <img src="https://raw.githubusercontent.com/JaiRajGunnu/JRGNostalgix/refs/heads/main/public/img/screenshots/imgs11.png" style="display: block; margin: 0 auto;">
      <p style="font-size: 8px; text-align: center;">Member's Control Panel (Advanced)</p>
    </td>
    <td style="padding: 10px; text-align: center;">
      <img src="https://raw.githubusercontent.com/JaiRajGunnu/JRGNostalgix/refs/heads/main/public/img/screenshots/imgs12.png" style="display: block; margin: 0 auto;">
      <p style="font-size: 8px; text-align: center;">Admin's Control Panel</p>
    </td>
  </tr>
  <tr>
    <td style="padding: 10px; text-align: center;">
      <img src="https://raw.githubusercontent.com/JaiRajGunnu/JRGNostalgix/refs/heads/main/public/img/screenshots/imgs13.png" style="display: block; margin: 0 auto;">
      <p style="font-size: 8px; text-align: center;">Admin Settings</p>
    </td>
    <td style="padding: 10px; text-align: center;">
      <img src="https://raw.githubusercontent.com/JaiRajGunnu/JRGNostalgix/refs/heads/main/public/img/screenshots/imgs14.png" style="display: block; margin: 0 auto;">
      <p style="font-size: 8px; text-align: center;">Restricted page</p>
    </td>
  </tr>
</table>

## 👥 Contributors

- **Jai Raj Gunnu** - [GitHub](https://github.com/JaiRajGunnu)

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

Feel free to update this README with more details as the project evolves! 🚀
