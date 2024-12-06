"use client";
import InviteGet from '@/components/invite/invite.get'
import InviteLink from '@/components/invite/invite.link'
import RankGet from '@/components/rank/rank.get';
import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import Image from 'next/image';

const Tab = () => {
    const onChange = (key: string) => {
        console.log(key);
    };

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: (<b className="text-white"> <i className="bi bi-bar-chart-line "> </i>Rank</b>),
            children: (<div>
                      <div className="text-center">
                <Image src='/images/image.webp' width={120} height={100} alt='click' />
                </div>
               <div className="loader text-center mt-3  p-3">
                <span>RANK</span>
                <span>RANK</span>
            </div>  
            <RankGet/>
            </div>),
        },
        {   
            key: '2',
            label: (<b className='text-white'><i className="bi bi-person-fill-add "> </i>Invite</b>),
            children:  (
                <div>
                     <div className="loader text-center p-3 mt-3">
                   <span>InviteFens</span>
                   <span>InviteFens</span>
                         </div>
                         <div>
                    <InviteLink />
                    </div>
                    <div className='mt-3'>
                    <InviteGet />
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

export default Tab;
