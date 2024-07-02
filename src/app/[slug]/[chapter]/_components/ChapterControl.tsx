
import Link from "next/link"
import { detailChTypes } from "@/interface/detailChTypes"

export function ChapterControl({ detailCh }: { detailCh: detailChTypes }) {

  return (
    <section className="py-5 flex gap-4">
      {detailCh?.ch !== 1 && (
        <Link className="bg-gray-800 text-white px-5 py-2 rounded-md " href={`/${detailCh?.slug}/${detailCh?.slug}-${detailCh.ch - 1}`}>
          <button>Previous</button>
        </Link>
      )}
      <Link className="bg-gray-800 text-white px-5 py-2 rounded-md " href={`/${detailCh?.slug}/${detailCh?.slug}-${detailCh.ch + 1}`}>
        <button>Next</button>
      </Link>
    </section>
  )
}

