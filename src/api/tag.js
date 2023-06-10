// import { auth, storage } from "../../firebase/index";
import { db } from "@/firebase";

import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

//개별 review에 달린 태그 정보 가져오기
export async function getTags(reviewId) {
  const tagCollectionRef = collection(db, "tags");

  const q = query(
    tagCollectionRef,
    where("reviewId", "array-contains", reviewId)
  );

  const tagSnapshot = await getDocs(q);

  if (tagSnapshot.empty) {
    console.log("no tag");
    return [];
  }

  const reviewTags = [];
  tagSnapshot.forEach((doc) => {
    const tagData = doc.data();
    const tagModel = {
      id: doc.id,
      color: tagData.color,
      title: tagData.color,
    };
    reviewTags.push(tagModel);
  });

  return userFiles;
}

//유저가 저장한 태그 모두 불러오기
export async function getMyTags(userId) {
  const tagCollectionRef = collection(db, "tags");

  const q = query(tagCollectionRef, where("userId", "==", userId));
  const tagSnapshot = await getDocs(q);

  if (tagSnapshot.empty) {
    console.log("no tag");
    return [];
  }

  const userFiles = [];

  tagSnapshot.forEach((doc) => {
    const tagData = doc.data();
    const tagModel = {
      id: doc.id,
      color: tagData.color,
      title: tagData.title,
      review_id: tagData.review_id,
    };
    userFiles.push(tagModel);
  });

  return userFiles;
}

//새로운 태그 생성하기
export async function createTag(req) {
  const tagCollectionRef = collection(db, "tags");
  const { title, color, userId } = req;

  if (!title) {
    throw new Error("내용을 입력하세요");
  }

  const newTag = {
    title: title,
    color: color,
    userId: userId,
  };

  const docRef = await addDoc(tagCollectionRef, newTag);
  console.log("new tag doc id:", docRef.id);

  return docRef;
}

//태그 삭제하기
export async function deleteTag(req) {
  const tagCollectionRef = collection(db, "tags");
  for (const id of req) {
    const tagDocRef = doc(tagCollectionRef, id);
    await deleteDoc(tagDocRef);
    console.log("Tag deleted:", id);
  }
  console.log("target id", req);
}
