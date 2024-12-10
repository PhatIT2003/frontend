"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { fetchRankTelegrams } from "@/Database/getAPI";
import { ApiTelegram } from "@/Database/ApiTelegram";
import { UserInfo } from "@/app/type/interface";
import clsx from "clsx";
import Load from "../loading/load";

const RankGet = () => {
    const [rankedUsers, setRankedUsers] = useState<UserInfo[]>([]);
    const Token = typeof window !== 'undefined' ?  sessionStorage.getItem('sessionToken') || '' : '';
    const [userRank, setUserRank] = useState<number | null>(null);
    const [database, setDatabase] = useState<UserInfo | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDatabase = async () => {
            const db = await ApiTelegram();
            if (db) setDatabase(db);
        };
        fetchDatabase();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetchRankTelegrams(Token);

                if (result.success && result.members) {
                    const sortedUsers = result.members
                        .map((user: UserInfo, index: number) => ({
                            ...user,
                            uniqueKey: `user-${user.id || index}`,
                            token: user.token || 0
                        }))
                        .sort((a: UserInfo, b: UserInfo) => b.token - a.token);

                    setRankedUsers(sortedUsers);

                    if (database?.id) {
                        const rank = sortedUsers.findIndex((user: UserInfo) => user.id === database.id);
                        setUserRank(rank !== -1 ? rank + 1 : null);
                    }
                } else {
                    setError("No members found in the response");
                }
            } catch (err) {
                setError("Failed to fetch ranked users.");
                console.error("Error fetching ranked users:", err);
            }
        };
        fetchData();
    }, [database, Token]);

    return (
        <>
            <div className="row border border-primary p-2 rounded-3 mb-3 mt-5 bg-black bg-opacity-25">
                <div className="col-4 color">
                    <b>  <Image src={database?.photoUrl ||"/images/TBC.png"} alt="avatar Image" width={25} height={25} className="rounded-circle" />
                    &nbsp;{database?.first_name} {database?.last_name}</b>
                </div>
                <div className="col-4 color ">
                    <b>{database?.token !== undefined ? database.token.toFixed(2) : "N/A"}</b> &nbsp;
                    <Image src="/images/TBC.png" alt="Token Image" width={20} height={20} />
                </div>
                <div className="col-4 color">
                    <b>TOP {userRank !== null ? userRank : "N/A"}</b>
                </div>
            </div>

            <>
                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}
                <hr/>
                <b className="text-white">Top 100</b>
     
                <div className="row mt-2 text-white">
                    <div className="col-4"><b>Rank</b></div>
                    <div className="col-4"><b>Name</b></div>
                    <div className="col-4"><b>Token</b></div>
                </div>

                {rankedUsers.length > 0 ? (
                    rankedUsers.slice(0, 100).map((user, index) => (
                        <div
                            key={user.uniqueKey as string}
                            className={clsx(
                                "row border border-primary text-white rank p-2 rounded-3 mt-2",
                                { "bg-primary bg-opacity-25": database?.id === user.id }
                            )}
                        >
                            <div className="col-4">{index + 1}</div>
                            <div className="col-4">
                             <Image src={user.photoUrl ||"/images/traibom.svg"} alt="avatar Image" width={25} height={25} className="rounded-circle" />
                             &nbsp;{user.first_name} {user.last_name}
                            </div>
                            <div className="col-4">
                                {user.token !== undefined ? user.token.toFixed(2) : "N/A"}&nbsp;
                                <Image src="/images/TBC.png" alt="Token Image" width={20} height={20} className="ml-2" />
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="row mt-2 text-white">
                        <div className="col-12"><Load/></div>
                    </div>
                )}
            </>
        </>
    );
};

export default RankGet;
