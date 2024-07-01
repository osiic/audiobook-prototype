"use client"
import Image from "next/image"
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
      <h1 className="font-medium text-xl underline decoration-green-300 mb-2">Audiobooks <span className="text-green-90">ongoing</span></h1>

      <div className="flex gap-4">
        <div className="overflow-hidden w-full aspect-[3/4] w-1/3 ">
          <Image width={200} height={200} src={book?.image as string} alt="banner" className="object-fit w-full h-full bg-red-200 rounded text-grey-200" />
        </div>
        <div className="flex flex-col">
          <h2 className="underline -ml-1 font-medium decoration-green-500">Detail Book</h2>
          <span>ID: {book?.id}</span>
          <span>Name: {book?.name}</span>
          <span>Delete: {book?.delete ? 'Yes' : 'No'}</span>
        </div>
      </div>

      {
        book?.id && (
          <Chapters id={+book?.id} />
        )
      }
    </main>
  );
}

