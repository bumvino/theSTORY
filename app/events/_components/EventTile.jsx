'use client';

import Link from 'next/link';
import Image from 'next/image';

/**
 * EventTile Component
 * -------------------
 * Displays a single event card (poster, date badge, title).
 * Used inside /app/events/page.js grid.
 *
 * Props:
 * - href: string → link to event detail (e.g., `/events/ata-oct-2025`)
 * - title: string → event title
 * - dateText: string → preformatted date label (e.g., "2025.10.09")
 * - imageSrc: string → Contentful image URL
 * - imageAlt: string → alt text for accessibility
 */
export default function EventTile({ href, title, dateText, imageSrc, imageAlt }) {
    return (
        <Link
            href={href}
            aria-label={`${title} - ${dateText}`}
            className="group block overflow-hidden rounded-2xl bg-white shadow transition-all duration-300 hover:shadow-lg"
        >
            {/* Poster */}
            <div className="relative h-56 w-full">
                <Image
                    src={imageSrc || '/placeholder.png'}
                    alt={imageAlt || title || 'Event'}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    unoptimized
                />

                {/* Date badge (top-left) */}
                {dateText && (
                    <div className="absolute left-3 top-3 rounded-lg bg-white/90 px-2 py-1 text-xs font-semibold text-gray-800 shadow">
                        {dateText}
                    </div>
                )}
            </div>

            {/* Title */}
            <div className="p-4">
                <h3 className="line-clamp-2 text-lg font-semibold text-gray-900">
                    {title || 'Untitled Event'}
                </h3>
            </div>
        </Link>
    );
}
