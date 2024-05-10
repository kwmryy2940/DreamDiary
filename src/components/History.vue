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
          >
            <v-card-title>{{ content.timestamp }}</v-card-title>
            <v-card-text>{{ content.dreamContent }}</v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                prepend-icon="mdi-pencil"
                color="green"
                @click="openEditDialog(content)"
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
          >
            <v-card-title>{{ content.timestamp }}</v-card-title>
            <v-card-text>{{ content.dreamContent }}</v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                prepend-icon="mdi-pencil"
                color="green"
                @click="openEditDialog(content)"
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
          >
            <v-card-title>{{ content.timestamp }}</v-card-title>
            <v-card-text>{{ content.dreamContent }}</v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                prepend-icon="mdi-pencil"
                color="green"
                @click="openEditDialog(content)"
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

      <v-dialog v-model="editDialog">
        <v-card>
          <v-card-title>ゆめを書き換える</v-card-title>
          <v-card-text>
            <v-select
              v-model="editItem.categoryId"
              label="ゆめの種類"
              variant="outlined"
              :items="categoryItem"
              item-title="text"
              item-value="value"
              return-value
            ></v-select>
            <v-textarea
              label="ゆめの内容"
              variant="outlined"
              v-model="editItem.dreamContent"
              clearable
            ></v-textarea>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" variant="text" @click="editDialog = false"
              >キャンセル</v-btn
            >
            <v-btn color="purple" variant="text" @click="onUpdateClick"
              >ゆめを更新</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="deleteDialog">
        <v-card>
          <v-card-title class="bg-yellow-accent-4 text-blue-grey"
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
            <v-btn color="purple" variant="text" @click="onDeleteClick"
              >ゆめを忘れる</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
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

const tab = ref(0);
const contentsStore = useContentsStore();
const dialog = ref(false);
const editDialog = ref(false);
const deleteDialog = ref(false);
const contents = ref([]);
const categoryMap = ref({ 0: "吉夢", 1: "悪夢", 2: "その他" });
const categoryItem = [
  { value: 0, text: "吉夢" },
  { value: 1, text: "悪夢" },
  { value: 2, text: "その他" },
];

const tabList = ref(categoryItem);
const originItem = ref(null);
const editItem = ref(null);

function onClick() {
  contents.value = contentsStore.getContentsInfo();
}

function openEditDialog(content) {
  originItem.value = JSON.parse(JSON.stringify(content)); // depp copy
  editItem.value = content;
  editDialog.value = true;
}

function onUpdateClick() {
  contentsStore.updateContentsInfo(originItem.value, editItem.value);
  editDialog.value = false;
  contents = contentsStore.getContentsInfo();
}

function openDeleteDialog(content) {
  editItem.value = content;
  deleteDialog.value = true;
}

function onDeleteClick() {
  contentsStore.removeContentsInfo(editItem.value);
  deleteDialog.value = false;
}
</script>
