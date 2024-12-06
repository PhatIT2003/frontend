'use client';

import { TonConnectButton, useTonAddress } from '@tonconnect/ui-react';
import React, { useEffect, useState } from 'react'; 
import Image from 'next/image';
import { ApiTelegram } from "@/Database/ApiTelegram";
import { updateAddressTelegrams } from '@/Database/getAPI';
import { UserInfo } from '@/app/type/interface';

const Wallet = () => {
  const userFriendlyAddress = useTonAddress();
  const [database, setDatabase] = useState<UserInfo | null>(null);
  const [isAddressUpdated, setIsAddressUpdated] = useState(false);
  const token = typeof window !== 'undefined' ?  sessionStorage.getItem('sessionToken') || '' : '';

  const handleUpdateAddress = async () => {
    if (userFriendlyAddress && database?.id && !isAddressUpdated) { 
      try {
        if (token) {
        await updateAddressTelegrams(database.id, userFriendlyAddress, token);
          setIsAddressUpdated(true);
          console.log('Wallet address updated successfully');
        } else {
          console.error('Token is null');
        }
      } catch (error) {
        console.error('Error updating wallet address:', error);
      } 
    }
  };

    useEffect(() => {
      const fetchDatabase = async () => {
        const db = await ApiTelegram();
        if (db) setDatabase(db);
    };
    fetchDatabase();
  }, []);

  useEffect(() => {
    // Only attempt to update address when a wallet is connected
    // and address hasn't been updated before
    if (userFriendlyAddress && database?.id && !isAddressUpdated) {
      handleUpdateAddress();
    }
  }, [userFriendlyAddress, database, isAddressUpdated]);

  return (
    <div className="container ">
      <div className="d-flex flex-column align-items-center justify-content-center mt-2 mb-2 p-4 border border-info bg-info bg-opacity-10 rounded-4">
        <Image src="/images/TON.png" alt="TON Image" width={150} height={150} />
        <span className="text-white text-center">
          <h4><b>Wallet</b></h4>
          <p className="opacity-75">Connect TON wallet for future rewards</p>
        </span>
        <TonConnectButton />
        
        {/* Optional: Show address update status */}
        {userFriendlyAddress && !isAddressUpdated && (
          <p className="text-warning mt-2">Updating wallet address...</p>
        )}
        {isAddressUpdated && (
          <p className="text-success mt-2">Wallet address updated!</p>
        )}
      </div>
    </div>
  );
}; 

export default Wallet;