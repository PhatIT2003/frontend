export interface UserInfo {
    id: string;
    user_id: number;
    username: string;
    first_name: string;
    last_name: string;
    languageCode: string;
    photoUrl: string;
    token: number;
    authDate: string;
    hash: string;
    queryId: string;
    inviter: number | null;
    address: string;
    lastClaim: string;
    [key: string]: unknown; 
    
}
export interface ITask{
    id: string
    stt: number
    name_task: string
    link_task: string
    token: number
  }
  export interface Time {
    hours: number;
    minutes: number;
    seconds: number;
    totalSeconds: number;
    totalDurationSeconds: number;
  }
