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

    async updatePost(slug,{title,content,featuredImage,status}){
        try {
            return await this.database.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            throw error
        }
    }

    async deletePost(slug){
        try {
            await this.database.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            throw error
            return false
        }
    }

    async getonePost(slug){
        try {
            return await this.database.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            throw error
            return false
        }
    }

    async getPosts(queries = [Query.equal("status","active")]){
        try {
            return await this.database.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries,

            )
            return true
        } catch (error) {
            throw error
            return false
        }
    }

    // file upload service and images upload
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file,
            )
            return true
        } catch (error) {
            throw error
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                config.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            throw error
            return false
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            config.appwriteBucketId,
            fileId
        )
    }
}
const service = new Service();
export default service;