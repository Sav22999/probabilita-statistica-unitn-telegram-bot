import * as fs from 'fs';

export interface UserData {
    username: string,
    notificationVoti: boolean;
    notificationRemember: boolean;
}

class UserList {

    private fileName: string = "usernames.json";
    private users: { [id: string]: UserData; } = {}

    constructor() {
        if (fs.existsSync(this.fileName))
            this.readFile();

    }


    private updateFile(): void {
        fs.writeFileSync(this.fileName, JSON.stringify(this.users));
    }

    private readFile(): void {
        this.users = JSON.parse(fs.readFileSync(this.fileName).toString());
    }


    public getUserByChatId(chatId: string): string {
        if (this.users[chatId])
            return this.users[chatId].username;
        else
            return null;
    }

    public addUser(chatId: string, username: string): void {
        if (chatId) {
            this.users[chatId] = {
                username: username.toLowerCase(),
                notificationVoti: false,
                notificationRemember: false,
            };
            this.updateFile();
        }
    }

    public editNotificationVoti(chatId: string, status: boolean): void {
        if (!this.users[chatId])
            this.addUser(chatId, "")


        if (this.users[chatId].notificationVoti !== status) {
            this.users[chatId].notificationVoti = status;
            this.updateFile();
        }
    }

    public editNotificationRemember(chatId: string, status: boolean): void {
        if (!this.users[chatId])
            this.addUser(chatId, "")

        if (this.users[chatId].notificationRemember !== status) {
            this.users[chatId].notificationRemember = status;
            this.updateFile();
        }
    }

    public getNotificationVoti(chatId: string): boolean {
        if (this.users[chatId])
            return this.users[chatId].notificationVoti
        return false
    }

    public getNotificationRemember(chatId: string): boolean {
        if (this.users[chatId])
            return this.users[chatId].notificationRemember
        return false
    }

    public getUserWithNotificationVoti(): { username: string, chatId: string }[] {
        var res: { username: string, chatId: string }[] = [];
        for (let u in this.users) {
            if (this.users[u].notificationVoti)
                res.push({ username: this.users[u].username, chatId: u });
        }

        return res;
    }

    public getUserToRemember(): { username: string, chatId: string }[] {
        var res: { username: string, chatId: string }[] = [];
        for (let u in this.users) {
            if (this.users[u].notificationRemember)
                res.push({ username: this.users[u].username, chatId: u });
        }

        return res;
    }
}


const userList = new UserList();
export default userList;