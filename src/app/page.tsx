"use client"

import Link from "next/link";
import Image from 'next/image'

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
      <ul className="grid grid-cols-3 gap-4 w-full">
        {audiobooks.map((book, index) => (
          <Link key={index} href={`/${book.slug}`} className="w-full">
            <li className="border border-black rounded p-3 mb-2 hover:bg-green-200/80 hover:shadow-2xl duration-200">
              <div className="overflow-hidden w-full aspect-[3/4] ">
                <Image width={200} height={200} src={book.image} alt="banner" className="object-fit w-full h-full bg-red-200 rounded text-grey-200 aspect-[3/4]" />
              </div>
              <h2 className="text-lg">{book.name}</h2>

            </li>
          </Link>
        ))}
      </ul>
    </main>
  );
}

