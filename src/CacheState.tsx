import { useReducer, useEffect } from "react";
import { useApolloClient } from "@apollo/client/react";

export function CacheState() {
    const [, forceUpdate] = useReducer((x) => x + 1, 0);

    useEffect(() => {
        // client.extract() will not receive updates.
        // Awkwardly rerender this component every 100ms.
        const interval = setInterval(forceUpdate, 100);
        return () => clearInterval(interval);
    }, []);

    const client = useApolloClient();
    const cacheState = client.extract();
    return <pre style={{ width: '100%', overflowX: 'auto', textAlign: 'left' }} className="text-sm mt-2">{JSON.stringify(cacheState, null, 2)}</pre>;
}
