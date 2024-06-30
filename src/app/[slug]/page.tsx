"use client"

import { useState, useEffect } from 'react';
import { Chapters } from "./_components/Chapters"

import { getAudiobook } from '@/lib/getAudiobook';
import { audiobookTypes } from '@/interface/audiobookTypes';

export default function Book({ params }: { params: { slug: string } }) {
  const [book, setBook] = useState<audiobookTypes | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const data = await getAudiobook(params?.slug);
        if (data) {
          setBook(data);
        } else {
          // Handle case where audiobook is not found
          console.error('Audiobook not found.');
        }
      } catch (error) {
        console.error('Error fetching audiobook: ', error);
      }
    };

    fetchBook();
  }, [params?.slug]); // Dependensi params?.slug memastikan useEffect dipanggil ketika slug berubah

  return (
    <main className="w-screen max-w-screen-md mx-auto my-10 px-[7%]">
      <h1 className="font-medium font-4xl underline decoration-green-300 mb-2">Audiobooks <span className="text-green-90">ongoing</span></h1>
      <div className="flex flex-col grid-1">
        <span>ID: {book?.id}</span>
        <span>Name: {book?.name}</span>
        <span>Delete: {book?.delete ? 'Yes' : 'No'}</span>
      </div>

      {
        book?.id && (
          <Chapters id={+book?.id}/>
        )
      }
    </main>
  );
}

