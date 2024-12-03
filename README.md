# Task Management Dashboard

## Description

The **Task Management Dashboard** is a web application designed to efficiently manage tasks. It allows users to create, edit, delete, and filter tasks, with features like marking tasks as completed and filtering by task status. The app uses **Redux** for state management and incorporates a responsive and user-friendly UI.

---

## Features

### Task Functionality:

- **Add Task**: Users can add tasks with a title, description, and due date.
- **Edit Task**: Users can update task details.
- **Delete Task**: Users can remove tasks permanently.
- **Mark as Completed**: Tasks can be marked as completed once done.

### Task Filters:

- View tasks by status:
  - **All Tasks**
  - **Completed Tasks**
  - **Pending Tasks**
  - **Overdue Tasks**: Tasks with a due date earlier than the current date.

### Additional Features:

- **Search**: Find tasks by title.
- **Delete Confirmation**: Displays a modal before confirming task deletion.

---

## Technologies Used

- **Frontend**: React.js, Redux
- **UI Library**: Shadcn/ui
- **State Management**: Redux
- **Styling**: Styled-components and TailwindCSS

---

## Installation Instructions

### Prerequisites:

- Node.js (v14 or later)
- npm or yarn

### Steps:

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd task-management-dashboard
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

   Or, if you use yarn:

   ```bash
   yarn install
   ```

3. **Start the development server**:

   ```bash
   npm run dev
   ```

   Or, if you use yarn:

   ```bash
   yarn dev
   ```

4. **Open your browser and navigate to:**
   ```bash
   http://localhost:5173/tasks
   ```
