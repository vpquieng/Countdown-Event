import { Event } from "../atoms/eventAtom";

export function sortEventsByStatus(events: Event[]): Event[] {
  const statusOrder: Record<string, number> = {
    upcoming: 0,
    complete: 1,
    canceled: 2,
  };

  return [...events].sort((a, b) => {
    const aStatusOrder = statusOrder[a.status] ?? 99;
    const bStatusOrder = statusOrder[b.status] ?? 99;
    return aStatusOrder - bStatusOrder;
  });
}
