import { APP_WRITE_ID } from '@/app.constants'
import { Account, Client, Databases, Storage } from 'appwrite'
export { ID } from 'appwrite'

export const client = new Client()
export const account = new Account(client)
export const DB = new Databases(client)
export const storage = new Storage(client)

client.setEndpoint('https://cloud.appwrite.io/v1').setProject(APP_WRITE_ID)


