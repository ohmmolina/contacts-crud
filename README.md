# Example Project

_Made by ohmmolina_

_Hosted with AWS Amplify in <a href="https://www.ohmmolina.dev" target="_blank">ohmmolina.dev</a>_

### Contacts CRUD Example with Vue, Tailwind and Typescript

### Testing with Vitest for Unit Testing and Cypress for End-End

---

## Folder Structure

### - **cypress**: Contains config and tests for end-to-end testing.

### - **public**

- **fonts**: Ttf and otf files.
- **favicon.ico**: App icon

### - **src**: Source files.

- **assets**: Images, style files, etc.
  - **css**
    - tailwind.css: Required css for tailwind. Here we import the fonts with the @font-face at-rule.
- **shared**: Components, routes, types and functions shared across all modules. Described later.
- **App.vue** & **main.ts**: Main Vue fails containing all the imports necesary to function and the main view.

### - **index.html**: Also a vue basic file which has the main html to maunt the app

### The remaining files are config files for different packages.

## The basic module structure consists on the following folders:

- **components**: The components required for that specific module. For **shared** folder arethe components commonly used for multiple modules.
- **router**: Folder containing all routes required by the module. In **shared** the router represents the main router for the application.
- **stores**: Pinia stores and related services to manage module states.
- **tests**: Unit tests for that module and its components.
- **types**: Types, Interfaces and Enums required for that module. In the **shared** folder, it imports all the types to one main index in order to expose all types to every module that requires it.
- **views**: Contains the main view and children views for the module.
- **index.ts**: This file import router, stores and types and export them. Doing this, all the relevant files for other modules are managed in one single file.
- **utils**: This folder belongs to **shared** exclusivly and contains usefull functions which are required in multiple modules
- **layouts**: The layout folder stands for manage bigger view structure which will be the same in a group of routes. For example, the Navbar and Footer are present in almost every view of the application, and the layout could manage those components, so the views don't need to do it.

---

## Install and Deplay

The installation requires node v18.16.0 to be installed.

Once you had cloned the repo, run `npm install` to start the installation of all required packages.

After the installation has finished, you can bulid the app with `npm run build`, if you want to type check files; or `npm run build-only` to just build without the type check.

And that's it! Now you can use the generated folder /dist to deploy the app in the server that you prefer. Also, vite can make a littel server, just runinng `npm run preview` and the app will be mounted on http://localhost:4173 (if the 4173 port was avaliable).
