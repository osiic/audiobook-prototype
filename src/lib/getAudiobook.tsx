import { db } from "./firebase";
import { doc, getDoc, DocumentSnapshot } from "firebase/firestore";
import { audiobookTypes } from "@/interface/audiobookTypes";

export async function getAudiobook(slug: string): Promise<false | audiobookTypes> {
  try {
    const docRef = doc(db, "audiobooks", slug);
    const docSnap: DocumentSnapshot = await getDoc(docRef);

    if (!docSnap.exists()) {
      return false;
    }

    // Menggunakan `as audiobookTypes` untuk memberitahu TypeScript tentang tipe data
    console.log(docSnap.data())
    return docSnap.data() as audiobookTypes;
  } catch (error) {
    console.error("Error fetching audiobook: ", error);
    return false;
  }
}

