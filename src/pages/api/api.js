import { auth, db, storage } from "../../firebase/index";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  deleteObject,
  listAll,
  getDownloadURL,
} from "firebase/storage";

// pdf 관련 api들
// 파일이 업로드된 게 이미 있으면 못 올리게 하는 것도 서버에서 구현을 해야 함ㅠㅠ

/*
pdf가 저장되는 파일구조

user_id
  ㄴ company1
      ㄴ resume
          ㄴ resume.pdf
      ㄴ coverLetter
          ㄴ coverLetter.pdf
      ㄴ portfolio
          ㄴ portfolio.pdf
  ㄴ company2
      ㄴ resume
          ㄴ resume.pdf
      ㄴ coverLetter
          ㄴ coverLetter.pdf
      ㄴ portfolio
          ㄴ portfolio.pdf
...

*/

//pdf 업로드
export async function uploadPdf(file, filetype, user_id) {
  // 업로드를 시도하는 파일의 확장자가 pdf가 아니면 에러를 반환하고 함수 종료
  if (file.type !== "application/pdf") {
    console.error(
      "Invalid file type. Only PDF files are allowed. Error code: 406"
    );
    throw new Error("Invalid file type");
  }

  //참조 만들기 - 파일이 저장되는 곳 (ex. 1번 user가 이력서를 올릴 경우 -> user_1/resume/resume.pdf)
  const storage = getStorage();
  const storageRef = ref(storage, `user_${user_id}/${filetype}/${file.name}`);

  const uploadTask = uploadBytesResumable(storageRef, file);

  // pdf의 업로드 상태를 확인하는 부분
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
    }
  );
}

//pdf 삭제 담당 함수
export async function deletePdf(deleteObj, fileType, userId) {
  try {
    const storage = getStorage();
    const deleteRef = ref(
      storage,
      `user_${userId}/${fileType}/${deleteObj.name}`
    );

    await deleteObject(deleteRef);

    console.log("file delete success");
  } catch (error) {
    switch (error.code) {
      case "storage/object-not-found":
        console.error("No file to delete.");
        break;
      case "storage/unauthorized":
        console.error("Unauthorized access to storage.");
        break;
      default:
        console.error("Unknown error.");
        break;
    }
  }
}

//userId에 대응되는 모든 pdf 파일을 재귀적으로 불러오는 함수
//file에 대한 정보 {name: 문서명, url: 파일로 이어지는 url} 객체가 배열에 담겨서 반환됨
export async function getPdf(userId) {
  const storage = getStorage();
  const userStorageRef = ref(storage, `user_${userId}`);

  const files = await getAllPdfFiles(userStorageRef);
  return files;
}

//재귀호출 함수
const getAllPdfFiles = async (folderRef, parentFolder = "") => {
  try {
    const result = await listAll(folderRef);
    const files = [];

    for (const itemRef of result.items) {
      const itemName = itemRef.name;
      const itemUrl = await getDownloadURL(itemRef);

      if (itemName.toLowerCase().endsWith(".pdf")) {
        const fileType = parentFolder;

        files.push({
          name: itemName,
          url: itemUrl,
          fileType: fileType,
        });
      }
    }

    for (const prefixRef of result.prefixes) {
      const subFolderName = getFolderName(prefixRef);
      const subFiles = await getAllPdfFiles(prefixRef, subFolderName);
      files.push(...subFiles);
    }

    console.log(files);

    return files;
  } catch (error) {
    console.error(
      "An error occurred while retrieving PDF files",
      error.message
    );
    return [];
  }
};

// 도우미함수 - 경로에서 폴더명만 추출하는 함수
const getFolderName = (folderRef) => {
  const parts = folderRef.fullPath.split("/");
  return parts[parts.length - 1];
};
