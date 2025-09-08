'use client';

import { useEffect, useRef, useState } from 'react';
import { Gamja_Flower } from 'next/font/google';
import styles from './DynamicHeadline.module.css';

// single weight (400). Gamja Flower supports Korean.
const gamja = Gamja_Flower({
    weight: '400',
    subsets: ['latin'],
    display: 'swap',
});

export default function DynamicHeadline() {
    const krWords = ['예배하는', '감사하는', '삶으로 예수를 증거하는'];
    const [krIndex, setKrIndex] = useState(0);
    const krTimer = useRef(null);

    useEffect(() => {
        krTimer.current = setInterval(() => {
            setKrIndex(i => (i + 1) % krWords.length);
        }, 2500);
        return () => clearInterval(krTimer.current);
    }, []);

    return (
        <section className="headline">
            <h2 className="headline-korean text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                우리는 '하나님의
                <span className={styles.insertion}>
          <span className={styles.tick}>✓</span>
                    {/* apply the handwriting font + your positioning */}
                    <span className={`${styles.above} ${gamja.className}`}>써가시는</span>
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