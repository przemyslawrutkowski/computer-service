export class UserLocalStorage {
    private storageKey: string = "logged_user";
  
    constructor() {
    }
  
    getUserId(): number | null {
      const userData = localStorage.getItem(this.storageKey);
      if (userData) {
        const parsedData = JSON.parse(userData);
        return parsedData.id || null;
      }
      return null;
    }
  
    setUserId(userId: number): void {
      const userData = JSON.stringify({ id: userId });
      localStorage.setItem(this.storageKey, userData);
    }
  
    clearUserId(): void {
      localStorage.removeItem(this.storageKey);
    }
  }