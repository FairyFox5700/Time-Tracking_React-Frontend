export const groupBy = <T, K extends keyof any>(list: T[] | undefined, getKey: (item: T) => K) => {
    if (list == undefined) return {} as Record<K, T[]>;
    else {
        return list.reduce((previous, currentItem) => {
            const group = getKey(currentItem);
            if (!previous[group]) previous[group] = [];
            previous[group].push(currentItem);
            return previous;
        }, {} as Record<K, T[]>)
    }
};