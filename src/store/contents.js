import { defineStore } from "pinia";

export const useContentsStore = defineStore("contents", {
  state: () => ({
    // コンテンツを保持する状態
    contentsInfo: [],
  }),
  actions: {
    // コンテンツを更新するアクション
    setContentsInfo(contentsInfo) {
      this.contentsInfo.push(contentsInfo);
    },
    // コンテンツを取得するアクション
    // getContentsInfo(categoryId, content, date) {
    //   const filterdObject = this.contentsInfo.filter((item) => {
    //     (categoryId !== undefined &&
    //       item.categoryId === categoryId) ||
    //       (content !== undefined &&
    //       content.length !== 0 &&
    //       item.contents.toLowerCase().includes(content.toLowerCase()) )||
    //       (date !== undefined &&
    //       date.length !== 0 &&
    //       item.timestamp.toLowerCase().startsWith(date.toLowerCase()));
    //   });
    //   return filterdObject;
    // },
  },

  persist: {
    storage: localStorage,
  },
});
