
export function ChapterHeader({chapterTitle}:{chapterTitle: string}) {
  
  return (
    <header className="w-full flex justify-between my-10">
      <h1 className="font-medium font-5xl mx-auto text-center underline decoration-green-300">{chapterTitle}</h1>
    </header>
  )
}
