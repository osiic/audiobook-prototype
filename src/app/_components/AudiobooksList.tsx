
import Link from "next/link";
import Image from 'next/image'

import { audiobookTypes } from "@/interface/audiobookTypes";

export function AudiobooksList({audiobooks} : {audiobooks: audiobookTypes[] }) {
  return (
      <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 w-full">
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

  )

}
