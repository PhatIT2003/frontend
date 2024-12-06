"use client";
import Image from 'next/image';
import { ApiTelegram } from "@/Database/ApiTelegram";
import { UserInfo } from '@/app/type/interface';
import { useEffect, useState } from 'react';

const User =() =>{
    
    const [database, setDatabase] = useState<UserInfo | null>(null);

    useEffect(() => {
        const fetchDatabase = async () => {
            const db = await ApiTelegram();
            if (db) setDatabase(db);
        };
        fetchDatabase();
    }, []);

    if (!database) {
        return <div>Loading...</div>;
    }

    return(
        <div className="container">
        <div className=' row p-2 text-center  bg-black bg-opacity-25 rounded-4' >
        <div className='col-6 color'>
        <b>  <Image src={database?.photoUrl || ''} alt="avatar Image" width={25} height={25} className="rounded-circle" />
        &nbsp;{database.first_name} {database.last_name}</b>
        </div>
        <div className='col-6 color'>
        <b>{database.token.toFixed(2) || 0}</b>&nbsp; 
        <Image src="/images/TBC.png" alt="Token Image"width={20} height={20} />
        </div>
        </div>
        </div>
    )
}
export default User