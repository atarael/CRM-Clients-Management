import * as api from '../api/index.js';

export const getAllTasks = async () => {
    try {
        const response = await api.getAllTasks();
        return response.data;
    }
    catch {
        console.log("Error in getLastWeekNewProducts ");
        return null;
    }

}

export const updateTask = async (taskToEdit, content) => {
    try {
        const response = await api.updateTask(taskToEdit, content);
        return response.data;
    }
    catch {
        console.log("Error in updateTask ");
        return null;
    }



}

export const addTask = async (newTask) => {
    try {
        const response = await api.addTask(newTask);
        return response.data;
    }
    catch {
        console.log("Error in updateTask ");
        return null;
    }
} 
export const removeTask = async (taskId) => {
    try {
        const response = await api.removeTask(taskId);
        return response.data;
    }
    catch {
        console.log("Error in removeTask ");
        return null;
    }
} 
 