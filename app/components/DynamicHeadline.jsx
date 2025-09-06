'use client';

import { useEffect, useRef, useState } from 'react';

export default function DynamicHeadline() {
    const krWords = ['예배하는', '감사하는', '삶으로 예수를 증거하는'];
    const [krIndex, setKrIndex] = useState(0);
    const krTimer = useRef(null);

    useEffect(() => {
        krTimer.current = setInterval(() => {
            setKrIndex((i) => (i + 1) % krWords.length);
        }, 2500);
        return () => clearInterval(krTimer.current);
    }, []);

    return (
        <section className="headline">
            <h2 className="headline-korean text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                '우리는 하나님의
                <span className="insertion">
                <span className="tick">✓</span>
                <span className="above">써가시는</span>
                </span>
                스토리' 안에서
                <br />
                <span className="kr-rotator" key={krIndex}>
    {krWords[krIndex]}
  </span>
                &nbsp;공동체입니다.
            </h2>
        </section>
    );
}