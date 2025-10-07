import { databases } from "../lib/appwrite";
import config from "../config/config";
import { Query } from "appwrite";

export const getModules = async () => {
  const response = await databases.listDocuments(config.databaseId, "68e4eca8000b5e77572b");
  return response.documents;
};




export const getSubModules = async (moduleId) => {
  const response = await databases.listDocuments(config.databaseId, "submodules", [
    Query.equal("$id", moduleId),
  ]);
  return response.documents;
};