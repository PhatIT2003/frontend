
import { Suspense} from 'react'
import { Load } from  '@/components/loading/load'
import TaskGet from '@/components/task/task.get'
import Image from 'next/image'

const Task = () => {
    return (
        <div className="container bg1">
            <div className="text-center">
            <Image src='/images/task_bag.png' width={300} height={150} alt='click' />
            </div>
            <div className="loader text-center mt-3 mb-5">
                <span>TASK</span>
                <span>TASK</span>
            </div>
           
            <Suspense fallback={<><Load /><Load /></>}>
           <TaskGet/>
           </Suspense>
        </div>
    );
};

export default Task;
