import React from 'react';

const ProgressIndicator = ({ current, total }) => {
    // Ensure current doesn't exceed total for visual consistency
    const safeCurrent = Math.min(current, total);
    const progressPercentage = (safeCurrent / total) * 100;

    return (
        <div className="w-full max-w-xs flex flex-col gap-1">
            <div className="flex justify-between text-xs font-semibold text-gray-500 uppercase tracking-wide">
                <span>Progress</span>
                <span>Question {safeCurrent} of {total}</span>
            </div>
            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div
                    className="h-full bg-indigo-600 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progressPercentage}%` }}
                ></div>
            </div>
        </div>
    );
};

export default ProgressIndicator;
