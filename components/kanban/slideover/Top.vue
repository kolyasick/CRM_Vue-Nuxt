<script setup lang="ts">
import dayjs from 'dayjs'
import { useDealSlideStore } from '~/store/deal-slide-store'

const store = useDealSlideStore()
</script>

<template>
  <div class="border-border bg-sidebar rounded p-3">
    <div class="uppercase bold text-xl mb-4">About the deal</div>
    <KanbanSlideoverLabel label-text="Name">
      <h2>{{ store.card?.name }} </h2>
    </KanbanSlideoverLabel>

    <KanbanSlideoverLabel label-text="Sum">
      {{ convertCurrency(store.card?.price || 0) }}
    </KanbanSlideoverLabel>

    <KanbanSlideoverLabel label-text="Status">
      <UiBadge variant="outline"> {{ store.card?.status }} </UiBadge>
    </KanbanSlideoverLabel>

    <KanbanSlideoverLabel label-text="Client">
      {{ store.card?.companyName }}
    </KanbanSlideoverLabel>

    <KanbanSlideoverLabel label-text="Date of creation">
      {{ dayjs(store.card?.$createdAt).format('DD MMMM YYYY') }}
    </KanbanSlideoverLabel>
  </div>
</template>
