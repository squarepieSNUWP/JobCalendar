import { db } from "@/firebase";
import { addDoc, collection, doc, getDocs, query } from "firebase/firestore";

export default async function handler(req, res) {
  console.log(req.body);
  if (req.method == "POST") {
    const interviewCollection = collection(db, "interview_collection");
    const q = query(interviewCollection);
    const docRef = await addDoc(interviewCollection, JSON.parse(req.body));
    res.status(200).json("등록 완료");
  }
  
    
    
   
  
  // const interviewCollection = collection(db, "interview_collection")
  // const q = query(interviewCollection)
  // const results = await getDocs(q)
  // const posts = []
  // results.docs.forEach((doc) => {
  //   posts.push({id: doc.id, ...doc.data()})
  // })

  
}