import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function RoleSelector({ roles, onSelect }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roles.map((role) => {
                const Icon = role.icon;
                return (
                    <button
                        key={role.id}
                        onClick={() => onSelect(role.id)}
                        className="group relative flex flex-col items-start p-6 bg-gray-50 hover:bg-white border-2 border-transparent hover:border-indigo-600 rounded-xl transition-all duration-300 shadow-sm hover:shadow-xl text-left w-full overflow-hidden"
                    >
                        <div className={`absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity ${role.color}`}>
                            <Icon size={100} />
                        </div>

                        <div className={`p-3 rounded-lg ${role.bg} ${role.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                            <Icon size={24} />
                        </div>

                        <h3 className="text-lg font-bold text-gray-900 mb-2">{role.label}</h3>
                        <p className="text-sm text-gray-500 mb-4">Start specialized mock interview</p>

                        <div className="mt-auto flex items-center text-indigo-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
                            Start Now <ArrowRight size={16} className="ml-2" />
                        </div>
                    </button>
                );
            })}
        </div>
    );
}
