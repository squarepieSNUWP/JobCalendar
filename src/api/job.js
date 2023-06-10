import { db } from "@/firebase";
import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";

const jobsCollection = collection(db, "jobs");

export const getJobs = async (userId) => {
  
  const q = query(jobsCollection, where("userId", "==", userId));
  const results = await getDocs(q);

  const res = results.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));

  return res;
};

export const createJob = async (newJob) => {
  const jobsCollection = collection(db, "jobs");
  const jobDocRef = await addDoc(jobsCollection, newJob)
  return jobDocRef.id


  // if (JSON.parse(req.body).type == "paper") {
  //   const jobCollection = collection(db, "jobs");
  //   const jobDocRef = await addDoc(jobCollection, {
  //     paperDate: JSON.parse(req.body).date,
  //     interviewDate: "",
  //     company: JSON.parse(req.body).company,
  //     job: JSON.parse(req.body).job,
  //     postLink: JSON.parse(req.body).postLink,
  //     files: { resume: [], portfolio: [] },
  //     coverLetters: [],
  //     reviews: [],
  //     overall: "",
  //     rating: "",
  //   });

  //   const paperData = {
  //     ...JSON.parse(req.body),
  //     jobId: jobDocRef.id, // jobId를 생성된 doc의 id로 설정
  //   };

  //   const paperCollection = collection(db, "paper_collection");
  //   const docRef = await addDoc(paperCollection, paperData);

  //   const usersCollection = collection(db, "users_collection")
  //   const userQuery = query(usersCollection, where("id", "==", userId));
  //   const userSnapshot = await getDocs(userQuery);

  //   if (!userSnapshot.empty) {
  //     const userDoc = userSnapshot.docs[0];
  //     const userDocRef = doc(db, "users_collection", userDoc.id);

  //     const currentPapers = userDoc.data().papers || [];
  //     await updateDoc(userDocRef, {
  //       papers: [...currentPapers, docRef.id],
  //     });
  //   }
  // }

};

export const updateJob = () => {};

export const deleteJob = () => {};
