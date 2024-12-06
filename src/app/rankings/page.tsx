import Tab from "@/components/rankings/tab";
import { Suspense } from 'react';
import Load from '@/components/loading/load';

const Rankings = () => {
    return (
        <div className="container bg1">
            <Suspense fallback={<><Load /><Load /></>}>
                <Tab />
            </Suspense>
        </div>
    );
};

export default Rankings;
