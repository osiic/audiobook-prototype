import { db } from "./firebase";
import { audiobookTypes } from "@/interface/audiobookTypes";
import { collection, getDocs, DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

export async function getAudiobooks(): Promise<audiobookTypes[]> {
  try {
    const audiobooks: audiobookTypes[] = [];

    // Fetch audiobooks collection
    const querySnapshot = await getDocs(collection(db, "audiobooks"));

    // Iterate through each document
    querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
      const { id, name, image, delete: deleted } = doc.data();

      // Filter out documents with delete flag set to true
      const data: audiobookTypes = { slug: doc.id, id, name, image };
      if (!deleted) {
        audiobooks.push(data);
      }

    });

    // Sort audiobooks array by id
    audiobooks.sort((a, b) => a.id - b.id);

    // Log and return the array of audiobooks
    console.log(audiobooks);
    return audiobooks;
  } catch (error) {
    console.error("Error fetching audiobooks: ", error);
    throw error; // Re-throw the error for handling elsewhere if needed
  }
}

