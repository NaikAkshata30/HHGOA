# FrameInGoa — Hacker House Goa 2026 Builder Identity

FrameInGoa is a web-based identity builder created for Hacker House Goa 2026. It allows builders to upload a profile photo, generate a branded profile frame and Builder ID card, and export the generated designs as high-quality PNG images.

The application is designed as a local-first experience. Images are processed directly in the browser and are not uploaded to a backend server. Users can generate their identity assets without creating an account or providing personal information to a server.

## Features

### Profile Frame

* Generates a 1080 × 1080 profile frame.
* Supports a custom uploaded profile photo.
* Includes a glass-style caption bar.
* Uses branded corner brackets and decorative elements.
* Includes palm-leaf decorations and a grain overlay.
* Maintains the visual style of the Hacker House Goa 2026 identity.

### Builder ID Card

* Generates a personalized Builder ID card.
* Assigns a randomized Builder number.
* Selects a Builder title from the available Hacker House Goa builder title list.
* Allows users to regenerate the number and title until they find a combination they prefer.
* Generates the card as a downloadable image.

### Image Export

* Export the profile frame independently.
* Export the Builder ID card independently.
* Export both assets together.
* Uses 2× supersampling during export to produce sharper PNG images.
* Image processing happens entirely inside the browser.

### Share to X

* Generates a pre-filled post for X.
* Includes a link back to the deployed application.
* Uses the configured public application URL when available.
* The sharing functionality can be configured using environment variables.

### Local-First Architecture

* No user login or signup is required.
* No image upload to a server is required.
* User images remain within the browser during processing.
* No dedicated backend is required for the image-generation workflow.

### Accessibility and User Experience

* Responsive interface for different screen sizes.
* Keyboard focus states.
* Reduced-motion support.
* Toast notifications for user feedback.
* Error boundary for handling unexpected application errors.
* Drag-and-drop image uploading.
* Lazy loading of the image-export library to reduce the initial application bundle.

---

# Tech Stack

| Technology         | Purpose                                                |
| ------------------ | ------------------------------------------------------ |
| React 19           | Building the user interface and application components |
| Vite 8             | Development server and production build system         |
| Tailwind CSS 4     | Styling and responsive layouts                         |
| React Router DOM 7 | Client-side routing                                    |
| Framer Motion 13   | UI animations and transitions                          |
| React Dropzone     | Drag-and-drop image uploading                          |
| html2canvas        | Converting rendered UI into downloadable images        |
| Lucide React       | Interface icons                                        |
| JavaScript         | Application logic                                      |

---

# Application Architecture

The application follows a component-based React architecture.

```text
User
 │
 ├── Uploads profile photo
 │
 ▼
Photo Upload Component
 │
 ▼
Image Processing
 │
 ▼
Generator
 │
 ├── Profile Frame
 │    ├── Photo
 │    ├── Caption
 │    ├── Decorations
 │    └── Grain Overlay
 │
 └── Builder ID Card
      ├── Builder Number
      ├── Builder Title
      └── QR Code
 │
 ▼
Preview
 │
 ▼
Export Utilities
 │
 ▼
PNG Download
```

The application does not require a traditional backend because the primary processing happens on the client.

---

# Project Structure

```text
FrameInGoa/
│
├── public/
│
├── src/
│   │
│   ├── components/
│   │   │
│   │   ├── builderCard/
│   │   │   └── Builder ID card components
│   │   │
│   │   ├── frame/
│   │   │   └── Profile frame components
│   │   │
│   │   ├── common/
│   │   │   └── Reusable UI components
│   │   │
│   │   ├── layout/
│   │   │   └── Application layout components
│   │   │
│   │   ├── toast/
│   │   │   └── Toast notification system
│   │   │
│   │   └── upload/
│   │       └── Photo upload and preview components
│   │
│   ├── pages/
│   │   ├── Home
│   │   ├── Generator
│   │   └── NotFound
│   │
│   ├── hooks/
│   │   ├── useCanvasScale
│   │   └── useImageUpload
│   │
│   ├── utils/
│   │   ├── export
│   │   ├── image
│   │   └── share
│   │
│   └── data/
│       └── Builder title data
│
├── .env.example
├── index.html
├── package.json
├── vercel.json
└── README.md
```

