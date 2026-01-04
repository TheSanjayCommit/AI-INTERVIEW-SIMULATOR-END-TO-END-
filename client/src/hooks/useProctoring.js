import { useState, useEffect, useCallback } from 'react';

export function useProctoring(isActive, maxViolations = 3, onMaximizeViolations) {
    const [violationCount, setViolationCount] = useState(0);
    const [isWarningVisible, setIsWarningVisible] = useState(false);

    const handleViolation = useCallback(() => {
        if (!isActive) return;

        setViolationCount(prev => {
            const newCount = prev + 1;
            if (newCount >= maxViolations) {
                onMaximizeViolations();
            }
            return newCount;
        });

        setIsWarningVisible(true);
        // Hide warning after 3 seconds
        setTimeout(() => setIsWarningVisible(false), 3000);

    }, [isActive, maxViolations, onMaximizeViolations]);

    useEffect(() => {
        if (!isActive) return;

        const handleVisibilityChange = () => {
            if (document.hidden) {
                handleViolation();
            }
        };

        const handleBlur = () => {
            handleViolation();
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('blur', handleBlur);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('blur', handleBlur);
        };
    }, [isActive, handleViolation]);

    return { violationCount, isWarningVisible };
}
