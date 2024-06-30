import { db } from "./firebase";
import { chapterTypes } from "@/interface/chapterTypes";
import { query, where, collection, getDocs, DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

export async function getChapters(id: number): Promise<chapterTypes[]> {
  try {
    const chapters: chapterTypes[] = [];

    const q = query(collection(db, "chapters"), where("audiobook_id", "==", id));
    // Fetch audiobooks collection
    const querySnapshot = await getDocs(q);

    // Iterate through each document
    querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
      const { id, title, script, delete: deleted } = doc.data();

      // Filter out documents with delete flag set to true
      const data: chapterTypes = { slug: doc.id, id, title, script };
      if (!deleted) {
        chapters.push(data);
      }
    });

    // Sort audiobooks array by id
    chapters.sort((a, b) => a.id - b.id);

    // Log and return the array of audiobooks
    console.log(chapters);
    return chapters;
  } catch (error) {
    console.error("Error fetching audiobooks: ", error);
    throw error; // Re-throw the error for handling elsewhere if needed
  }
}

