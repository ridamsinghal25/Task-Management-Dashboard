import { useState } from "react";
import { useDispatch } from "react-redux";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clock, Edit, Trash } from "lucide-react";
import TaskForm from "@/components/TaskForm";
import DeleteConfirmation from "@/components/DeleteTask";
import { toggleTaskStatus, deleteTask } from "@/store/TaskSlice";

export default function TaskItem({ task }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleToggle = () => {
    dispatch(toggleTaskStatus(task.id));
  };

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
  };

  return (
    <Card
      className={`${
        new Date(task.dueDate) < new Date() ? "border-red-500 border-2" : ""
      }`}
    >
      <CardHeader className="mt-2">
        <CardTitle className="flex items-center gap-2">
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Checkbox
                checked={task.completed}
                onCheckedChange={handleToggle}
              />
              <span
                className={task.completed ? "line-through text-gray-500" : ""}
              >
                {task.title}
              </span>
            </div>
            {new Date(task.dueDate).toLocaleDateString()}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>{task.description}</p>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsEditing(true)}
        >
          <Edit className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsDeleting(true)}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </CardFooter>
      {isEditing && (
        <TaskForm task={task} onClose={() => setIsEditing(false)} />
      )}
      {isDeleting && (
        <DeleteConfirmation
          onConfirm={handleDelete}
          onCancel={() => setIsDeleting(false)}
        />
      )}
    </Card>
  );
}

export const withOverDueLabel = (TaskItem) => {
  return (props) => {
    return (
      <div className="relative">
        <div className="absolute top-0 left-0 z-10">
          <div className="relative bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-br-lg">
            <span className="relative z-10 flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              Over due
            </span>
          </div>
        </div>
        <TaskItem {...props} />
      </div>
    );
  };
};
