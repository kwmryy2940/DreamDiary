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
        v-for="content in filterdContents.sort((a, b) => {
          return b.id - a.id;
        })"
        :key="content"
        class="ma-2"
        variant="outlined"
      >
        <v-card-text class="text-pre-wrap">{{ content.title }}</v-card-text>
        <v-card-subtitle>{{
          categoryItem[content.categoryId].text
        }}</v-card-subtitle>
        <v-card-subtitle
          ><v-icon>mdi-update</v-icon>{{ content.timestamp }}</v-card-subtitle
        >
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

const categoryItem = [
  { value: 0, text: "吉夢", color: "#00E676" },
  { value: 1, text: "悪夢", color: "#FF1744" },
  { value: 2, text: "その他", color: "#00B0FF" },
];

const handleDateClick = (e) => {
  filterdContents.value = calendarOptions.value.events.filter(
    (item) => item.start === e.dateStr
  );
  if (filterdContents.value.length <= 0) return;

  contentListDialog.value = true;
};

const handleEventClick = (e) => {
  contentText.value = e.event._def.title;
  contentDate.value = e.event._instance.range.start;
  contentDialog.value = true;
};

const handleDayRender = (e) => {
  console.log(e);
};

const calendarOptions = ref({
  locale: "ja",
  plugins: [dayGridPlugin, interactionPlugin],
  initialView: "dayGridMonth",
  headerToolbar: {
    start: "title",
    center: "",
    end: "today dayGridMonth,dayGridWeek,dayGridDay prev,next",
  },
  buttonText: {
    prev:"＜前月",
    next:"次月＞",
    today: "今日",
    month: "月",
    week: "週",
    day: "日",
  },
  events: [{}],
  // 日付クリック時の処理
  dateClick: handleDateClick,

  // eventクリック時の処理
  eventClick: handleEventClick,

  // 日付表記を変更する処理
  dayCellContent: function (e) {
    e.dayNumberText = e.dayNumberText.replace(/日$/, "");
    return e.dayNumberText;
  },
  // dayHeaderContent  :function(date,cell){
  //   console.log(date);
  //   console.log(cell);

  //   return date.text
  // }
  //  // 曜日の表記の指定
  //  dayHeaderContent: function(e) {
  //       console.log(e);
  //       return e.text;
  //   },
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
      id: content.id,
      categoryId: content.categoryId,
      title: content.dreamContent,
      start: content.timestamp.substring(0, 10),
      color: categoryItem[content.categoryId].color,
      timestamp: content.timestamp,
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

<style>
.fc-day-sat{
  color: blue;
}

.fc-day-sun{
    color: red;
}
</style>