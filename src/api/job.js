import { db } from "@/firebase";
import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";

const jobsCollection = collection(db, "jobs");

export const getJobs = async (userId) => {

  const q = query(jobsCollection, where("userId", "==", userId));
  const results = await getDocs(q);

  if (!results.empty) {
    const res = results.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return res
  } else {
    return []
  }
};

export const getJob = async (jobId) => {
  const jobDoc = await doc(jobsCollection, jobId);
  const result = await getDoc(jobDoc);
  
  return result.data();
}

export const createJob = async (newJob) => {
  const jobsCollection = collection(db, "jobs");
  const jobDocRef = await addDoc(jobsCollection, newJob)
  return jobDocRef.id

};

export const updateJob = async (data) => {
  console.log(data);
  const jobDoc = await doc(jobsCollection, data.id);
  await updateDoc(jobDoc, {
        overall: data.overall,
        rating: data.rating,
    });
};

export const deleteJob = () => {};
