import { useEffect, useRef, useState } from "react";

function useElementOnScreen(options: IntersectionObserverInit): [React.RefObject<null>, boolean] {
    const containerRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    const callbackFunction = (entries: IntersectionObserverEntry[]) => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);
    }

    useEffect(() => {
        const observer = new IntersectionObserver(callbackFunction, options);
        if (containerRef.current) observer.observe(containerRef.current);

        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            if (containerRef.current) observer.unobserve(containerRef.current);
        }
    }, [containerRef, options]);

    return [containerRef, isVisible];
}

export default useElementOnScreen;
