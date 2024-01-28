export class UserLocalStorage {
    private storageKey: string = "logged_user";
  
    constructor() {}
  
    getUserData(): { userId: string; isServiceman: boolean } | null {
      const userData = localStorage.getItem(this.storageKey);
      if (userData) {
        return JSON.parse(userData);
      }
      return null;
    }
  
    setUserData(userId: string, isServiceman: boolean): void {
      const userData = JSON.stringify({ userId, isServiceman });
      localStorage.setItem(this.storageKey, userData);
    }
  
    clearUserData(): void {
      localStorage.removeItem(this.storageKey);
    }
  }
  