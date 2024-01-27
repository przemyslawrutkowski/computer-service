export class UserLocalStorage {
    private storageKey: string = "logged_user";
  
    constructor() {}
  
    getUserData(): { userId: number; isServiceman: boolean } | null {
      const userData = localStorage.getItem(this.storageKey);
      if (userData) {
        return JSON.parse(userData);
      }
      return null;
    }
  
    setUserData(userId: number, isServiceman: boolean): void {
      const userData = JSON.stringify({ userId, isServiceman });
      localStorage.setItem(this.storageKey, userData);
    }
  
    clearUserData(): void {
      localStorage.removeItem(this.storageKey);
    }
  }
  