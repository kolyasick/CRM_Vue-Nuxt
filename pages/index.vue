<script lang="ts" setup>
import type { ICard, IColumn } from '~/components/kanban/kanban.types';
import { useKanbanQuery } from "~/components/kanban/useKanbanQuery";
import dayjs from 'dayjs';
import CreateDeal from "~/components/kanban/createDeal.vue";
import { useMutation } from "@tanstack/vue-query";
import { COLLECTION_DEALS, DB_ID } from "~/app.constants";
import type { EnumStatus } from '~/types/deals.types';
import { generateColumnStyle } from "~/components/kanban/generate-gradient";
import { useDealSlideStore } from '~/store/deal-slide-store';

type TypeMutationVariables = {
  docId: string;
  status?: EnumStatus;
};

const store = useDealSlideStore();
const dragCardRef = ref<ICard | null>(null);
const sourceColumnRef = ref<IColumn | null>(null);
const dataWithClientUpdates = ref<IColumn[]>([]);

const { data: serverData, isLoading, refetch } = useKanbanQuery();

watch(
  serverData,
  (newData) => {
    dataWithClientUpdates.value = newData ? [...newData] : [];
  },
  { immediate: true }
);

const { mutate } = useMutation({
  mutationKey: ['move card'],
  mutationFn: ({ docId, status }: TypeMutationVariables) =>
    DB.updateDocument(DB_ID, COLLECTION_DEALS, docId, {
      status,
    }),
  onSuccess: () => {
    refetch();
  },
});

function handleDragStart(card: ICard, column: IColumn) {
  dragCardRef.value = card;
  sourceColumnRef.value = column;
}

function handleDragOver(event: DragEvent) {
  event.preventDefault();
}

function handleDrop(targetColumn: IColumn) {
  if (dragCardRef.value && sourceColumnRef.value && dataWithClientUpdates.value) {
    const cardIndex = sourceColumnRef.value.items.findIndex(
      (item) => item.id === dragCardRef.value?.id
    );
    const sourceColumnIndex = dataWithClientUpdates.value.findIndex(
      (column) => column.id === sourceColumnRef.value?.id
    );
    const targetColumnIndex = dataWithClientUpdates.value.findIndex(
      (column) => column.id === targetColumn.id
    );

    if (
      cardIndex !== -1 &&
      sourceColumnIndex !== -1 &&
      targetColumnIndex !== -1
    ) {

      const newData = JSON.parse(JSON.stringify(dataWithClientUpdates.value));

      const [cardToMove] = newData[sourceColumnIndex].items.splice(
        cardIndex,
        1
      );
      newData[targetColumnIndex].items.push(cardToMove);

      dataWithClientUpdates.value = newData;

      mutate({ docId: dragCardRef.value.id, status: targetColumn.id });
    }
  }
}

useHead({
  title: 'CRM System',
});
</script>

<template>
  <div class="p-10">
    <h1 class="font-bold text-2xl mb-10">CRM System</h1>
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <div
        class="grid grid-cols-5 gap-16 max-2xl:grid-cols-3 max-xl:grid-cols-2 max-lg:grid-cols-1"
      >
        <div
          v-for="(column, index) in dataWithClientUpdates" 
          :key="column.id" 
          @dragover="handleDragOver"
          @drop="() => handleDrop(column)"
          class="min-h-screen max-2xl:min-h-96"
        >
          <div
            class="rounded bg-slate-700 py-1 px-5 mb-2 text-center"
            :style="generateColumnStyle(index, dataWithClientUpdates?.length)"
          >
            {{ column.name }}
          </div>
          <div>
            <CreateDeal :refetch="refetch" :status="column.id" />
            <UiCard
              v-for="card in column.items"
              :key="card.id"
              class="my-5"
              draggable="true"
              @dragstart="() => handleDragStart(card, column)"
            >
              <UiCardHeader role="button" @click="store.set(card)">
                <UiCardTitle>{{ card.name }}</UiCardTitle>
                <UiCardDescription class="mt-2 block">
                  {{ convertCurrency(card.price) }}
                </UiCardDescription>
              </UiCardHeader>

              <UiCardContent class="text-xs">
                <span>Компания</span>
                {{ card.companyName }}
              </UiCardContent>
              <UiCardFooter class="text-sm">
                {{ dayjs(card.$createdAt).format('DD MMMM YYYY') }}
              </UiCardFooter>
            </UiCard>
          </div>
        </div>
      </div>

      <KanbanSlideover />
    </div>
  </div>
</template>