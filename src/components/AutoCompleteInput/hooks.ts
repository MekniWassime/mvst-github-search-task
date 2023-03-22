import { useEffect } from "react";
/**
 * A hook that calls a callback function if the user clicks outside the referenced element
 * @param ref the reference of the element
 * @param callback a function called if the user clicks outside the referenced element
 */
export const useClickedOutside = (ref: React.MutableRefObject<null>, callback: () => void) => {
    /**Checks if the user clicked outside the element referenced by `ref` */
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