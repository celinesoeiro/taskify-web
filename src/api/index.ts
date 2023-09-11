import { File } from "buffer";

export const baseURL = 'http://localhost:3333/tasks'

interface CreateTask {
    title: string;
    description?: string;
}

export const listTasks = async () => {    
    return await fetch(baseURL, {
        method: 'GET',
        mode: 'cors'
      })  
}

export const markAsDone = async (id: string) => {
    return await fetch(`${baseURL}/${id}/completed`, {
        method: 'PATCH',
        mode: 'cors'
    })
}

export const deleteTask = async (id: string) => {
    return await fetch(`${baseURL}/${id}`, {
        method: 'DELETE',
        mode: 'cors'
    })
}

export const createTask = async (data: CreateTask) => {
    return await fetch(baseURL, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'accept': 'application/json',
        },
        body: JSON.stringify(data)
    })
}

export const createTaskByCSV = async (data: FormData) => {
    return await fetch(baseURL, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'content-type': 'multipart/form-data'
        },
        body: JSON.stringify(data)
    })
}