import { databases } from "../lib/appwrite";
import { ID, Query } from "appwrite";
import config from "../config/config";

export const getModules = async () => {
  const response = await databases.listDocuments(
    config.databaseId,
    config.collectionId
  );
  return response.documents;
};

export const createModule = async ({ moduleName, description, coverImage, teacherName }) => {
  const response = await databases.createDocument(
    config.databaseId,
    config.collectionId,
    ID.unique(),
    { moduleName, description, coverImage: coverImage || '', teacher: teacherName }
  );
  return response;
};

export const updateModule = async (moduleId, { moduleName, description, coverImage }) => {
  const response = await databases.updateDocument(
    config.databaseId,
    config.collectionId,
    moduleId,
    { moduleName, description, coverImage }
  );
  return response;
};

export const deleteModule = async (moduleId) => {
  await databases.deleteDocument(
    config.databaseId,
    config.collectionId,
    moduleId
  );
};




export const getSubModules = async (moduleId) => {
  console.log("moduleId", moduleId)
  const response = await databases.listDocuments(
    config.databaseId,
    config.submodulesCollectionId,
    [Query.equal("moduleId", moduleId)]
  );
  return response.documents;
};

export const createSubModule = async ({ moduleId, title, content, image, codeSnippets, resourceName }) => {
  const response = await databases.createDocument(
    config.databaseId,
    config.submodulesCollectionId,
    ID.unique(),
    { title, content, image, codeSnippets, resourceName, moduleId }
  );

  console.log("response", response)
  return response;
};

export const updateSubModule = async (subId, payload) => {
  const response = await databases.updateDocument(
    config.databaseId,
    config.submodulesCollectionId,
    subId,
    payload
  );
  return response;
};

export const deleteSubModule = async (subId) => {
  await databases.deleteDocument(
    config.databaseId,
    config.submodulesCollectionId,
    subId
  );
};

// Doubts Collection Functions
export const createDoubt = async ({ name, email, subject, doubt, status = 'pending' }) => {
  const response = await databases.createDocument(
    config.databaseId,
    config.doubtsCollectionId,
    ID.unique(),
    {
      name,
      email,
      subject: subject || '',
      doubt,
      status,
      createdAt: new Date().toISOString(),
      teacherResponse: ''
    }
  );
  return response;
};

export const getDoubts = async () => {
  const response = await databases.listDocuments(
    config.databaseId,
    config.doubtsCollectionId,
    [Query.orderDesc('$createdAt')]
  );
  return response.documents;
};

export const updateDoubtStatus = async (doubtId, { status, teacherResponse = '' }) => {
  const response = await databases.updateDocument(
    config.databaseId,
    config.doubtsCollectionId,
    doubtId,
    { status, teacherResponse: teacherResponse || '' }
  );
  return response;
};

export const deleteDoubt = async (doubtId) => {
  await databases.deleteDocument(
    config.databaseId,
    config.doubtsCollectionId,
    doubtId
  );
};