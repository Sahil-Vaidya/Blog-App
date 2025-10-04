import config from "../config/config.js"
import { Client, Account, ID } from "appwrite";

export class AuthService{
    client = new Client();
    account;

    constructor(){
       this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        const userAccount = await this.account.create(ID.unique(), email, password, name);
        return userAccount ? this.login({ email, password }) : userAccount;
    }

    async login({ email, password }) {
        return await this.account.createEmailSession(email, password);
    }

    // async createAccount({email, password, name}) {
    //     try {
    //         const userAccount = await this.account.create(ID.unique(), email, password, name);
    //         //check account exist
    //         if (userAccount) {
    //             // call another method
    //             return this.login({email, password});
    //         } else {
    //            return  userAccount;
    //         }
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    // async login({email, password}) {
    //     try {
    //         return await this.account.createEmailSession(email, password);
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    //check user login or not
    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }

        //if account not get
        return null;
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }
}

const authService = new AuthService();
 
export default authService


