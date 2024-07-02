"use client"

import Link from "next/link";
import { useState, useEffect } from 'react';

import { chapterTypes } from "@/interface/chapterTypes"
import { getChapters } from "@/lib/getChapters"

export function AudiobookChapters({ id, slug }: { id: number, slug: string }) {
  const [chapters, setChapters] = useState<chapterTypes[] | null>([]);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const data = await getChapters(id);
        if (data) {
          setChapters(data);
        } else {
          // Handle case where audiobook is not found
          console.error('Audiobook not found.');
        }
      } catch (error) {
        console.error('Error fetching audiobook: ', error);
      }
    };

    fetchBook();
  }, [id]); // Dependensi params?.slug memastikan useEffect dipanggil ketika slug berubah



  return (
    <div>
      <h1 className="font-medium font-3xl underline decoration-green-300 mt-4 mb-2">Chapter <span className="text-green-90">12</span></h1>
      <ul>
        {(chapters != null && chapters.length != 0) ? chapters.map((chapter: chapterTypes, index: number) => (
          <Link key={index} href={`/${slug}/${chapter?.slug}`} >
            <li className="border border-black rounded py-1 w-full mb-2 px-3 hover:bg-green-400/80 duration-200">
              {++index} - {chapter?.title}
            </li>
          </Link>
        )) : ("have no chapter")}
      </ul>
    </div>
  )
}
