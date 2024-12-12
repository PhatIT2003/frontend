// getAPI.ts

import { BASE_URL } from '@/constants/infoApi';




export const fetchRankTelegrams = async (Token: string) => {
    const res = await fetch(`${BASE_URL}/telegram/auth/api/users`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${Token}`,
            "Content-Type": "application/json",
        },  
    })
    const data = await res.json()
    // console.log(data)
    return data
};

export const fetchTaskTelegrams = async (Token: string ) => {
    const res = await fetch(`${BASE_URL}/telegram/auth/api/task`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${Token}`,
            "Content-Type": "application/json",
        },  
    })
    const data = await res.json()
    // console.log(data)
    return data
};
    
export const fetchTaskTelegramsCompleted = async (taskId: string, Token: string ) => {
    const res = await fetch(`${BASE_URL}/telegram/auth/api/task/complete/${taskId}`, {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${Token}`,
            "Content-Type": "application/json",
        },  
    })
    const data = await res.json()
    // console.log(data)
    return data
};
export const fetchTaskTelegramsCompletedByUser = async (Token: string ) => {
    const res = await fetch(`${BASE_URL}/telegram/auth/api/task/completed-tasks`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${Token}`,
            "Content-Type": "application/json",
        },  
    })
    const data = await res.json()
    // console.log(data)
    return data
};
export const fetchTaskDailyTelegrams = async (Token: string ) => {
    const res = await fetch(`${BASE_URL}/telegram/auth/api/taskDaily`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${Token}`,
            "Content-Type": "application/json",
        },  
    })
    const data = await res.json()
    // console.log(data)
    return data
};
    
export const fetchTaskDailyTelegramsCompleted = async (taskId: string, Token: string ) => {
    const res = await fetch(`${BASE_URL}/telegram/auth/api/taskDaily/completeDaily/${taskId}`, {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${Token}`,
            "Content-Type": "application/json",
        },  
    })
    const data = await res.json()
    // console.log(data)
    return data
};
export const fetchTaskDailyTelegramsCompletedByUser = async (Token: string ) => {
    const res = await fetch(`${BASE_URL}/telegram/auth/api/taskDaily/completedDaily-tasks`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${Token}`,
            "Content-Type": "application/json",
        },  
    })
    const data = await res.json()
    // console.log(data)
    return data
};
export const fetchInviteTelegrams = async (Token: string) => {
    const res = await fetch(`${BASE_URL}/telegram/auth/api/users/invite`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${Token}`,
            "Content-Type": "application/json",
        },
    });

    const data = await res.json();

    // Trả về dữ liệu đã lọc
    return data
};
export const updateAddressTelegrams = async (Id: string, newAddress: string, Token: string) => {
    const res = await fetch(`${BASE_URL}/telegram/auth/api/users/address/${Id}`, {
        method: "PUT",
        body: JSON.stringify({ address: newAddress }),
        headers: {
            'Authorization': `Bearer ${Token}`,
            "Content-Type": "application/json",
        },
    }); 
    const data = await res.json()
    return data
};

