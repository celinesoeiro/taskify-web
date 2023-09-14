export const baseURL = 'http://localhost:3333/tasks'

interface CreateTask {
    title: string;
    description?: string;
}

export const listTasks = async (id?: string) => {
    let url = id ? `${baseURL}?id=${id}` : baseURL
    return await fetch(url, {
        method: 'GET',
        mode: 'cors',
    })
}

export const markAsDone = async (id: string) => {
    console.log({ id })
    return await fetch(`${baseURL}/${id}/complete`, {
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
    console.log({ data })
    return await fetch(baseURL, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
}

export const createTaskByCSV = async (data: FormData) => {
    console.log({ data });
    return await fetch(baseURL, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        body: data
    });
};

export const updateTask = async (id: string, data: CreateTask) => {
    return await fetch(`${baseURL}/${id}`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
            'accept': 'application/json',
        },
        body: JSON.stringify(data)
    })
}