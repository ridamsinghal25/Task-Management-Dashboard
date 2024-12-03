import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Edit, Trash } from "lucide-react";
import { toggleTaskStatus, deleteTask } from "@/store/TaskSlice";
import TaskForm from "@/components/TaskForm";
import DeleteConfirmation from "@/components/DeleteTask";
import { useState } from "react";

function TaskDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const task = useSelector((state) =>
    state.tasks.tasks?.find((t) => t.id === Number(id))
  );

  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  if (!task) {
    return <div>Task not found</div>;
  }

  const handleToggle = () => {
    dispatch(toggleTaskStatus(task.id));
  };

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
    navigate("/tasks");
  };

  return (
    <div className="container mx-auto p-4">
      <Button
        variant="outline"
        onClick={() => navigate("/tasks")}
        className="mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Tasks
      </Button>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Checkbox
              checked={task.completed}
              onCheckedChange={handleToggle}
              className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
            />
            <span
              className={task.completed ? "line-through text-green-500" : ""}
            >
              {task.title}
            </span>
          </CardTitle>
          <CardDescription>
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </CardDescription>
        </CardHeader>
        <CardContent
          className={task.completed ? "line-through text-green-500" : ""}
        >
          <p className="text-lg">{task.description}</p>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => setIsEditing(true)}
            disabled={task.completed}
          >
            <Edit className="mr-2 h-4 w-4" /> Edit
          </Button>
          <Button variant="outline" onClick={() => setIsDeleting(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </Button>
        </CardFooter>
      </Card>
      {isEditing && (
        <TaskForm task={task} onClose={() => setIsEditing(false)} />
      )}
      {isDeleting && (
        <DeleteConfirmation
          onConfirm={handleDelete}
          onCancel={() => setIsDeleting(false)}
        />
      )}
    </div>
  );
}

export default TaskDetailPage;
