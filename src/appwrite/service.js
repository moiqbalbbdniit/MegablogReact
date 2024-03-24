import config from "../config/config";
import {Client,ID,Databases,Storage,Query} from "appwrite"

export class Service{
    client = new Client();
    database;
    bucket;

    constructor(){
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.database = new Databases(this.client);
        this.bucket = new Storage(this.client)
    }

    async createPost({title,slug,content,featuredImage,status,userid}){
        try {
            return await this.database.createDocument(config.appwriteDatabaseId,config.appwriteCollectionId,slug,{
                title,
                content,
                featuredImage,
                status,
                userid,

            })
        } catch (error) {
            throw error
        }
    }
}
const service = new Service();
export default service;