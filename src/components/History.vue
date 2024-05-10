<template>
  <v-dialog v-model="dialog">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        fab
        absolute
        style="right: 20px; bottom: 20px; position: fixed"
        color="purple"
        prepend-icon="mdi-history"
        size="large"
        rounded
        @click="onClick"
      >
        ゆめ履歴
      </v-btn>
    </template>
    <v-sheet height="90vh">
      <v-tabs v-model="tab" align-tabs="center" color="purple">
        <v-tab :value="tabList[0].value">{{ tabList[0].text }}</v-tab>
        <v-tab :value="tabList[1].value">{{ tabList[1].text }}</v-tab>
        <v-tab :value="tabList[2].value">{{ tabList[2].text }}</v-tab>
      </v-tabs>

      <v-tabs-window v-model="tab">
        <v-tabs-window-item :value="tabList[0].value" item-key="id">
          <v-card
            v-for="content in contents.filter((item) => item.categoryId === 0)"
            :key="content"
            class="ma-2"
            variant="outlined"
            @dblclick="onDblClick(content)"
          >
            <v-card-title>{{ content.timestamp }}</v-card-title>
            <v-card-text>{{ content.dreamContent }}</v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                prepend-icon="mdi-pencil"
                color="green"
                @click="onEditClick(content)"
                >ゆめを書き換える</v-btn
              >
              <v-btn
                prepend-icon="mdi-delete"
                color="red"
                @click="openDeleteDialog(content)"
                >ゆめを忘れる</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-tabs-window-item>
        <v-tabs-window-item :value="tabList[1].value" item-key="id">
          <v-card
            v-for="content in contents.filter((item) => item.categoryId === 1)"
            :key="content"
            class="ma-2"
            variant="outlined"
            @dblclick="onDblClick(content)"
          >
            <v-card-title>{{ content.timestamp }}</v-card-title>
            <v-card-text>{{ content.dreamContent }}</v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                prepend-icon="mdi-pencil"
                color="green"
                @click="onEditClick(content)"
                >ゆめを書き換える</v-btn
              >
              <v-btn
                prepend-icon="mdi-delete"
                color="red"
                @click="openDeleteDialog(content)"
                >ゆめを忘れる</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-tabs-window-item>
        <v-tabs-window-item :value="tabList[2].value" item-key="id">
          <v-card
            v-for="content in contents.filter((item) => item.categoryId === 2)"
            :key="content"
            class="ma-2"
            variant="outlined"
            @dblclick="onDblClick(content)"
          >
            <v-card-title>{{ content.timestamp }}</v-card-title>
            <v-card-text>{{ content.dreamContent }}</v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                prepend-icon="mdi-pencil"
                color="green"
                @click="onEditClick(content)"
                >ゆめを書き換える</v-btn
              >
              <v-btn
                prepend-icon="mdi-delete"
                color="red"
                @click="openDeleteDialog(content)"
                >ゆめを忘れる</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-tabs-window-item>
      </v-tabs-window>

      <v-dialog v-model="deleteDialog">
        <v-card>
          <v-card-title
          class="bg-yellow-accent-4 text-blue-grey"
            ><p>忘れたゆめは戻ってきません。</p>
            <p>よろしいですか？</p>
          </v-card-title>
          <v-card-text>
            【ゆめの内容】
            <p>{{ editItem.dreamContent }}</p></v-card-text
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" variant="text" @click="deleteDialog = false"
              >キャンセル</v-btn
            >
            <v-btn color="purple" variant="text" @click="onDeleteClick">忘れる</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- <v-card v-for="content in contents" :key="content" class="ma-2" variant="outlined">
        <v-card-title>{{ content.timestamp }}</v-card-title>
        <v-card-subtitle>分類：{{ categoryMap[content.categoryId] }}</v-card-subtitle>
        <v-card-text>{{ content.dreamContent }}</v-card-text>
      </v-card> -->
    </v-sheet>
    <v-fab
      absolute
      location="end"
      size="small"
      color="purple"
      @click="dialog = false"
      icon="mdi-close"
    >
    </v-fab>
  </v-dialog>
</template>

<script setup>
import { ref } from "vue";
import { useContentsStore } from "../store/contents.js";

const tab = ref(null);
const contentsStore = useContentsStore();
const dialog = ref(false);
const deleteDialog = ref(false);
const contents = ref([]);
const categoryMap = ref({ 0: "吉夢", 1: "悪夢", 2: "その他" });
const tabList = ref([
  { value: 0, text: "吉夢" },
  { value: 1, text: "悪夢" },
  { value: 2, text: "その他" },
]);

const editItem = ref(null);

function onClick() {
  contents.value = contentsStore.getContentsInfo();
}
function onEditClick(content) {
  console.log(content);

  const beforeUpdContents = contentsStore.getContentsInfo();
  console.log("beforeUpdContents:", beforeUpdContents);

  const test = {
    categoryId: 2,
    dreamContent: "update test",
    timestamp: new Date().toLocaleString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),
  };

  contentsStore.updateContentsInfo(content, test);

  const afterUpdContents = contentsStore.getContentsInfo();
  console.log("afterUpdContents:", afterUpdContents);

  // console.log(contents.filter(item=>item===content));
}

function openDeleteDialog(content) {
  editItem.value = content;
  deleteDialog.value = true;
}

function onDeleteClick() {
  console.log(editItem.value);
  contentsStore.removeContentsInfo(editItem.value);
  // editItem.value = null;
  deleteDialog.value = false;
}

function onDblClick(content) {
  console.log(content);
}
</script>
