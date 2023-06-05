import { db } from "@/firebase";
import { addDoc, collection, doc, getDocs, query } from "firebase/firestore";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  let session = await getServerSession(req, res, authOptions)
  console.log(session)
  res.status(200).json('hi')
  // console.log(req.body);
  // if (req.method == "POST") {
  //   if (JSON.parse(req.body).type == "paper") {
  //     const paperCollection = collection(db, "paper_collection");
  //     const q = query(paperCollection);
  //     const docRef = await addDoc(paperCollection, JSON.parse(req.body));
  //     res.status(200).json("서류 마감 일정 등록 완료");

  //   } else if (JSON.parse(req.body).type == "interview") {
  //     const interviewCollection = collection(db, "interview_collection");
  //     const q = query(interviewCollection);
  //     const docRef = await addDoc(interviewCollection, JSON.parse(req.body));
  //     res.status(200).json("면접 일정 등록 완료");
  //   }

    
  // }
  
    
    
   
  
  // const interviewCollection = collection(db, "interview_collection")
  // const q = query(interviewCollection)
  // const results = await getDocs(q)
  // const posts = []
  // results.docs.forEach((doc) => {
  //   posts.push({id: doc.id, ...doc.data()})
  // })

  
}