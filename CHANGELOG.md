
# Changelog

## Version 0.1.0

### Added
- **User Onboarding:** Implemented a multi-step onboarding process for new users, including a welcome message, feature overview, and profile creation form.
- **User Profile Dashboard:** Created a dedicated dashboard to display the user's profile information, including their name, bio, skills, interests, and profile picture, fetched from Firestore.
- **Opportunities Page:** Added a new "main" page to display a filterable list of opportunities like hackathons, events, and conferences using dummy data.
- **Navigation:** Added a button on the user profile dashboard to navigate to the new opportunities page.

### Fixed
- **Login Redirection:** Corrected the login and onboarding flows to ensure users are reliably redirected to the appropriate page after completing an action.
- **Vercel Deployment:** Resolved a build error on Vercel by adding the missing `@opentelemetry/exporter-jaeger` dependency.
- **CORS Issue:** Addressed and documented the fix for the Firebase Storage CORS policy to allow profile picture uploads from the web application.

### Changed
- **Profile Picture Storage:** Refactored the profile creation process to store images as Base64 strings directly in Firestore, removing the dependency on Firebase Storage for this feature.
