"use client";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon, XMarkIcon, PlusIcon } from "@heroicons/react/24/solid";

interface RegisterModalProps {
    isOpen: boolean;
    closeModal: () => void;
    onUserAdded: () => Promise<void>;
}

export default function RegisterModal({ isOpen, closeModal, onUserAdded }: RegisterModalProps) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const resetForm = () => {
        setName("");
        setEmail("");
        setPassword("");
        setError("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();
        if (res.ok) {
            resetForm();
            closeModal();
            await onUserAdded();
        } else {
            setError(data.error || "Registration failed. Please try again.");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50 backdrop-blur-sm">
            <div className="w-full max-w-md m-5 px-8 py-10 bg-[#17181a] border border-white/30 rounded-2xl shadow-xl relative font-poppins">
                <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 text-white hover:text-gray-300 focus:outline-none"
                    aria-label="Close"
                >
                    <XMarkIcon className="w-6 h-6" />
                </button>

                <h2 className="text-3xl font-bold text-center text-white">Add New Member</h2>
                <form onSubmit={handleSubmit} className="flex flex-col mt-6">
                    <label className="text-white mb-1 opacity-90">Name</label>
                    <input
                        type="text"
                        placeholder="Enter name"
                        className="w-full p-3 bg-[#27292af7] text-white border-2 border-white/30 rounded-lg mb-6 focus:outline-none focus:border-blue-500"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <label className="text-white mb-1 opacity-90">E-mail</label>
                    <input
                        type="email"
                        placeholder="Enter e-mail"
                        className="w-full p-3 bg-[#27292af7] text-white border-2 border-white/30 rounded-lg mb-6 focus:outline-none focus:border-blue-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label className="text-white mb-1 opacity-90">Password</label>
                    <div className="relative mb-3">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter password"
                            className="w-full p-3 bg-[#27292af7] text-white border-2 border-white/30 rounded-lg pr-12 focus:outline-none focus:border-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-4 flex items-center text-white font-poppins"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeSlashIcon className="w-6 h-6 text-gray-300" /> : <EyeIcon className="w-6 h-6 text-gray-300" />}
                        </button>
                    </div>

                    {error && <p className="font-poppins text-red-500 text-center mt-3">{error}</p>}

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-poppins font-semibold py-3 rounded-lg text-lg mt-5 flex items-center justify-center gap-2"
                    >
                        <PlusIcon className="w-5 h-5 stroke-white stroke-2 mt-0" />
                        Add Member
                    </button>
                </form>
            </div>
        </div>
    );
}
