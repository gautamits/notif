import { useEffect, useState } from "react"

interface Props {
    applicationServerKey: string
}

export default function PushConfiguration(props: Props){
    const [swConfig, error] = useServiceWorkerPush(props.applicationServerKey)
    useEffect(()=>{
        function highlight(){
            const areas = document.getElementsByClassName("highlight");
            for(let i = 0; i < areas.length; i++) {   
                // window?.CodeMirror?.fromTextArea(areas.item(i), {lineNumbers: true, mode: {name: 'javascript', json: true}});
            }
        }
        highlight()
    },[props.applicationServerKey])
    if(error){
        return <code>{JSON.stringify(error)}</code>
    }
    return(
        <code>
            {JSON.stringify(swConfig || {}, null , 4)}
        </code>
    )
}

function useServiceWorkerPush(applicationServerKey: string){
    const [config, setConfig] = useState<PushSubscription | null>(null)
    const [error, setError] = useState(null)
    useEffect(()=>{
        navigator.serviceWorker.getRegistration()
        .then(reg=>{
            console.log({reg})
            reg?.pushManager.subscribe({applicationServerKey, userVisibleOnly: true}).then(
                function(pushSubscription) {
                console.log({pushSubscription})
                  setConfig(pushSubscription)
                  // The push subscription details needed by the application
                  // server are now available, and can be sent to it using,
                  // for example, an XMLHttpRequest.
                }, function(error) {
                  // During development it often helps to log errors to the
                  // console. In a production environment it might make sense to
                  // also report information about errors back to the
                  // application server.
                  console.error(error);
                  setError(error)
                }
              );
        })
        .catch((err)=>{
            console.error(err)
            setError(err)
        })
    },[applicationServerKey])
    return [config, error]
}