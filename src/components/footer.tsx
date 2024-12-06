"use client";
import { useRouter } from 'next/navigation'; 

const Footer = () => {
    const router = useRouter(); // Khởi tạo router

    const handleNavigate = (path: string) => {
        // Chuyển trang ngay lập tức
        router.push(path); // Chuyển đến đường dẫn được chỉ định
    };

    return (
        <div className="footer">
            <div className="row bg-dark">
                
                <div className="col-3 hover  p-2 text-white text-center cursor"  onClick={() => handleNavigate('/')}>
                    <i className="bi bi-house "></i> 
                    <div><b> Home</b></div>
                </div>
                <div className="col-3  hover p-2 text-white text-center cursor"  onClick={() => handleNavigate('/task')}>
                    <i className="bi bi-calendar2-event "></i>
                    <div><b> Task</b></div>
                </div>
                <div className="col-3  hover  p-2 text-white text-center cursor"  onClick={() => handleNavigate('/rankings')}>
                    <i className="bi bi-bar-chart-line "></i>
                    <div><b >Rankings</b></div>
                </div>
                <div className="col-3 p-2 hover text-white text-center cursor"  onClick={() => handleNavigate('/connect')}>
                <i className="bi bi-wallet2"></i>
                    <div><b> Connect</b></div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
