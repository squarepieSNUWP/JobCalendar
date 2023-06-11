import { db } from "@/firebase"
import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc, where } from "firebase/firestore"
import { addReviewIdToTag } from "./tag";

const reviewCollection = collection(db, "reviews");

export const getReviews = async ( jobId ) => {
    const q = query(
        reviewCollection, 
        where("jobId", "==", jobId),
        orderBy("createdAt", "desc")
    );

    const results = await getDocs(q);

    const res = results.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    }));

    return res;
}

export const createReview = async ( data ) => {
    const { question, answer, jobId, tags } = data;

    const createdAt = new Date().toLocaleDateString();

    const docRef = await addDoc(reviewCollection, {
        question,
        answer,
        jobId,
        createdAt
      });

      addReviewIdToTag(tags, docRef.id)

    return docRef.id;
}

export const updateReview = async (data) => {
    const reviewDoc = doc(reviewCollection, data.id);
    const res = await updateDoc(reviewDoc, {
        question: data.question,
        answer: data.answer,
    });
}

export const deleteReview = async (data) => {
    const reviewDoc = doc(reviewCollection, data.id);
    await deleteDoc(reviewDoc);
}