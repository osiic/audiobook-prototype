"use client"

import { useState, useEffect } from 'react';
import { getChapter } from '@/lib/getChapter';

export default function ChapterPage({ params }: { params: { slug: string } }) {
  const [chapter, setChapter] = useState<any>(null); // Gunakan tipe data yang sesuai dengan struktur chapter

  useEffect(() => {
    const fetchChapter = async () => {
      try {
        const chapterData = await getChapter(params?.slug);
        setChapter(chapterData);
        console.log(chapterData)
      } catch (error) {
        console.error('Error fetching chapter:', error);
      }
    };

    if (params?.slug) {
      fetchChapter();
    }
  }, [params?.slug]);

  return (
    <main className="w-screen max-w-screen-lg mx-auto my-10 px-[7%]">
      {chapter ? (
        <>
          <h1 className="font-medium font-5xl text-center underline decoration-green-300 my-10">{chapter?.title}</h1>
<section>
        <iframe width="100%" height="100" allow="autoplay" src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${chapter?.audio}&color=%23b9ff66&auto_play=false&hide_related=false&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false`}></iframe>
      </section>
          <p className="opacity-80 py-5 mb-20">{chapter?.script}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
}

