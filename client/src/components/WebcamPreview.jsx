import React, { useEffect, useRef, useState } from 'react';
import { Camera, CameraOff, AlertTriangle } from 'lucide-react';

export default function WebcamPreview({ isActive, onPermissionError, className = "" }) {
    const videoRef = useRef(null);
    const streamRef = useRef(null);
    const [hasPermission, setHasPermission] = useState(null);

    useEffect(() => {
        let mounted = true;

        const startCamera = async () => {
            try {
                if (isActive && !streamRef.current) {
                    const stream = await navigator.mediaDevices.getUserMedia({
                        video: { width: 320, height: 240, facingMode: 'user' },
                        audio: false
                    });

                    if (mounted) {
                        streamRef.current = stream;
                        if (videoRef.current) {
                            videoRef.current.srcObject = stream;
                        }
                        setHasPermission(true);
                    }
                }
            } catch (err) {
                console.error("Camera Error:", err);
                if (mounted) {
                    setHasPermission(false);
                    if (onPermissionError) onPermissionError(err);
                }
            }
        };

        const stopCamera = () => {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
                streamRef.current = null;
            }
        };

        if (isActive) {
            startCamera();
        } else {
            stopCamera();
        }

        return () => {
            mounted = false;
            stopCamera();
        };
    }, [isActive, onPermissionError]);

    if (!isActive) return null;

    return (
        <div className={`bg-gray-900 rounded-xl shadow-2xl overflow-hidden border-2 border-indigo-500 relative transition-all ${className}`}>
            {hasPermission === false ? (
                <div className="flex flex-col items-center justify-center h-full text-red-400 p-2 text-center bg-gray-800">
                    <CameraOff size={24} className="mb-2" />
                    <span className="text-xs font-bold">Camera Blocked</span>
                </div>
            ) : (
                <>
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-full object-cover transform -scale-x-100"
                    />
                    <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/50 px-2 py-0.5 rounded text-[10px] text-white backdrop-blur-sm">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        REC
                    </div>
                </>
            )}
        </div>
    );
}
