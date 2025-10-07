

export const getModules = async () => {
  const response = await databases.listDocuments("dbId", "modulesId");
  return response.documents;
};




export const getSubModules = async (moduleId) => {
  const response = await databases.listDocuments("YOUR_DB_ID", "SUBMODULES_COLLECTION_ID", [
    Query.equal("moduleId", moduleId),
  ]);
  return response.documents;
};