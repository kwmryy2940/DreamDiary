<template>
  <v-dialog v-model="dialog">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        fab
        absolute
        style="left: 20px; bottom: 20px; position: fixed"
        color="purple"
        icon="mdi-calendar-month"
        size="large"
        @click="onClick"
      >
      </v-btn>
    </template>

    <v-sheet>
      <full-calendar
        :options="calendarOptions"
        @dateClick="handleDateClick"
        @eventClick="handleEventClick"
      />
    </v-sheet>
  </v-dialog>

  <v-dialog v-model="contentListDialog">
    <v-sheet>
    <v-card
    v-for="content in filterdContents.sort((a,b)=>{return b.id-a.id})"
            :key="content"
            class="ma-2"
            variant="outlined">
            <v-card-text  class="text-pre-wrap">{{ content.title }}</v-card-text>
            <v-card-subtitle><v-icon>mdi-update</v-icon>{{ content.timestamp }}</v-card-subtitle>
    </v-card>
  </v-sheet>
  </v-dialog>
</template>

<script setup>
import { onMounted, ref } from "vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useContentsStore } from "../store/contents.js";

const contentsStore = useContentsStore();
const contents = ref([]);
const dialog = ref(false);
const contentDialog = ref(false);
const contentListDialog = ref(false);
const contentText = ref("");
const contentDate = ref(null);

const filterdContents = ref([]);

const handleDateClick = (info) => {
  filterdContents.value = calendarOptions.value.events.filter(
    (item) => item.start === info.dateStr
  );
  contentListDialog.value=true;
};

const handleEventClick = (info) => {
  contentText.value = info.event._def.title;
  contentDate.value = info.event._instance.range.start;
  contentDialog.value = true;
};

const calendarOptions = ref({
  locale: "ja",
  plugins: [dayGridPlugin, interactionPlugin],
  headerToolbar: {
    start: "prev", // 前月表示させるボタン
    center: "title", // 表示している年月のラベル
    end: "next", // 次月表示ボタン
  },
  events: [
    {
      title: "5/11の予定",
      start: "2024-05-11",
    },
  ],
  // 日付クリック時の処理
  dateClick: handleDateClick,

  // eventクリック時の処理
  eventClick: handleEventClick,
});

async function loadItems() {
  contents.value = await contentsStore.getContentsInfo();

  for (let i = 0; i < contents.value.length; i++) {
    contents.value[i].timestamp = contents.value[i].timestamp.replace(
      /\//g,
      "-"
    );
  }
  calendarOptions.value.events = [{}];

  contents.value.forEach((content) => {
    const event = {
      id:content.id,
      categoryId:content.categoryId,
      title: content.dreamContent,
      start: content.timestamp.substring(0, 10),
      timestamp:content.timestamp
    };

    calendarOptions.value.events.push(event);
  });
}

async function onClick() {
  loadItems();
  dialog.value = true;
}

onMounted(async () => {
  await loadItems();
});
</script>
