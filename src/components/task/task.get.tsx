"use client";
import { useEffect, useState } from "react";
import Image from 'next/image';
import {fetchTaskTelegrams, fetchTaskTelegramsCompleted, fetchTaskTelegramsCompletedByUser} from "@/Database/getAPI";
import { ITask } from '@/app/type/interface';
import Load from "../loading/load";

const TaskGet = () => {
    const [error, setError] = useState<string | null>(null);
    const [taskTelegrams, setTaskTelegrams] = useState<ITask[]>([]);
    const [taskTelegramsCompletedByUser, setTaskTelegramsCompletedByUser] = useState<ITask[]>([]);
    const Token = typeof window !== 'undefined' ?  sessionStorage.getItem('sessionToken') || '' : '';
    const [loadingTaskIds, setLoadingTaskIds] = useState<Set<string>>(new Set());

    useEffect(() => {
        const getTaskTelegrams = async () => {
            try {
                const data = await fetchTaskTelegrams(Token);
                // console.log("Dữ liệu từ fetchTaskTelegrams:", data);
                // Kiểm tra xem dữ liệu có phải là một mảng không
                if (Array.isArray(data)) {
                    setTaskTelegrams(data);
                } else {
                    // Nếu không phải là mảng, kiểm tra xem có thuộc tính nào chứa dữ liệu không
                    if (data && data.tasks) { // Giả sử dữ liệu có thuộc tính 'tasks'
                        setTaskTelegrams(data.tasks);
                    } else {
                        setError('Dữ liệu không hợp lệ');
                    }
                }
            } catch (error) {
                console.error("Lỗi khi fetchTaskTelegrams:", error);
                console.error(error); // In lỗi ra console
                setError('Failed to fetch task telegrams');
            }
        };
        getTaskTelegrams();
    }, [Token]);
    useEffect(() => {
        const getTaskTelegramsCompletedByUser = async () => {
            try {
                if (taskTelegrams.length > 0) {
                    const data = await fetchTaskTelegramsCompletedByUser(Token);
                    // console.log(data); // Kiểm tra dữ liệu trả về
                    // Kiểm tra xem dữ liệu có phải là một mảng không
                    if (Array.isArray(data)) {
                        setTaskTelegramsCompletedByUser(data);
                    } else {
                        if (data && data.tasks) {
                            setTaskTelegramsCompletedByUser(data.tasks);
                        } else {
                            setError('Dữ liệu không hợp lệ');
                        }
                    }
                }
            } catch (error) {
                console.error(error); // In lỗi ra console
                setError('Failed to fetch task telegrams');
            }
        };
        getTaskTelegramsCompletedByUser();
        
    }, [taskTelegrams, Token]);

    const completedTaskIds = new Set(taskTelegramsCompletedByUser.map(task => task.id));
    return (
        <div className="container ">
            {error && <div className="text-danger">{error}</div>}
            <h5 className="text-white">Danh sách nhiệm vụ chưa hoàn thành</h5>
        

                    {taskTelegrams.length > 0 ? (
                        taskTelegrams
                            .filter(task => !completedTaskIds.has(task.id))
                            .map((task, index) => (
                                <div key={index} className="row border  border-primary text-white rank p-2 rounded-3 mt-3">
                                    <div className="col-4 size"><b>{task.name_task}</b></div>
                                    <div className="col-4"><b>{task.token}</b>&nbsp; <Image src="/images/TBC.png" alt="Token Image" width={15} height={15} /></div>
                                    <div className="col-4">
                                        <a href={task.link_task} target="_blank" rel="noopener noreferrer">
                                            <button className={`buttonz size-nc bg-opacity-25`} 
                                                onClick={ () => { 
                                                    setLoadingTaskIds(prev => new Set(prev).add(task.id));
                                                    // Delay for 20 seconds before fetching completed task
                                                    new Promise(resolve => setTimeout(resolve, 10000)).then(() => {
                                                        fetchTaskTelegramsCompleted(task.id, Token);
                                                        setTaskTelegrams(prevTasks => prevTasks.filter(t => t.id !== task.id));
                                                        setLoadingTaskIds(prev => {
                                                            const newSet = new Set(prev);
                                                            newSet.delete(task.id);
                                                            return newSet;
                                                        }); 
                                                    });
                                                }}>
                                                {loadingTaskIds.has(task.id) ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> 
                                                :
                                                 <b ><i className="bi bi-list-task"></i></b>}
                                            </button>
                                        </a>
                                    </div>
                                </div>
                            ))
                    ) : (
                        <div className="row">
                        <div className="text-center">Không có nhiệm vụ nào chưa hoàn thành.</div>
                        <div className="text-center"><Load/></div>
                        </div>
                    )}

            
            <h5 className="text-white mt-5">Danh sách nhiệm vụ đã hoàn thành</h5>
        
            {taskTelegramsCompletedByUser.length > 0 ? (
                taskTelegramsCompletedByUser.map((task, index) => (
                    <div key={index} className="row border border-success text-white rank p-2 rounded-3 mt-3 opacity-75">
                        <div className="col-4 size"><b>{task.name_task}</b></div>
                        <div className="col-4"><b>{task.token}</b>&nbsp; <Image src="/images/TBC.png" alt="Token Image" width={15} height={15} /></div>
                        <div className="col-4">
                            <i className="bi bi-check2-circle"></i>
                        </div>
                    </div>
                ))
            ) : (
                <div className="row">
                <div className="text-center">Không có nhiệm vụ nào đã hoàn thành.</div>
                <div className="text-center"><Load/></div>
                </div>
            )}
        </div>
    );
};


export default TaskGet;
