export const getModules = async () => {
    const response = await databases.listDocuments("dbId", "modulesId");
    return response.documents;
  };
  