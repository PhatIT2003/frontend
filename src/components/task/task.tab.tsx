"use client";
import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import Image from 'next/image';
import TaskGet from './task.get';

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
                 
                         <div>
                         <TaskGet/>
                    </div>
                    <div className='mt-3'>
                  
                  

                    </div>
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
