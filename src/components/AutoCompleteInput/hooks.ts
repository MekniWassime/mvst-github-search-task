import { useEffect } from "react";

export const useClickedOutside = (ref: React.MutableRefObject<null>, callback: () => void) => {
    const handleClickOutside = (event: any) => {
        if (ref.current && !(ref.current as any).contains(event.target)) {
            callback()
        }
    }

    useEffect(() => {
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}