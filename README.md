# Example Project
*Made by ohmmolina*

### Contacts CRUD Example with Vue, Tailwind and Typescript
### Testing with Vitest for Unit Testing and Cypress for End-End


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