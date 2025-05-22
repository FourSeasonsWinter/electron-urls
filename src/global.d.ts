declare interface Window {
  api: {
    fetchFromNode: (url: string, options?: any) => Promise<any>;
  };
}