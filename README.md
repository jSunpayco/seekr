# SeekR
A job application tracker. The design was created using Figma, and the project is currently being developed using React, Typescript, and Vite. You may view the current progess of the development by visiting the kanban board on [Trello](https://trello.com/b/GNuG3cWO/seekr).

Unit tests are being done using Vitest, whilst end to end tests with Cypress. You may find the test cases in this [Spreadsheet](https://docs.google.com/spreadsheets/d/19LfN5EEWohbHcOWVoVWJ0TxWu2B1ZFRTx32os-eBqRk/edit?usp=sharing).

![login](https://res.cloudinary.com/ddx0aorm7/image/upload/v1684385885/seekr_login.png)

## Installation
To clone the application on your local environment, you may download and unzip the rep (dev branch), then open your command line in the repo's directory and type in the following commands.

Windows:

```sh
# Install dependencies
$ npm install

# Run the app
$ npm run dev
```

## Current features

Currently, the application's client side has not been connected to the server side. This means that features such as logging in/out, and managing job applications are only available locally, and will not save.

### Landing page
![Landing](https://res.cloudinary.com/ddx0aorm7/image/upload/v1687496032/seekr_landing.png)
This page contains the navigation bar where users will be able to filter what job items would be displayed.
The page also includes a legend to indicate the status of the job applications.
Job applications can also be deleted as well.

### Update status
![update](https://res.cloudinary.com/ddx0aorm7/image/upload/v1685695263/seekr_update.png)
This modal lets users update the status of the job application

### Create job
![Create](https://res.cloudinary.com/ddx0aorm7/image/upload/v1687496032/seekr_create.png)
This modal lets users create a new job application. Form validation is included.

### Mobile view
This web app is developed to have a responsive design in order for it to be accessible using various devices
![mobile](https://res.cloudinary.com/ddx0aorm7/image/upload/v1687496032/seekr_mobile.png)
