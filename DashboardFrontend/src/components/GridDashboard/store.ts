import { create } from "zustand";

export interface Task {
id: number;
title: string;
}
interface TaskStore {
tasks: Task[];
add: (task: Task) => void;
remove: (taskId: number) => void;
}
const useTaskStore = create<TaskStore>((set) => ({
tasks: [],
add: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
remove: (taskId) =>
set((state) => ({
tasks: state.tasks.filter((task) => task.id !== taskId),
})),
}));
export default useTaskStore;