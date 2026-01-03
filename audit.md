# Project Audit Report

## 2. Architecture & Code Structure 🏗️

*   **Monolithic Backend (`server.js`):**
    *   All application logic—database connection, schema definitions, and API routes—is crammed into a single `server.js` file.
    *   **Recommendation:** Refactor into a standard MVC structure:
        *   `/models` (Mongoose schemas)
        *   `/controllers` (Route logic)
        *   `/routes` (API endpoint definitions)
        *   `/config` (DB and App configuration)
*   **Frontend File Organization:**
    *   All components are flatly listed in `src/components/`. As the app grows, this will become unmanageable.
    *   **Recommendation:** Group by feature (e.g., `src/features/auth/`, `src/features/complaints/`) or type (`src/pages/`, `src/components/common/`).

## 3. Code Quality & Best Practices 🧹

*   **Naming Conventions:**
    *   Inconsistent file naming in `src/components/`. Some are PascalCase (`Signup.js`), others are lowercase (`login.js`, `admin.js`). React components should strictly follow **PascalCase** (e.g., `Login.js`, `Admin.js`).
    *   Variable naming in `server.js` is inconsistent (e.g., `Registermodel` vs `finduser`).
*   **Hardcoded URLs:**
    *   Frontend components (`login.js`, `Signup.js`, etc.) have hardcoded API URLs (`http://localhost:9000`). This will break in production.
    *   **Recommendation:** Use an environment variable (e.g., `process.env.REACT_APP_API_URL`) and a centralized API service helper.
*   **Error Handling (Backend):**
    *   The API returns custom status codes in the JSON body (e.g., `{ statuscode: 1 }`, `{ statuscode: 2 }`) instead of standard HTTP status codes (200, 400, 401, 500).
    *   Magic numbers (`1`, `2`) are used without context.
*   **Error Handling (Frontend):**
    *   Heavy reliance on `alert()` for user feedback. This is poor UX. Use toast notifications or inline error messages.
*   **Form Validation:**
    *   `Signup.js` captures a "Confirm Password" field (`cpass`) but **does not validate** that it matches `pass` before submitting the form.
*   **Redux/State Management:**
    *   In `src/reducer/userslice.js`, the `login` reducer sets state properties but the payload structure passed from components seems slightly inconsistent or potentially confusing (`action.payload.name` vs `action.payload` being the whole object).

## 4. Dependencies & Configuration 📦

*   **React Router:** Project uses `react-router-dom` `^7.9.6` (based on package.json), but imports suggest usage patterns from v6. Ensure compatibility.
*   **Environment Variables:**
    *   `src/.env` is located in `src/` but `dotenv` in `server.js` usually looks in the root. The backend might not be loading these variables correctly as currently configured.

## 6. JWT Security & Token Expiry 🔐

*   **Token Expiration Issue:**
    *   The backend currently issues tokens with `expiresIn: "1h"`, but the application lacks a mechanism to **verify** these tokens on subsequent requests.
    *   **The Problem:** Even if a token "expires" mathematically (the `exp` claim in the payload is in the past), it only matters if the backend actually checks that claim using `jwt.verify()`. Currently, the backend only checks if the user is in the database or if the password matches during login, but it doesn't protect other routes (like `/api/allcomp` or `/api/complaint`) with a JWT verification middleware.
    *   **Frontend Issue:** The frontend stores the token in `localStorage` but never checks if it has expired before allowing access to protected views.

### Recommended Solution: Implementation of Auth Middleware

**1. Backend Implementation (server.js):**
Create a middleware function to protect your routes.

```javascript
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']; // Or however you send the token
    if (!token) return res.status(403).send({ statuscode: 0, message: "No token provided" });

    jwt.verify(token, key, (err, decoded) => {
        if (err) {
            // This is where the 1h expiration is actually enforced
            return res.status(401).send({ statuscode: 3, message: "Token expired or invalid" });
        }
        req.userId = decoded.data;
        req.userRole = decoded.role;
        next();
    });
};

// Use it on protected routes:
app.get("/api/allcomp", verifyToken, async (req, res) => { ... });
```

**2. Frontend Implementation (App.js/Redux):**
When the app loads or before sensitive actions, check the `exp` claim of the token.

```javascript
// In App.js useEffect or a dedicated Auth wrapper
const token = localStorage.getItem("token");
if (token) {
    const decoded = JSON.parse(atob(token.split('.')[1]));
    if (decoded.exp * 1000 < Date.now()) {
        // Token has expired
        localStorage.removeItem("token");
        dispatch(Logout());
        navigate("/login");
    }
}
```

## Action Plan

1.  **Immediate:** Add `.env` to `.gitignore`. Move secrets to `.env` and remove them from code. (Completed)
2.  **Security:** Fix vulnerabilities including Hardcoded Secrets, Database Connection strings, CORS, Input Validation, Security Headers, and Rate Limiting. (Completed)
3.  **JWT Fix:** Implement `verifyToken` middleware on the backend and apply it to all admin/worker routes. Add expiration checks on the frontend.
4.  **Refactor:** Split `server.js` into routes/controllers/models.
5.  **Fix:** update frontend to use environment variables for API URL.
6.  **UX:** Replace `alert()` with a better notification system.
