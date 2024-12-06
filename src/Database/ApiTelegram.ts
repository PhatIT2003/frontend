import { retrieveLaunchParams } from '@telegram-apps/sdk';
import { BASE_URL } from '@/constants/infoApi';


export const ApiTelegram = async () => {
    const { initDataRaw } = retrieveLaunchParams();
const params = new URLSearchParams(initDataRaw);
const userData = JSON.parse(decodeURIComponent(params.get('user') || '{}'));
const auth_date = params.get('auth_date');
const hash = params.get('hash');
const queryId = params.get('query_id');
const startapp = params.get('start_param')
    if (!initDataRaw) {
        console.error("Missing initDataRaw");
        return null;
    }
;

    try {
        const res = await fetch(`${BASE_URL}/telegram/auth`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                hash,
                queryId,
                auth_date,
                user: {
                    id: userData.id || '',
                    username: userData.username || '',
                    first_name: userData.first_name || '',
                    last_name: userData.last_name || '',
                    photo_url: userData.photo_url || '',
                    language_code: userData.language_code || '',
                    allows_write_to_pm: userData.allows_write_to_pm || false,
                },
                start_param: startapp,
                timestamp: Date.now(),
            }),
        });

        if (!res.ok) {
            console.error("HTTP error:", res.status, res.statusText);
            return null;
        }

        const data = await res.json();
    
        if (data.success) {
            const memberData = data.member ;
            if (data.token) {
                sessionStorage.setItem('sessionToken', data.token);
            }
            return memberData;
        } else {
            console.error("Error fetching data:", data.message);
            return null;
        }
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
};

export const ApiTelegramClaim = async () => {
    const { initDataRaw } = retrieveLaunchParams();
const params = new URLSearchParams(initDataRaw);
const userData = JSON.parse(decodeURIComponent(params.get('user') || '{}'));
const auth_date = params.get('auth_date');
const hash = params.get('hash');

    if (!initDataRaw) {
        console.error("Missing initDataRaw");
        return null;
    }
    try {
        const res = await fetch(`${BASE_URL}/telegram/auth/user/claim`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                hash,
                auth_date,
                user: {
                    id: userData.id || '',
                },
                timestamp: Date.now(),
            }),
        });

        if (!res.ok) {
            console.error("HTTP error:", res.status, res.statusText);
            return null;
        }

        const data = await res.json();

        return data;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}