import { db } from "@/firebase";
import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";

const applyCollection = collection(db, "apply");

export const getApplies = async (jobIds) => {
  if (jobIds.length <= 0) {
    return
  }
  const q = query(applyCollection, where("jobId", "in", jobIds));
  const results = await getDocs(q);

  const res = results.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));
  
  return res
};

export const createApply = async (newApply) => {

  const applyDocRef = await addDoc(applyCollection, newApply)
  return applyDocRef.id
};

export const updateApply = () => {};

export const deleteApply = () => {};
