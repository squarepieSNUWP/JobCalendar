import { auth, storage } from "../../firebase/index";
import { db } from "@/firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import {
  collection,
  doc,
  query,
  where,
  setDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

// 마이페이지 pdf 관련 api들

//pdf 업로드
export async function uploadPdf(file, filetype, user_id) {
  // 업로드를 시도하는 파일의 확장자가 pdf가 아니면 에러를 반환하고 함수 종료
  if (file.type !== "application/pdf") {
    console.error("Invalid file type. Only PDF files are allowed.");
    throw new Error("Invalid file type");
  }

  //file collection, user collection에 대한 참조 설정
  const filesCollectionRef = collection(db, "files_collection");
  const userCollectionRef = collection(db, "users_collection");

  const querySnapshot = await getDocs(filesCollectionRef);
  const numFiles = querySnapshot.size;

  //입력 받은 user_id를 바탕으로 user_collection에서 쿼리해 옴
  const userQ = query(userCollectionRef, where("id", "==", user_id));

  const storage = getStorage();
  const storageRef = ref(storage, `user_${user_id}/${file.name}`);

  const uploadTask = uploadBytesResumable(storageRef, file);

  // pdf의 업로드 상태를 확인하는 부분 (나중에 삭제될 테스트 코드)
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
      }
    },
    (error) => {
      switch (error.code) {
        case "storage/unauthorized":
          console.error("Unauthorized access to storage.");
          break;
        case "storage/unknown":
          console.error("Unknown storage error.");
          break;
      }
    },
    async () => {
      try {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        console.log("File download URL:", downloadURL);

        const newFileRef = {
          id: numFiles + 1,
          url: downloadURL,
          type: filetype,
        };

        const newDocRef = doc(filesCollectionRef, `${numFiles + 1}`);
        await setDoc(newDocRef, newFileRef);
        const userSnapshot = await getDocs(userQ);
        const userDoc = userSnapshot.docs[0];
        const userData = userDoc.data();

        if (!userData.files) {
          userData.files = [];
        }

        userData.files.push(newFileRef.id);
        await updateDoc(userDoc.ref, userData);
      } catch (error) {
        console.error("Error while uploading file to db: ", error);
      }
    }
  );
}

//userId에 대응되는 모든 pdf 파일을 불러오는 함수
//file에 대한 정보 {name: 문서명, type: 문서 타입 url: 파일로 이어지는 url} 객체가 배열에 담겨서 반환됨
export const getUserPdf = async (userId) => {
  try {
    const filesCollectionRef = collection(db, "files_collection");
    const userCollectionRef = collection(db, "users_collection");

    const userQ = query(userCollectionRef, where("id", "==", userId));
    const userSnapshot = await getDocs(userQ);
    const userDoc = userSnapshot.docs[0];

    const userFilesId = userDoc.data().files;
    // console.log("userFiles", userFilesId);

    // const fileQ = query(filesCollectionRef, where("id", "==", "files"));
    const fileQ = query(filesCollectionRef, where("id", "in", userFilesId));
    const fileSnapshot = await getDocs(fileQ);

    const userFiles = [];

    fileSnapshot.forEach((fileDoc) => {
      userFiles.push(fileDoc.data());
    });

    // console.log("userFileArray", userFiles);
    return userFiles;
  } catch (error) {
    console.error("error while getting pdf files", error.message);
  }
};

//pdf 삭제 담당 함수
//삭제는 db에서만 이루어지고 storage의 것들은 그대로 있음
export async function deletePdf(fileId, userId) {
  try {
    const filesCollectionRef = collection(db, "files_collection");
    const userCollectionRef = collection(db, "users_collection");

    const userQ = query(userCollectionRef, where("id", "==", userId));
    const userSnapshot = await getDocs(userQ);
    const userDoc = userSnapshot.docs[0];

    //유저가 올렸던 파일 정보들
    const userFilesId = userDoc.data().files;

    const fileQ = query(filesCollectionRef, where("id", "==", fileId));
    const fileSnapshot = await getDocs(fileQ);
    const targetFile = fileSnapshot.docs[0];

    //지울 파일의 id
    const targetFileId = targetFile.id;
    const updatedUserFilesId = userFilesId.filter((id) => id !== targetFileId);

    //users_collection에서 해당 문서의 files 필드를 업데이트
    const userDocRef = doc(userCollectionRef, userDoc.id);
    await updateDoc(userDocRef, {
      files: updatedUserFilesId,
    });

    await deleteDoc(doc(filesCollectionRef, targetFileId));
  } catch (error) {
    console.log("error while deleting file", error.message);
  }
}

// 태그 관련 api
export async function addTag(userId, tagContent, color) {
  const tagCollectionRef = collection(db, "tags_collection");

  const userRef = doc(db, "users_collection", `${userId}`);
  const userDoc = await getDoc(userRef);
  const userData = userDoc.data();

  if (!userData.tags) {
    userData.tags = [];
  }

  const querySnapshot = await getDocs(tagCollectionRef);
  const numData = querySnapshot.size;

  const newSet = {
    id: numData + 1,
    title: tagContent,
    color: color,
  };

  const newDocRef = doc(tagCollectionRef, `${numData + 1}`);
  await setDoc(newDocRef, newSet);

  userData.tags.push(newSet.id);
  await updateDoc(userDoc.ref, userData);
}

export async function getTags(userId) {
  const tagCollectionRef = collection(db, "tags_collection");

  const userRef = doc(db, "users_collection", `${userId}`);
  const userDoc = await getDoc(userRef);
  const userData = userDoc.data();

  if (!userData.tags) {
    return [];
  }

  const userTags = await userData.tags;

  const tagQ = query(tagCollectionRef, where("id", "in", userTags));
  const tagSnapshot = await getDocs(tagQ);

  const tagsArr = [];

  tagSnapshot.forEach((tagDoc) => {
    tagsArr.push(tagDoc.data());
  });

  return tagsArr;
}
