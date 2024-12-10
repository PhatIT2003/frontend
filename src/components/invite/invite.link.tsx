'use client';
import { useState, useEffect } from 'react';

import { ApiTelegram } from '@/Database/ApiTelegram'     // Import hook để lấy thông tin người dùng
import { toast } from 'react-toastify';
import { UserInfo } from '@/app/type/interface';
import Load from '../loading/load';

const InviteLink = () => {
    const [referralLink, setReferralLink] = useState('');
    const [database, setDatabase] = useState<UserInfo | null>(null);

    useEffect(() => {
        const fetchDatabase = async () => {
            const db = await ApiTelegram();
            if (db) {
                setDatabase(db);
                const userId = db.user_id;
                const referralUrl = `https://t.me/tobechain_appbot/tobe_start?startapp=${userId}`;
                setReferralLink(referralUrl);
            }
        };
        fetchDatabase();
    }, []);
    
    if (!database) {
        return <div className="text-center">
          <b> Bạn cần đăng nhập để có liên kết giới thiệu.</b>
            <div><Load/></div>
        </div>;
    }

    const handleCopy = async () => {
        if (!navigator.clipboard) {
            toast.error('Trình duyệt không hỗ trợ sao chép vào clipboard.');
            return;
        }
        try {
            await navigator.clipboard.writeText(referralLink);
            toast.success('Liên kết đã được sao chép thành công!');
        } catch {
            toast.error('Không thể sao chép liên kết, vui lòng kiểm tra quyền truy cập.');
        }
    };
    

    return (
        <div className="row border border-primary text-white rank p-2 rounded-3 mt-5">
            <div className="col-12">
                <h4>Chia sẻ đường dẫn mời:</h4>
                    <>
                        <input
                            type="text"
                            value={referralLink}
                            readOnly
                            className="form-control bg-black text-white"
                        />
                        <button
                            className="btn btn-primary mt-2"
                            onClick={handleCopy}
                        >
                            Sao chép
                        </button>
                    </>
            </div>
        </div>
    );
};

export default InviteLink;
