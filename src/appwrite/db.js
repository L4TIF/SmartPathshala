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

export const createModule = async ({ moduleName, description }) => {
  const response = await databases.createDocument(
    config.databaseId,
    config.collectionId,
    ID.unique(),
    { moduleName, description }
  );
  return response;
};

export const updateModule = async (moduleId, { moduleName, description }) => {
  const response = await databases.updateDocument(
    config.databaseId,
    config.collectionId,
    moduleId,
    { moduleName, description }
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
  const response = await databases.listDocuments(
    config.databaseId,
    config.submodulesCollectionId,
    [Query.equal("moduleId", moduleId)]
  );
  return response.documents;
};

export const createSubModule = async ({ moduleId, title, content, imageUrl, codeSnippet, resourceName }) => {
  const response = await databases.createDocument(
    config.databaseId,
    config.submodulesCollectionId,
    ID.unique(),
    { moduleId, title, content, imageUrl, codeSnippet, resourceName }
  );
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