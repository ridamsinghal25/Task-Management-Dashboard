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
import { Clock, Edit, MoveRight } from "lucide-react";
import { toggleTaskStatus } from "@/store/TaskSlice";
import { useNavigate } from "react-router-dom";

export default function TaskItem({ task }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleToggle = () => {
    dispatch(toggleTaskStatus(task.id));
  };

  const isTaskOverdue =
    new Date(task.dueDate)?.setHours(0, 0, 0, 0) <
    new Date()?.setHours(0, 0, 0, 0);

  return (
    <Card className={`${isTaskOverdue ? "border-red-500 border-2" : ""}`}>
      <CardHeader className="mt-2">
        <CardTitle className="flex items-center gap-2">
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-2">
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
            </div>
            {new Date(task.dueDate).toLocaleDateString()}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className={task.completed ? "line-through text-green-500" : ""}>
          {task.description}
        </p>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button
          onClick={() => navigate(`/tasks/${task.id}`)}
          className="cursor-pointer"
        >
          <MoveRight />
        </Button>
      </CardFooter>
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
