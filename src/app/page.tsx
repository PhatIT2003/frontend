"use client";
import { useEffect, useState, useRef, Suspense } from 'react';
import Image from 'next/image';
import { ApiTelegram } from "@/Database/ApiTelegram";
import { ApiTelegramClaim } from "@/Database/ApiTelegram";
import { Time, UserInfo } from './type/interface';
import { Load } from  '@/components/loading/load'
export default function Home() {
    const [database, setDatabase] = useState<UserInfo | null>(null);

    const [canClaim, setCanClaim] = useState(false);
    const [remainingTime, setRemainingTime] = useState<Time| null>(null);

    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Check if claiming is allowed based on last claim time
    const checkClaimEligibility = (db: UserInfo) => {
        // Allow claim if lastClaim is null, "null", or undefined
        if (!db.lastClaim || db.lastClaim === "null") {
            setCanClaim(true);
            return;
        }

        const lastClaimTime = new Date(db.lastClaim);
        const fourHoursLater = new Date(lastClaimTime.getTime() + 4 * 60 * 60 * 1000);
        const now = new Date();

        setCanClaim(now >= fourHoursLater);
        startCountdown(lastClaimTime);
    };

    // Use a client-side effect to call ApiTelegram
    useEffect(() => {
        const fetchDatabase = async () => {
            const db = await ApiTelegram();
            if (db) {
                setDatabase(db);
                checkClaimEligibility(db);
            }
        };
        fetchDatabase();
    }, []);

    // Start countdown timer
    const startCountdown = (lastClaimTime: Date) => {
        // Clear any existing timer
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }

        const fourHoursLater = new Date(lastClaimTime.getTime() + 4 * 60 * 60 * 1000);
        const totalDurationSeconds = 4 * 60 * 60; // 4 hours in seconds

        const updateCountdown = () => {
            const now = new Date();
            
            if (now >= fourHoursLater) {
                setRemainingTime(null);
                setCanClaim(true);
                if (timerRef.current) {
                    clearInterval(timerRef.current);
                }
                return;
            }

            const diffMs = fourHoursLater.getTime() - now.getTime();
            const totalRemainingSeconds = Math.floor(diffMs / 1000);

            const hours = Math.floor(totalRemainingSeconds / 3600);
            const minutes = Math.floor((totalRemainingSeconds % 3600) / 60);
            const seconds = totalRemainingSeconds % 60;

            setRemainingTime({
                hours,
                minutes,
                seconds,
                totalSeconds: totalRemainingSeconds,
                totalDurationSeconds
            });
        };

        // Initial call
        updateCountdown();

        // Set up interval
        timerRef.current = setInterval(updateCountdown, 1000);
    };

    // Cleanup timer on component unmount
    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, []);

    const handleClaim = async () => {
        if (!canClaim) {
            alert("You can only claim rewards every 4 hours.");
            return;
        }

        const claimResult = await ApiTelegramClaim();
        if (claimResult) {
        
            // Gọi API để lấy dữ liệu mới sau khi claim
            const updatedDatabase = await ApiTelegram(); // Lấy dữ liệu mới
            if (updatedDatabase) {
                setDatabase(updatedDatabase); // Cập nhật database với dữ liệu mới
                startCountdown(new Date());
                setCanClaim(false);
            }
        }
    };

    // Calculate progress percentage
    const getProgressPercentage = () => {
        if (!remainingTime) return 0;
        return 100 - ((remainingTime.totalSeconds / remainingTime.totalDurationSeconds) * 100);
    };
    const tokens= sessionStorage.getItem('token')
    
    if (!tokens) {
        return (
            <div className="LoadingBg">
                <div className="loaders p-5 ">
                    <div className="loading-text">
                        Loading
                    </div>
                    <div className="loading-bar-background">
                        <div className="loading-bar">
                            <div className="white-bars-container">
                                <div className="white-bar"></div>
                                <div className="white-bar"></div>
                                <div className="white-bar"></div>
                                <div className="white-bar"></div>
                                <div className="white-bar"></div>
                                <div className="white-bar"></div>
                                <div className="white-bar"></div>
                                <div className="white-bar"></div>
                                <div className="white-bar"></div>
                                <div className="white-bar"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className="container bg">
            <div className="background1">
            <div className="background2">
                <div className="row ">
                <Suspense fallback={<><Load /><Load /></>}>
                    {database && (
                        <div className="col-6 mt-2 ">
                            <b className="name p-2">
                            <Image src={database.photoUrl} alt="avatar Image" width={25} height={25} className="rounded-circle" />
                                &nbsp;{database.first_name } {database.last_name}
                            </b>
                        </div>
                    )}
                    </Suspense>
                    <Suspense fallback={<><Load /><Load /></>}>
                    {database && (
                        <div className="col-6 text-end mt-2">
                           <b className="name p-2"><Image src="/images/TBC.png" alt="Token Image" width={20} height={20} />&nbsp; {database.token.toFixed(2) || 0} TBC</b>
                        </div>
                    )}
                    </Suspense>
                </div>

                <div className='xoay  mt-5 mb-3' >
                    <Image src='/images/hieuung.svg' width={230} height={230} alt='click' />
                </div>
                {database && (
                    <div className="text-center ">
                        <b className="colors fs-1">{database.token.toFixed(2) || 0} </b>
                        <br />
                        <span className="color p-2"><Image src="/images/TBC.png" alt="Token Image" width={20} height={20} /> $TBC </span>
                    </div>
                )}
                 <Suspense fallback={<><Load /><Load /></>}>
                <div className='text-center p-3 mt-3'>
                    {remainingTime ? (
                        <div className="countdown-container">
                            <div className="progress d-flex " style={{height: '40px', backgroundColor: '#ffffff',opacity: 0.7, borderRadius: '10px', boxShadow: '2px 8px 5px #000000'}}>
                                <div 
                                    className="progress-bar" role="progressbar" 
                                    style={{ width: `${getProgressPercentage()}%`, backgroundColor: '#28ecab'}}
                                ></div>
                                <div className="countdown-text mt-2">
                               {remainingTime.hours}h {remainingTime.minutes}m {remainingTime.seconds}s
                            </div>
                            </div>
                            
                        </div>
                    ) : (
                        <button className='buttonc' onClick={handleClaim} disabled={!canClaim}>
                            <b>Claim Rewards</b>
                        </button>
                    )}
                </div>
                </Suspense>
            </div>
            </div>
        </div>
    );
}