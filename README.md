# KIRA backend API Documentation

## Introduction

This API serves as the backend for a KIRA application, providing various endpoints for user management, project handling, and task management.

## Users

### Create User

- **Endpoint**: `/user`
- **Method**: POST
- **Description**: Creates a new user.

### User Login

- **Endpoint**: `/login`
- **Method**: POST
- **Description**: Authenticates a user.

### Get User by Email

- **Endpoint**: `/userByEmail`
- **Method**: POST
- **Description**: Retrieves user information based on email.

### Add Password to User

- **Endpoint**: `/addPassword`
- **Method**: PUT
- **Description**: Adds a password to an existing user.

### Check User Login

- **Endpoint**: `/checkLogin`
- **Method**: POST
- **Description**: Validates user login.

### Get All Users

- **Endpoint**: `/allUsers`
- **Method**: GET
- **Description**: Retrieves a list of all users.

### Add Project to User

- **Endpoint**: `/addProject`
- **Method**: POST
- **Description**: Adds projects to a user.

### Remove Project from User

- **Endpoint**: `/removeProject`
- **Method**: POST
- **Description**: Removes a project from a user.

### Refresh Test

- **Endpoint**: `/refreshTest`
- **Method**: POST
- **Description**: Refreshes a test (Delete user created in a test).

## Projects

### Create Project

- **Endpoint**: `/project`
- **Method**: POST
- **Description**: Creates a new project.

### Get All Projects

- **Endpoint**: `/project`
- **Method**: GET
- **Description**: Retrieves a list of all projects.

### Update Project

- **Endpoint**: `/project/:id`
- **Method**: PUT
- **Description**: Updates project information.

### Delete Project

- **Endpoint**: `/project/:id`
- **Method**: DELETE
- **Description**: Deletes a project.

### Get Project by ID

- **Endpoint**: `/project/:id`
- **Method**: GET
- **Description**: Retrieves project details by ID.

### Get Projects by User

- **Endpoint**: `/projects/:id`
- **Method**: GET
- **Description**: Retrieves projects associated with a user.

### Get Users by Project

- **Endpoint**: `/usersByProject/:id`
- **Method**: GET
- **Description**: Retrieves users associated with a project.

### Get Users Not in Project

- **Endpoint**: `/usersNoProject/:id`
- **Method**: POST
- **Description**: Retrieves users not associated with a project.

### Add Admin to Project

- **Endpoint**: `/addAdmin/:id`
- **Method**: POST
- **Description**: Adds an admin to a project.

### Refresh Project

- **Endpoint**: `/refreshProject`
- **Method**: POST
- **Description**: Refreshes a project (Delete a project and their task created in a test).

## Tasks

### Create Task

- **Endpoint**: `/task`
- **Method**: POST
- **Description**: Creates a new task.

### Get Tasks by Project

- **Endpoint**: `/task/:id`
- **Method**: GET
- **Description**: Retrieves tasks associated with a project.

### Delete Task

- **Endpoint**: `/task/:id`
- **Method**: DELETE
- **Description**: Deletes a task.

### Update Task

- **Endpoint**: `/task/:id`
- **Method**: PUT
- **Description**: Updates task information.

### Get Task by ID

- **Endpoint**: `/taskInfo/:id`
- **Method**: GET
- **Description**: Retrieves task details by ID.

### Update Tasks Order

- **Endpoint**: `/updateTasksOrder`
- **Method**: PUT
- **Description**: Updates the order of tasks.

### Get Task by Status

- **Endpoint**: `/taskByStatus/:projectId/:status`
- **Method**: GET
- **Description**: Retrieves tasks by status for a specific project.

### Update Owner of Task

- **Endpoint**: `/updateOwner/:id`
- **Method**: PUT
- **Description**: Updates the owner of a task.

### Update Task Status

- **Endpoint**: `/updateStatus/:id`
- **Method**: PUT
- **Description**: Updates the status of a task.

### Add Comment to Task

- **Endpoint**: `/addComment/:id`
- **Method**: POST
- **Description**: Adds a comment to a task.

### Edit Comment on Task

- **Endpoint**: `/editComment/:id/:commentId`
- **Method**: POST
- **Description**: Edits a comment on a task.

### Delete Comment on Task

- **Endpoint**: `/deleteComment/:id/:commentId`
- **Method**: DELETE
- **Description**: Deletes a comment on a task.

Note: Please refer to the API implementation for detailed request and response formats for each endpoint. If you have any questions or need further clarification, feel free to reach out.
