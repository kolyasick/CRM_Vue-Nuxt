import {useQuery} from "@tanstack/vue-query";
import {DB_ID, COLLECTION_DEALS} from "~/app.constants";
import {KANBAN_DATA} from "~/components/kanban/kanban.data";
import {ICard} from "~/components/kanban/kanban.types";
import {IDeal} from "~/types/deals.types";

export function useKanbanQuery() {

    return useQuery({
        queryKey: ['deals'],
        queryFn: () => DB.listDocuments(DB_ID, COLLECTION_DEALS, ),
        select(data) {
            const newBoard = KANBAN_DATA.map(col => ({
                ...col,
                items: []
            }))
            const deals = data.documents as unknown as IDeal[]

            for (const deal of deals) {
                const column = newBoard.find(col => col.id === deal.status)

                if (column) {
                    column.items.push({
                        $createdAt: deal.$createdAt,
                        id: deal.$id,
                        name: deal.name,
                        price: deal.price,
                        companyName: deal.customer.name,
                        status: column.name,
                    })
                }
            }
            return newBoard
        }
    })
}
