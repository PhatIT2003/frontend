'use client';
import Wallet from "@/components/connect/wallet/wallet";
import User from '@/components/connect/user';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { manifestUrl } from '@/components/connect/wallet/tonconnect-config';
import { Load } from '@/components/loading/load';
import { Suspense } from 'react';

const Connect = () => {
    const options = {
        manifestUrl: manifestUrl,
    };

    return (
        <div className="container bg1">
        
            <div className="loader text-center mt-3 mb-5">
                <span>Wallet</span>
                <span>Wallet</span>
            </div>
            <div className='row'>
                <Suspense fallback={<><Load /><Load /></>}>
                    <User />
                </Suspense>
            </div>
            <div className="row mb-5">
                <Suspense fallback={<><Load /><Load /></>}>
                    <TonConnectUIProvider manifestUrl={options.manifestUrl}>
                        <Wallet />
                    </TonConnectUIProvider>
                </Suspense>
            </div>
        </div>
    );
};

export default Connect;
