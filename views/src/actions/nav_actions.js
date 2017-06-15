export const ITEM_CLICKED = 'ITEM_CLICKED';

export function selectItem(listItem) {
    return {
        type: ITEM_CLICKED,
        payload: listItem
    };
}