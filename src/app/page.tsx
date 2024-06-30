"use client"

import Link from "next/link";
import { useState, useEffect } from 'react';
import { getAudiobooks } from '@/lib/getAudiobooks';
import { audiobookTypes } from "@/interface/audiobookTypes";

export default function Home() {
  const [audiobooks, setAudiobooks] = useState<audiobookTypes[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAudiobooks();
        setAudiobooks(data);
      } catch (error) {
        console.error('Error fetching audiobooks: ', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  return (
    <main className="w-screen max-w-screen-md mx-auto my-10 px-[7%]">
      <h1 className="font-medium font-4xl underline decoration-green-300 mb-3">Audiobooks <span className="text-green-900">{audiobooks.length}</span></h1>
      <ul>
        {audiobooks.map((book, index) => (
          <Link key={index} href={`/${book.slug}`} className="w-full h-full">
            <li className="border border-black rounded py-1 w-full mb-2 px-3 hover:bg-green-400/80 duration-200">
              {book.name}
            </li>
          </Link>
        ))}
      </ul>
    </main>
  );
}

