import { addDoc, deleteDoc, doc, getDoc, getDocs, serverTimestamp, setDoc, updateDoc, collection, where } from "firebase/firestore";
import { db } from "./firebase";

// REFERENC DOCS : https://firebase.google.com/docs/firestore/manage-data/add-data

// DATA TYPES EXAMPLES
// const docData = {
//     stringExample: "Hello world!",
//     booleanExample: true,
//     numberExample: 3.14159265,
//     dateExample: Timestamp.fromDate(new Date("December 10, 1815")),
//     arrayExample: [5, true, "hello"],
//     nullExample: null,
//     objectExample: {
//         a: 5,
//         b: {
//             nested: "foo"
//         }
//     }
// };
// await setDoc(doc(db, "data", "one"), docData);


// This is useful when we want to set a document with a specific id 
export const setDocument = (collection, docId, data) => {
  const ref = doc(db, collection, docId);
  return setDoc(ref, {...data,created_at:serverTimestamp(),updated_at:serverTimestamp()});
};

// Adds a document to a collection with an autogenerated id
export const addDocument = (collectionName,data) =>{
  const ref = collection(db,collectionName);
  return addDoc(ref,{...data,created_at:serverTimestamp(),updated_at:serverTimestamp()});
}

// update a document in a collection
export const updateDocument = (collection, docId, data) => {
  const ref = doc(db, collection, docId);
  return updateDoc(ref, {...data, updated_at: serverTimestamp()});
}

export const deleteDocument = (collection, docId) => {
  const ref = doc(db, collection, docId);
  return deleteDoc(ref);
}

export const getDocument = async (collection, docId) => {
  const docRef = doc(db, collection, docId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
}


// For query reference - check get multiple documents from a collection in https://firebase.google.com/docs/firestore/query-data/get-data
// Example query : const query = query(collection(db, "cities"), where("state", "==", "CA"));
// Fetch multiple documents from a collection using a query
export const getProjectsByUser = async (userId) => {
  const q = query(collection(db, "projects"), where("created_by", "==", userId));
return queryDocuments(q);
}

export const getSharedProjectsByUser = async (userId) => {
  // TODO
}

export const getCollaborators = async (projectId) => {
  // TODO
}

export const queryDocuments = async (query) => {
  const querySnapshot = await getDocs(query);
  const docs = [];
  querySnapshot.forEach((doc) => {
    docs.push({ id: doc.id, ...doc.data() });
  });
  return docs;
}