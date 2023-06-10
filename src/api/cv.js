import { db } from "@/firebase"
import { addDoc, collection, doc, getDocs, orderBy, query, updateDoc, where } from "firebase/firestore"

const cvCollection = collection(db, "coverletter");

export const getCV = async (jobId) => {
    const q = query(
        cvCollection, 
        where("jobId", "==", jobId)
    );

    const results = await getDocs(q);

    const res = results.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    }));

    return res;
}

export const createCV = async ( data ) => {
    const { question, answer, jobId } = data;

    const docRef = await addDoc(cvCollection, {
        question,
        answer,
        jobId,
      });

    return docRef;
}

export const updateCV = async (data) => {
    const cvDoc = doc(cvCollection, data.id);
    const res = await updateDoc(cvDoc, {
        question: data.question,
        answer: data.answer,
    });

    console.log(res);
}

export const deleteCV = async (data) => {
    const cvDoc = doc(cvCollection, data.id);
    await deleteDoc(cvDoc);
}