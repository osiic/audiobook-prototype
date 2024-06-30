import { db } from "./firebase";
import { doc, getDoc, DocumentSnapshot } from "firebase/firestore";
import { chapterTypes } from "@/interface/chapterTypes";

export async function getChapter(slug: string): Promise<false | chapterTypes> {
  const docRef = doc(db, "chapters", slug);

  try {
    const docSnapshot: DocumentSnapshot = await getDoc(docRef);

    // Pastikan dokumen ada sebelum mengakses datanya
    if (docSnapshot.exists()) {
      const chapterData: chapterTypes = {
        slug: docSnapshot.id,
        ...docSnapshot.data() as chapterTypes // Konversi tipe data jika diperlukan
      };
      return chapterData;
    } else {
      console.log(`Chapter with slug '${slug}' not found.`);
      return false;
    }
  } catch (error) {
    console.error("Error fetching chapter:", error);
    return false;
  }
}

