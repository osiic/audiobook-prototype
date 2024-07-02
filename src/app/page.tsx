"use client"

import { useState, useEffect } from 'react';
import { getAudiobooks } from '@/lib/getAudiobooks';
import { audiobookTypes } from "@/interface/audiobookTypes";

import { AudiobooksHeader } from "./_components/AudiobooksHeader";
import { AudiobooksList } from "./_components/AudiobooksList"

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
  }, []);

  return (
    <main className="w-screen max-w-screen-md mx-auto my-10 px-[7%]">
      {audiobooks.length != 0 ? (
        <>
          <AudiobooksHeader />
          <AudiobooksList audiobooks={audiobooks} />
        </>
      ) : (<h1>Loading...</h1>)}
    </main>
  );
}

