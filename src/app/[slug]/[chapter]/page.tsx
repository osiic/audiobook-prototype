"use client"

import { detailChTypes } from "@/interface/detailChTypes"

import { useState, useEffect } from 'react';
import { getChapter } from '@/lib/getChapter';
import { chapterTypes } from '@/interface/chapterTypes'

import { ChapterHeader } from "./_components/ChapterHeader"
import { ChapterAudio } from "./_components/ChapterAudio"
import { ChapterScript } from "./_components/ChapterScript"
import { ChapterControl } from "./_components/ChapterControl"

export default function ChapterPage({ params }: { params: { chapter: string } }) {
  const [chapter, setChapter] = useState<chapterTypes | false>(false); // Gunakan tipe data yang sesuai dengan struktur chapter
  const [detailCh, setDetailCh] = useState<detailChTypes | false>(false)
  const [availableCh, setAvailableCh] = useState<false | true>(true)

  useEffect(() => {
    const fetchChapter = async () => {
      try {
        const chapterData = await getChapter(params?.chapter);
        const chapterArray = params?.chapter.split("-") // ["the", "one", "1"]
        const chapterNumber = parseInt(chapterArray[chapterArray.length - 1]) // last index array "1" to 1
        chapterArray.pop() // remove last array ["rhe", "one"]
        const chapterNow = chapterArray.join("-") // join ["the","one"] to "the-one"

        setDetailCh({
          slug: chapterNow,
          ch: chapterNumber
        })

        if (!chapterData) {
          setAvailableCh(false)
        }

        setChapter(chapterData);
      } catch (error) {
        console.error('Error fetching chapter:', error);
      }
    };

    if (params?.chapter) {
      fetchChapter();
    }
  }, [params?.chapter]);

  if (!availableCh) {
    return (<h1 className="text-center">Ongoing Chapter</h1>)
  }

  return (
    <main className="w-screen max-w-screen-lg mx-auto my-10 px-[7%]">
      {(chapter && detailCh) ? (
        <>
          <ChapterHeader chapterTitle={chapter?.title} />
          <ChapterAudio chapterAudio={chapter?.audio} />
          <ChapterScript chapterScript={chapter?.script} />
          <ChapterControl detailCh={detailCh} />
        </>
      ) : (<h1>Loading...</h1>)}
    </main>
  );
}

