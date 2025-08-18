'use client';

import { useEffect, useState } from 'react';

export default function DynamicHeadline() {
    const enWords = ['worshiping', 'serving'];
    const krWords = ['예배하는', '섬기는'];

    const [enIndex, setEnIndex] = useState(0);
    const [krIndex, setKrIndex] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            setEnIndex((i) => (i + 1) % enWords.length);
            setKrIndex((i) => (i + 1) % krWords.length);
        }, 2500);
        return () => clearInterval(id);
    }, []);

    return (
        <section className="headline">
            <h2 className="headline-korean">
                우리는 하나님의 이야기에<br />
                <span className="headline-dynamic">{krWords[krIndex]}</span> 공동체입니다.
            </h2>

            <h2>
                <span className="headline-static">We are a</span>
                <span className="headline-dynamic">{enWords[enIndex]} </span><br />
                <span className="headline-static">community devoted to God&apos;s STORY.</span>
            </h2>
        </section>
    );
}