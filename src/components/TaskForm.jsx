import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { addTask, updateTask } from "@/store/TaskSlice";

export default function TaskForm({ task, onClose }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(task ? task.title : "");
  const [description, setDescription] = useState(task ? task.description : "");
  const [dueDate, setDueDate] = useState(task ? task.dueDate : "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task) {
      dispatch(updateTask({ ...task, title, description, dueDate }));
    } else {
      dispatch(
        addTask({
          id: Date.now(),
          title,
          description,
          dueDate,
          completed: false,
        })
      );
    }
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{task ? "Edit Task" : "Add New Task"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Textarea
            placeholder="Task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <Input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
            min={new Date().toISOString().split("T")[0]}
          />
          <DialogFooter>
            <Button type="submit">{task ? "Update" : "Add"} Task</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
