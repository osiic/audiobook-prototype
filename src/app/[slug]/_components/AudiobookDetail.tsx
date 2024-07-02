
import Image from "next/image"
import { audiobookTypes } from "@/interface/audiobookTypes";

export function AudiobookDetail({ book }: { book: audiobookTypes }) {

  return (
    <section className="flex gap-4">
      <div className="overflow-hidden w-full aspect-[3/4] w-4/6 ">
        <Image width={200} height={200} src={book?.image as string} alt="banner" className="object-fit w-full h-full bg-red-200 rounded text-grey-200" />
      </div>
      <div className="flex flex-col">
        <h2 className="underline -ml-1 font-medium decoration-green-500">Detail Book</h2>
        <span>ID: {book?.id}</span>
        <span>Name: {book?.name}</span>
        <span>Delete: {book?.delete ? 'Yes' : 'No'}</span>
      </div>
    </section>

  )
}
