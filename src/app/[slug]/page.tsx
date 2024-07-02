"use client"

import { useState, useEffect } from 'react';
import { getAudiobook } from '@/lib/getAudiobook';
import { audiobookTypes } from '@/interface/audiobookTypes';

import { AudiobookHeader } from "./_components/AudiobookHeader"
import { AudiobookDetail } from "./_components/AudiobookDetail"
import { AudiobookChapters } from "./_components/AudiobookChapters"

export default function Book({ params }: { params: { slug: string } }) {
  const [book, setBook] = useState<audiobookTypes>();

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
    <main className="w-screen max-w-screen-md mx-auto my-5 px-[7%]">
      {book ? (
        <>
          <AudiobookHeader />
<AudiobookDetail book={book} />
          <AudiobookChapters id={+book?.id} slug={params?.slug} />
        </>
      ) : (<h1>Loading..</h1>)}
    </main>
  );
}

