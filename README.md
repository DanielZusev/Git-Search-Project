
-----

# GitHub Repository Search & Bookmark Manager

A full-stack technical assessment project demonstrating a secure, performant, and scalable architecture for searching GitHub repositories and managing user sessions.

## Project Overview

This application allows users to authenticate, search for public repositories using the GitHub API, and bookmark items.
It features a **stateless authentication mechanism (JWT)** combined with a **stateful server-side session (In-Memory Cache)** to demonstrate hybrid state management.

## Tech Stack

### Client Side (Angular)

  * **Architecture:** Standalone Components (No NgModules), Lazy Loading.
  * **UI Library:** Angular Material (Components) + Bootstrap 5 (Layout/Grid).
  * **State & Async:** RxJS (Observables, Subjects).
  * **Performance:** `OnPush` Change Detection, `trackBy` optimizations, Native Lazy Loading for images.

### Server Side (.NET Web API)

  * **Auth:** JWT (JSON Web Tokens) with custom middleware integration.
  * **Session Management:** Custom implementation using `IMemoryCache` with Sliding Expiration (simulating Redis-style session storage).
  * **API Integration:** `IHttpClientFactory` for efficient socket management when proxying requests to GitHub.
  * **Architecture:** Dependency Injection, Repository/Service Pattern.

-----

## 🏃‍♂️ How to Run

The project is divided into two separate applications: `client` and `server`.

### 1\. Start the Server (Backend)

Navigate to the server directory:

```bash
cd githubSearch-server
dotnet restore
dotnet run
```

*The server will start on `http://localhost:5000` (check console output).*

### 2\. Start the Client (Frontend)

Open a new terminal and navigate to the client directory:

```bash
cd githubSearch-client
npm install
ng serve -o
```

*The application will open at `http://localhost:4200`.*

-----

## 🧪 Usage Flow

1.  **Login:** Use the default hardcoded credentials.
      * *Username:* `admin`
      * *Password:* `1234`
2.  **Search:** Enter a keyword (e.g., "Angular") and press Enter or Click GO.
3.  **Bookmark:** Click the Bookmark icon.
      * The UI updates instantly (Optimistic).
      * The item is stored in the server's In-Memory cache (tied to your User ID).

-----

## 📂 Project Structure

```text
Project Root
│
├── client (Angular)
│   └── src/app
│       ├── core                 # Core singleton services & models
│       │   ├── interceptors     # JWT & Error handling interceptors
│       │   ├── models           # TypeScript interfaces (DTOs)
│       │   └── services         # Auth & API services
│       │
│       ├── features             # Feature-based architecture
│       │   ├── login            # Login logic & UI
│       │   └── search           # Search logic, results & bookmarking
│       │
│       ├── app.config.ts        # Standalone Application Config (Providers)
│       ├── app.routes.ts        # Main Routing Configuration
│       └── app.ts               # Root Component
│
└── server (githubSearch-server)
    ├── Controllers          # API Endpoints (Auth, Cart, Search)
    ├── Dtos                 # Data Transfer Objects (Strict typing)
    ├── Services             # Business Logic (GitHub Proxy, Session Manager)
    ├── appsettings.json     # Configuration (JWT Secret, API settings)
    └── Program.cs           # DI Container & Middleware Setup