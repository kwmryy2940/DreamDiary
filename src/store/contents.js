import { defineStore } from "pinia";

export const useContentsStore = defineStore("contents", {
  state: () => ({
    // コンテンツを保持する状態
    contentsInfo: [],
    contentsId: 0,
  }),
  actions: {
    // コンテンツを更新するアクション
    setContentsInfo(contentsInfo) {
      this.contentsInfo.push(contentsInfo);
    },
    // コンテンツを取得するアクション
    getContentsInfo() {
      return this.contentsInfo;
    },
    // コンテンツを更新するアクション
    updateContentsInfo(contentsId, dstContentsInfo) {
      // const contents = JSON.parse(
      //   JSON.stringify(
      //     this.contentsInfo.filter((item) => item.id === contensId)
      //   )
      // );
      
      // const i= this.contentsInfo.forEach((element,index) => {


      //   if(element.id===contentsId){
      //     return index;
      //   }
      // });

      const index=this.contentsInfo.findIndex((element)=>element.id===contentsId);
      if(index===-1)return -1;
      // const index = this.contentsInfo.indexOf(contents);
      // const index = this.contentsInfo.id.indexOf(contentsId);
      this.contentsInfo.splice(index, 1, dstContentsInfo);
      return 0;
    },
    // コンテンツを削除するアクション
    removeContentsInfo(contentsInfo) {
      const index = this.contentsInfo.indexOf(contentsInfo);
      this.contentsInfo.splice(index, 1);
    },
    // コンテンツIDを取得するアクション
    getNextContentsId() {
      this.contentsId++;
      return this.contentsId;
    },
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
