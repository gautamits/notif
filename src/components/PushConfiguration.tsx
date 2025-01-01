import React, { useEffect, useState } from "react"
import copy from 'copy-to-clipboard';
 
interface Props {
    applicationServerKey: string
}

export default function PushConfiguration(props: Props){
    const [swConfig, error] = useServiceWorkerPush(props.applicationServerKey)
    if(error){
        return <textarea value={String(error)} />
    }
    return(
        <div className='flex flex-col h-full'>
        <textarea readOnly className='flex-1 basis-[auto] border-red-600 rounded border mb-[6px]'  value={JSON.stringify(swConfig, null, 2)} />
        <button className='bg-red-600 text-white uppercase rounded' onClick={e=>copy(JSON.stringify(swConfig, null, 2))}>Copy to clipboard</button>
        </div>
    )
}

export function useServiceWorkerPush(applicationServerKey: string){
    const [config, setConfig] = useState<PushSubscription | null | undefined>(null)
    const [error, setError] = useState<unknown>(null)
    useEffect(()=>{
        async function getSubScription(){
            try{
                const registration = await navigator.serviceWorker.getRegistration()
                const pushSubscription = await registration?.pushManager.subscribe({applicationServerKey, userVisibleOnly: true})
                setConfig(pushSubscription)
            } catch(err){
                console.error(err)
                setError(err)
            }
        }
        getSubScription()
    },[applicationServerKey])
    return [config, error]
}