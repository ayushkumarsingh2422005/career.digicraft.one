"use client";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
    return (
        <button
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
            onClick={() => signOut({ callbackUrl: "/login" })}
        >
            Logout
        </button>
    );
}
