"use client";

import { useEffect, useState } from "react";

export default function AnnouncementPopup() {
    const [open, setOpen] = useState(false);
    const [dontShowToday, setDontShowToday] = useState(false);

    useEffect(() => {
        const hiddenUntil = localStorage.getItem("popupHiddenUntil");

        if (!hiddenUntil || Date.now() > Number(hiddenUntil)) {
            setOpen(true);
        }
    }, []);

    function closePopup() {
        if (dontShowToday) {
            const tomorrow = new Date();
            tomorrow.setHours(24, 0, 0, 0);

            localStorage.setItem(
                "popupHiddenUntil",
                String(tomorrow.getTime())
            );
        }

        setOpen(false);
    }

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-4"
            onClick={closePopup}
        >
            <div
                className="relative w-full max-w-lg overflow-hidden rounded-xl bg-white shadow-2xl"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-label="Church announcement"
            >
                <button
                    onClick={closePopup}
                    className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-xl text-white"
                    aria-label="Close popup"
                >
                    ×
                </button>

                <img
                    src="/announcements/church-event.png"
                    alt="Church announcement"
                    className="block h-auto max-h-[75vh] w-full object-contain"
                />

                <div className="flex items-center justify-between gap-3 p-4">
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                        <input
                            type="checkbox"
                            checked={dontShowToday}
                            onChange={(e) => setDontShowToday(e.target.checked)}
                        />
                        Don't show again today
                    </label>

                    <button
                        onClick={closePopup}
                        className="rounded bg-gray-900 px-4 py-2 text-sm text-white"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}