---

# Getting Started

## Prerequisites

Make sure the following are installed:

* Node.js 20.19 or newer
* npm
* Git

Node.js 22.12 or newer can also be used.

You can verify your installed versions with:

```bash
node -v
npm -v
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/NaikAkshata30/HHGOA.git
```

Move into the project directory:

```bash
cd HHGOA
```

Install the dependencies:

```bash
npm install
```

---

# Running the Development Server

Start the Vite development server:

```bash
npm run dev
```

Vite will display a local URL in the terminal, normally:

```text
http://localhost:5173
```

Open that URL in your browser.

---

# Production Build

To create an optimized production build:

```bash
npm run build
```

The generated files will be placed inside:

```text
dist/
```

To preview the production build locally:

```bash
npm run preview
```

---

# Environment Variables

The application supports optional environment variables for the public application URL.

Create a `.env.local` file in the project root:

```env
VITE_SITE_URL=https://your-domain.com
VITE_APP_URL=https://your-domain.com
```

### VITE_SITE_URL

`VITE_SITE_URL` is the preferred public URL of the deployed application.

It is used for:

* Builder ID QR codes
* Shared application links
* Public references to the application

For example:

```env
VITE_SITE_URL=https://frameingoa.vercel.app
```

### VITE_APP_URL

`VITE_APP_URL` is supported as a compatibility option for the share functionality.

```env
VITE_APP_URL=https://frameingoa.vercel.app
```

For a new deployment, `VITE_SITE_URL` should be preferred.

### Why the public URL matters

If no public URL is configured, the application can fall back to the current browser origin.

This works correctly on a deployed website:

```text
https://your-domain.com
```

However, during local development it may generate:

```text
http://localhost:5173
```

A QR code containing `localhost` cannot normally be opened from another device.

Therefore, when generating Builder IDs intended to be scanned from a phone, configure the deployed application URL.

---

# Deployment

FrameInGoa is a static single-page application and can be deployed using Vercel or another static hosting provider.

## Vercel Deployment

1. Push the project to GitHub.
2. Open Vercel.
3. Import the repository.
4. Vercel detects the Vite configuration.
5. Use the following build settings if they are not detected automatically:

```text
Build Command: npm run build
Output Directory: dist
```

6. Add the required environment variables.
7. Deploy the application.

The repository includes:

```text
vercel.json
```

This configuration handles SPA routing by rewriting application routes to `index.html`.

This is important for routes such as:

```text
/generator
```

because refreshing that route directly should still load the React application.

---

# Manual Vercel Deployment

After installing the Vercel CLI:

```bash
npm run build
```

Then deploy:

```bash
vercel --prod
```

---

# Image Generation and Export

The application renders the Builder ID and profile frame inside the browser.

When the user chooses to download an image, the application uses `html2canvas` to capture the rendered interface and convert it into a canvas.

The general process is:

```text
Rendered React Component
        |
        v
DOM Element
        |
        v
html2canvas
        |
        v
Canvas
        |
        v
PNG
        |
        v
Browser Download
```

The export process uses supersampling to create a higher-resolution output and improve the quality of the final PNG.

`html2canvas` is also lazy-loaded so that the export library does not unnecessarily increase the initial application load.

---

# Image Processing

Profile images are processed within the browser.

The application can perform operations such as:

* Loading the uploaded image
* Creating image previews
* Scaling the image
* Positioning the image inside the frame
* Preparing the image for export

The user's image does not need to be uploaded to a server.

This approach reduces backend requirements and keeps the image-processing workflow client-side.

