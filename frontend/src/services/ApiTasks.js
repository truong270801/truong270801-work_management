import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const CREATE_TASK_URL = `${API_BASE_URL}/tasks/create`;
const GET_TASK_URL = `${API_BASE_URL}/tasks`;
const UPDATE_TASK_URL = `${API_BASE_URL}/tasks/update`;
const DELETE_TASK_URL = `${API_BASE_URL}/tasks/delete`;

export const createTask = async (task) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      CREATE_TASK_URL,
      { task: task },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

export const listTask = async () => {
  try {
    const token = localStorage.getItem("token");
    const user_id = localStorage.getItem("user_id");
    const response = await axios.get(
      `${GET_TASK_URL}/${user_id}`, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.task;
  } catch (error) {
    console.error("Error listing tasks:", error);
    throw error;
  }
};

export const updateTask = async (taskId, task) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `${UPDATE_TASK_URL}/${taskId}`,
      { task: task },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.task;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

export const deleteTask = async (taskId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`${DELETE_TASK_URL}/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};
