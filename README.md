# Note Taking App

## Purpose of the Application

```bash
The Note Taking App is designed to help users organize their thoughts, tasks, and reminders efficiently. The application provides a seamless user experience with functionalities such as user authentication, note creation, editing, and deletion, customizable settings, and more.
```

## Contributing to the Development

We welcome contributions from the community! Here’s how you can contribute:

```bash
1. **Fork the repository** on GitHub.
2. **Clone your forked repository** to your local machine:
   git clone https://github.com/yourusername/note-taking-app.git
3. Create a new branch for your feature or bugfix:
   git checkout -b feature-name
4. Make your changes and commit them with descriptive messages:
   git commit -m "Add new feature"
5. Push your changes to your forked repository:
   git push origin feature-name
6. Create a pull request from your branch to the main repository.
```

## Features

User authentication (login and registration)
Note management (view, add, edit, delete)
Customizable font sizes
Persistent settings using AsyncStorage
User-friendly interface

## Dependencies and Installation

## Dependencies

React Native
React Navigation
AsyncStorage
Axios (for API calls)
react-native-vector-icons
@react-native-picker/picker

## Installation

Clone the repository:git clone https://github.com/maihunga1/ifn666-final.git

### Start the expo app

```bash
cd NoteTakingApp
npm install
npx expo start
```

### Start the backend server

```bash
cd NoteTakingAppServer
npm install
npm start
```

### Mapping Port

```bash
adb reverse tcp:3000 tcp:3000
```

## Application Architecture

The application follows a modular structure with separate files for each screen and component. The main components are:

SplashScreen: Displays a welcome message and navigates to the login screen.
LoginScreen: Allows users to log in.
RegisterScreen: Allows users to register a new account.
HomeScreen: Main screen for viewing and managing notes.
AboutScreen: Provides information about the app.
SettingScreen: Allows users to customize app settings.

```bash
NoteTakingApp
├── .expo
├── assets
├── hooks
├── pages
│ ├── components
│ │ ├── Note.jsx
│ ├── HomeScreen.jsx
│ ├── AboutScreen.jsx
│ ├── LoginScreen.jsx
│ ├── RegisterScreen.jsx
│ ├── SettingScreen.jsx
│ ├── SplashScreen.jsx
│ └── index.jsx
├── .gitignore
├── app.json
├── babel.config.js
├── expo-env.d.ts
├── licenses.json
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.json

NoteTakingAppServer
├── .gitignore
├── package-lock.json
├── package.json
├── server.js
├── LICENSE
└── README.md
```

## Navigation

```bash
Navigation is managed using React Navigation, with a stack navigator for handling authentication and a bottom tab navigator for the main screens.
```

## Reporting Issues

```bash
If you encounter any issues or bugs, please report them by creating an issue on the GitHub repository. Provide a detailed description of the issue and steps to reproduce it.
```

# API Documentation

```bash
The API is documented using Swagger. You can access the Swagger documentation by navigating to /swagger endpoint on your backend server.
```

```bash
{
  "swagger": "2.0",
  "info": {
    "description": "This is the API documentation for the Note Taking App.",
    "version": "1.0.0",
    "title": "Note Taking App API"
  },
  "host": "localhost:3000",
  "basePath": "/",
  "tags": [
    {
      "name": "user",
      "description": "Operations about user"
    },
    {
      "name": "note",
      "description": "Operations about note"
    }
  ],
  "paths": {
    "/login": {
      "post": {
        "tags": ["user"],
        "summary": "Logs user into the system",
        "parameters": [
          {
            "in": "body",
            "name": "body",
            "description": "User object",
            "required": true,
            "schema": {
              "$ref": "#/definitions/User"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "successful operation",
            "schema": {
              "$ref": "#/definitions/User"
            }
          },
          "400": {
            "description": "Invalid username/password supplied"
          }
        }
      }
    },
    "/register": {
      "post": {
        "tags": ["user"],
        "summary": "Register a new user",
        "parameters": [
          {
            "in": "body",
            "name": "body",
            "description": "User object",
            "required": true,
            "schema": {
              "$ref": "#/definitions/User"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "successful operation",
            "schema": {
              "$ref": "#/definitions/User"
            }
          },
          "400": {
            "description": "Invalid input"
          }
        }
      }
    },
    "/notes": {
      "get": {
        "tags": ["note"],
        "summary": "Get all notes",
        "responses": {
          "200": {
            "description": "successful operation",
            "schema": {
              "$ref": "#/definitions/Note"
            }
          }
        }
      },
      "post": {
        "tags": ["note"],
        "summary": "Create a new note",
        "parameters": [
          {
            "in": "body",
            "name": "body",
            "description": "Note object",
            "required": true,
            "schema": {
              "$ref": "#/definitions/Note"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "successful operation",
            "schema": {
              "$ref": "#/definitions/Note"
            }
          },
          "400": {
            "description": "Invalid input"
          }
        }
      }
    }
  },
  "definitions": {
    "User": {
      "type": "object",
      "required": ["username", "password"],
      "properties": {
        "username": {
          "type": "string",
          "example": "johndoe"
        },
        "password": {
          "type": "string",
          "example": "password123"
        }
      }
    },
    "Note": {
      "type": "object",
      "required": ["title", "description"],
      "properties": {
        "title": {
          "type": "string",
          "example": "Note Title"
        },
        "description": {
          "type": "string",
          "example": "Note Description"
        }
      }
    }
  }
}
```