---

# Builder Titles and Numbers

Builder titles are maintained in the application's data layer.

The generator can select a title from the available list and associate it with a generated Builder number.

The user can regenerate the combination if they want a different identity.

This keeps the title data separate from the UI components and makes the list easier to maintain.

---

# Routing

The application uses `react-router-dom` for client-side navigation.

The main routes include:

```text
/
```

Home page.

```text
/generator
```

Builder generation interface.

Unknown routes are handled using the NotFound page.

Because the application is a single-page application, the hosting platform must redirect unknown application routes to `index.html`.

---

# Accessibility

The interface includes several accessibility-focused features:

* Keyboard focus states
* Support for reduced motion
* Accessible interactive elements
* User feedback through toast notifications
* Error boundary for unexpected application failures

Reduced-motion support is particularly useful for users who prefer limited animations.

---

# Error Handling

The application includes an error boundary to prevent an unexpected React rendering error from completely breaking the user experience.

The general concept is:

```text
React Component
      |
      v
Runtime Error
      |
      v
Error Boundary
      |
      v
Fallback UI
```

This provides a controlled failure state instead of leaving the user with a broken interface.

---

# Performance Considerations

Several implementation choices help improve performance:

### Lazy Loading

`html2canvas` is loaded only when required for image export rather than being loaded immediately when the application starts.

### Client-Side Processing

Images do not need to travel to a backend server, reducing network overhead.

### Static Deployment

The application can be deployed as a static site because it does not require a dedicated application server for its primary functionality.

### Hashed Assets

Vite generates optimized production assets that can be cached by browsers and CDNs.

---

# Security and Privacy

FrameInGoa does not require user accounts or a database for the core identity-generation workflow.

Uploaded images are processed locally in the browser rather than being sent to a remote image-processing server.

Environment variables beginning with `VITE_` are exposed to the frontend at build time. Therefore, they should contain only public configuration values such as URLs.

Private API keys, passwords, tokens, or other secrets should never be placed in `VITE_` variables.

---

# Social Sharing

The application can generate a pre-filled X post containing a link to the application.

The general flow is:

```text
User clicks Share
        |
        v
Share utility
        |
        v
Generate X intent URL
        |
        v
Open X
        |
        v
Pre-filled post
```

The application URL can be included using `VITE_SITE_URL`.

The image itself is generated locally and downloaded by the user. Browser-based X intents do not provide a general mechanism for silently uploading a locally generated image directly into the post composer.

---

# Browser Support

The application relies on modern browser APIs and current versions of React and Vite.

For the best experience, use a current version of:

* Google Chrome
* Microsoft Edge
* Mozilla Firefox
* Safari

---

# Development Guidelines

When modifying the project:

1. Keep reusable UI components inside `components/`.
2. Keep page-level components inside `pages/`.
3. Keep reusable React hooks inside `hooks/`.
4. Keep non-UI helper functions inside `utils/`.
5. Keep static builder data inside `data/`.
6. Avoid placing large amounts of business logic directly inside UI components.
7. Keep environment-specific configuration inside environment variables.
8. Do not commit `.env.local` or sensitive credentials.
9. Test both the browser preview and downloaded PNG after changing export-related code.
10. Test the application on both desktop and mobile layouts.

---

# Future Improvements

Potential improvements include:

* Add automated tests for the image-generation and export utilities.
* Add stronger validation for uploaded images.
* Add image compression before processing very large files.
* Add more Builder ID templates.
* Add additional customization options for titles and captions.
* Improve social preview metadata.
* Add automated accessibility testing.
* Add end-to-end tests for the complete generation workflow.
* Add analytics only if required and with appropriate privacy considerations.
* Add a dedicated sharing flow for mobile devices.
* Add automated deployment checks through CI/CD.

---

# License

This project was created for Hacker House Goa 2026.

It is intended for the event and is not intended for commercial redistribution without appropriate permission.
