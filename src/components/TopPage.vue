<template>
  <v-container>
    <h1 class="text-center">ゆめにっき</h1>
    <v-select
      v-model="categoryId"
      label="夢の種類"
      variant="outlined"
      :items="categoryItem"
      item-title="text"
      item-value="value"
      return-value
    ></v-select>
    <v-textarea
      label="夢の内容"
      variant="outlined"
      v-model="dreamContent"
      clearable
    ></v-textarea>

    <v-row>
      <v-col cols="4" offset="8">
        <template v-if="dreamContent.length > 1000">
          <div style="color: red">{{ dreamContent.length }}/1000字</div>
        </template>
        <template v-else>{{ dreamContent.length }}/1000字 </template>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-btn
          block
          color="primary"
          @click="onAddContents"
          :disabled="isSaveDisable"
          >保存</v-btn
        >
      </v-col>
    </v-row>

    <v-snackbar v-model="noticeSnackBar" :timeout="5000" color="success">
      <v-icon class="me-2" size="small"> mdi-check-circle-outline </v-icon>
      {{ noticeSnackBarText }}
      <template v-slot:actions>
        <v-btn color="white" variant="text" @click="noticeSnackBar = false">
          閉じる
        </v-btn>
      </template>
    </v-snackbar>
    <v-snackbar v-model="errorSnackBar" :timeout="5000" color="error">
      <v-icon class="me-2" size="small"> mdi-alert-circle-outline </v-icon>
      {{ errorSnackBarText }}
      <template v-slot:actions>
        <v-btn color="white" variant="text" @click="errorSnackBar = false">
          閉じる
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script setup>
import { isReadonly, ref, watch } from "vue";
import { useContentsStore } from "../store/contents.js";

const contentsStore = useContentsStore();
const dreamContent = ref("");
const categoryId = ref(0);
const categoryItem = ref([
  { value: 0, text: "良夢" },
  { value: 1, text: "悪夢" },
  { value: 2, text: "その他" },
]);

const noticeSnackBar = ref(false); // 通知バーの表示を管理する変数
const noticeSnackBarText = ref(false); // 通知バーの通知内容
const errorSnackBar = ref(false); // エラー通知バーの表示を管理する変数
const errorSnackBarText = ref(""); // エラー通知バーの通知内容
const isSaveDisable = ref(true);

watch(dreamContent, (val) => {
  if (val.length <= 0) {
    isSaveDisable.value = true;
  } else {
    isSaveDisable.value = false;
  }
});

async function onAddContents() {
  if (dreamContent.value.length <= 0) {
    errorSnackBar.value = true;
    errorSnackBarText.value = "夢の内容は1文字以上入力してください。";
    throw new Error("Validation error.");
  } else if (dreamContent.value.length > 1000) {
    errorSnackBar.value = true;
    errorSnackBarText.value = "夢の内容は1000文字以下で入力してください。";
    throw new Error("Validation error.");
  }

  const contents = {
    categoryId: categoryId.value,
    contents: dreamContent.value,
    timestamp: new Date().toLocaleString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),
  };

  contentsStore.setContentsInfo(contents);
  categoryId.value = 0;
  dreamContent.value = "";

  noticeSnackBar.value = true;
  noticeSnackBarText.value = "ゆめにっきを登録しました。";
}
</script>
