import {useEffect, useState} from 'react'
const channel = new BroadcastChannel('sw-messages');

export default function usePush() {
    const [state] = useState({})
    useEffect(() => {
        channel.addEventListener('message', event => {
            console.log('message received')
            console.log('Received', event.data);
          });
    }, [])
    return state
}