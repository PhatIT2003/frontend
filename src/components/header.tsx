"use client";
import { ApiTelegram } from "@/Database/ApiTelegram";
import { UserInfo } from "@/app/type/interface";
import { useEffect, useState } from "react";

const Header = () => {
    const [database, setDatabase] = useState<UserInfo | null>(null);
    useEffect(() => {
        const fetchDatabase = async () => {
            const db = await ApiTelegram();
            if (db) setDatabase(db);
        };
        fetchDatabase();
    }, []);

    return (
    <div className="header ">
        <div className="container bg-dark ">
            <div className="row text-white">
                <div className="col-6">
                    <button className="logo" data-text="Awesome">
                        <span className="actual-text">&nbsp;Tobe&nbsp;</span>
                        <span aria-hidden="true" className="hover-text">&nbsp;Tobe&nbsp;</span>
                    </button>
                </div>
                <div className="col-6 d-flex align-items-center justify-content-end">
                    <b className="rounded-start-pill bg-white bg-opacity-10 p-2 size">
                        {database?.address && database.address.length > 8 
                        ? `${database.address.slice(0, 4)}...${database.address.slice(-6)}` 
                        : database?.address}
                    </b>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Header;