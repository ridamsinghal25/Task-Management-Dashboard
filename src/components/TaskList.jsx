import { useSelector } from "react-redux";
import TaskItem from "@/components/TaskItem";
import { withOverDueLabel } from "@/components/TaskItem";

export default function TaskList({ filter, searchQuery }) {
  const tasks = useSelector((state) => state.tasks.tasks);

  const TaskItemOverDueLabel = withOverDueLabel(TaskItem);

  const isTaskOverdue = (task) => {
    return (
      new Date(task.dueDate)?.setHours(0, 0, 0, 0) <
      new Date()?.setHours(0, 0, 0, 0)
    );
  };

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === "completed") return task.completed;
      else if (filter === "pending") return !task.completed;
      else if (filter === "overdue")
        return isTaskOverdue(task) && !task.completed;
      return true;
    })
    .filter((task) =>
      task?.title?.toLowerCase()?.includes(searchQuery.toLowerCase())
    );

  return (
    <div className="space-y-4">
      {filteredTasks.length > 0 ? (
        filteredTasks.map((task) => {
          return isTaskOverdue(task) ? (
            <TaskItemOverDueLabel key={task.id} task={task} />
          ) : (
            <TaskItem key={task.id} task={task} />
          );
        })
      ) : (
        <p className="text-center text-gray-500">No tasks found.</p>
      )}
    </div>
  );
}
