import { storage } from "../firebase/index";
import { db } from "@/firebase";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import { collection, query, where, getDocs, addDoc } from "firebase/firestore";

//해당 job과 연결된 파일 정보 가져오기
export async function getFiles(jobId) {
  const filesCollectionRef = collection(db, "files");

  const q = query(filesCollectionRef, where("jobId", "==", jobId));
  const fileSnapshot = await getDocs(q);

  if (fileSnapshot.empty) {
    console.log("no files");
    return [];
  }

  const jobFiles = [];

  fileSnapshot.forEach((doc) => {
    const fileData = doc.data();
    const fileModel = {
      id: doc.id,
      fileUrl: fileData.fileUrl,
      title: fileData.title,
      fileType: fileData.fileType,
    };
    jobFiles.push(fileModel);
  });

  return jobFiles;
}

//유저가 올린 모든 파일 정보 가져오기
export async function getMyFiles(userId) {
  const filesCollectionRef = collection(db, "files");

  const q = query(filesCollectionRef, where("userId", "==", userId));
  const fileSnapshot = await getDocs(q);

  if (fileSnapshot.empty) {
    console.log("no files");
    return [];
  }

  const userFiles = [];

  fileSnapshot.forEach((doc) => {
    const fileData = doc.data();
    const fileModel = {
      id: doc.id,
      fileUrl: fileData.fileUrl,
      title: fileData.title,
      fileType: fileData.fileType,
    };
    userFiles.push(fileModel);
  });

  console.log("userFiles", userFiles);
  return userFiles;
}

//파일 업로드 함수
export async function createFile(req) {
  const { file, title, userId, fileType } = req;
  if (file.type !== "application/pdf") {
    throw new Error("Invalid file type. Please try uploading pdf files");
  }

  const filesCollectionRef = collection(db, "files");

  const storage = getStorage();
  const storageRef = ref(storage, `user_${userId}/${file.name}`);

  const uploadTask = uploadBytesResumable(storageRef, file);

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

        const newFile = {
          fileUrl: downloadURL,
          title: title,
          userId: userId,
          fileType: fileType,
          jobId: [],
        };

        const docRef = await addDoc(filesCollectionRef, newFile);
        console.log("new tag doc id:", docRef.id);
        return docRef;
      } catch (error) {
        console.error("Error while uploading file to db: ", error.message);
      }
    }
  );
}

export async function deleteFile(req) {}

export async function updateFile(fileId) {}
