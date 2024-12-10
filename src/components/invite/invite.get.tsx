'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { fetchInviteTelegrams } from '@/Database/getAPI'; // Giả sử bạn đã có hàm này
import { UserInfo } from '@/app/type/interface';
import React from 'react';
import Load from '../loading/load';

const InviteGet = () => {
    // State để lưu trữ danh sách thành viên đã mời
    const [sortedUsers, setSortedUsers] = useState<UserInfo[]>([]);
    const Token = typeof window !== 'undefined' ?  sessionStorage.getItem('sessionToken') || '' : '';

    // Sử dụng useEffect để gọi API và cập nhật dữ liệu
    useEffect(() => {
        const getInviteUsers = async () => {
            
            try {
                const data = await fetchInviteTelegrams(Token); // Lấy dữ liệu từ API
      
                if (data.success) { // Kiểm tra xem phản hồi có thành công không
                    setSortedUsers(data.members); // Cập nhật state với danh sách thành viên
                }
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu thành viên mời:', error);
            }
        };

        getInviteUsers();
    }, [Token]); // Chỉ gọi một lần khi component được render

    return (
        <div>
            <b className="color">Thành viên đã mời</b>
            {sortedUsers.length > 0 ? (
                sortedUsers.map((member, index) => (
                    <div className="row border border-primary text-white rank p-2 rounded-3 mt-2" key={member.id}>
                        <div className="col-4">{index + 1}</div>
                        <div className="col-4">
                            <Image src={member.photoUrl ||"/images/traibom.svg"} alt="avatar Image" width={25} height={25} className="rounded-circle" />
                            &nbsp;{member.last_name} {member.first_name}
                            </div>
                        <div className="col-4">
                            {(member.token ?? 0).toFixed(2)}&nbsp;
                            <Image src="/images/TBC.png" alt="Token Image" width={20} height={20} />
                        </div>
                    </div>
                ))
            ) : (
                <div className="row">
                <div className="text-center text-white">Không có thành viên nào được mời.</div>
                <div className="text-center"><Load/></div>
                </div>
            )}
        </div>
    );
};

export default InviteGet;
