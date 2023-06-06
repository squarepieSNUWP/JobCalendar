import { db } from "@/firebase";
import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions)
  const userId = session.user.id;


  if (req.method == "POST") {
    if (JSON.parse(req.body).type == "paper") {
      const paperCollection = collection(db, "paper_collection");
      const docRef = await addDoc(paperCollection, JSON.parse(req.body));

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

      res.status(200).json(docRef.id);


    } else if (JSON.parse(req.body).type == "interview") {
      const interviewCollection = collection(db, "interview_collection");
      const docRef = await addDoc(interviewCollection, JSON.parse(req.body));

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


      res.status(200).json(docRef.id);
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