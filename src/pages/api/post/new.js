import { db } from "@/firebase";
import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions)
  const userId = session.user.id;


  if (req.method == "POST") {
    if (JSON.parse(req.body).type == "paper") {
      const jobCollection = collection(db, "job_collection");
      const jobDocRef = await addDoc(jobCollection, {
        paperDate: JSON.parse(req.body).date,
        interviewDate: "",
        company: JSON.parse(req.body).company,
        job: JSON.parse(req.body).job,
        postLink: JSON.parse(req.body).postLink,
        files: { resume: [], portfolio: [] },
        coverLetters: [],
        reviews: [],
        overall: "",
        rating: "",
      });

      const paperData = {
        ...JSON.parse(req.body),
        jobId: jobDocRef.id, // jobId를 생성된 doc의 id로 설정
      };

      const paperCollection = collection(db, "paper_collection");
      const docRef = await addDoc(paperCollection, paperData);

      const usersCollection = collection(db, "users_collection")
      const userQuery = query(usersCollection, where("id", "==", userId));
      const userSnapshot = await getDocs(userQuery);

      if (!userSnapshot.empty) {
        const userDoc = userSnapshot.docs[0];
        const userDocRef = doc(db, "users_collection", userDoc.id);

        const currentPapers = userDoc.data().papers || [];
        await updateDoc(userDocRef, {
          papers: [...currentPapers, docRef.id],
        });
      }

      res.status(200).json({docId: docRef.id, jobId: jobDocRef.id});


    } else if (JSON.parse(req.body).type == "interview") {
      const jobCollection = collection(db, "job_collection");
      let jobDocRef;

      if (JSON.parse(req.body).jobId) {
        jobDocRef = doc(jobCollection, JSON.parse(req.body).jobId);
        await updateDoc(jobDocRef, {
          interviewDate: JSON.parse(req.body).date
        });
        
      } else {
        // jobId가 존재하지 않는 경우, 새로운 jobCollection 문서 생성
        jobDocRef = await addDoc(jobCollection, {
          paperDate: "",
          interviewDate: JSON.parse(req.body).date,
          company: JSON.parse(req.body).company,
          job: JSON.parse(req.body).job,
          postLink: JSON.parse(req.body).postLink,
          files: { resume: [], portfolio: [] },
          coverLetters: [],
          reviews: [],
          overall: "",
          rating: "",
        });
      }

      const interviewData = {
        ...JSON.parse(req.body),
        jobId: JSON.parse(req.body).jobId || jobDocRef.id,
      };

      const interviewCollection = collection(db, "interview_collection");
      const docRef = await addDoc(interviewCollection, interviewData);

      const usersCollection = collection(db, "users_collection");
      const userQuery = query(usersCollection, where("id", "==", userId));
      const userSnapshot = await getDocs(userQuery);

      if (!userSnapshot.empty) {
        const userDoc = userSnapshot.docs[0];
        const userDocRef = doc(db, "users_collection", userDoc.id);

        const currentInterviews = userDoc.data().interviews || [];
        await updateDoc(userDocRef, {
          interviews: [...currentInterviews, docRef.id],
        });
      }


      let response = { docId: docRef.id };
      if (!JSON.parse(req.body).jobId) {
        response.jobId = jobDocRef.id;
      }

      res.status(200).json(response);
    }

    
  }
  
    
    
   
  
  // const interviewCollection = collection(db, "interview_collection")
  // const q = query(interviewCollection)
  // const results = await getDocs(q)
  // const posts = []
  // results.docs.forEach((doc) => {
  //   posts.push({id: doc.id, ...doc.data()})
  // })

  
}