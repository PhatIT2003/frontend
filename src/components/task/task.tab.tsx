"use client";
import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import TaskGet from './task.get';
import TaskDailyGet from './taskDaily.get';

const TaskTab = () => {
    const onChange = (key: string) => {
        console.log(key);
    };

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: (<b className="text-white"> <i className="bi bi-bar-chart-line "> </i>Main</b>),
            children: (<div>
                <TaskGet/>
            </div>),
        },
        {   
            key: '2',
            label: (<b className='text-white'><i className="bi bi-person-fill-add "> </i>Daily</b>),
            children:  (
                 
                         <div>
                         <TaskDailyGet/>
                    </div>
            ),
        }
    ];

    return (
        <div className='container'>
            <Tabs defaultActiveKey="1" items={items}    onChange={onChange} />
        </div>
    );
}

    export default TaskTab;
