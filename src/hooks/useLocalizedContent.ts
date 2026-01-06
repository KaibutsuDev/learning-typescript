"use client";

import { useLanguage } from '@/src/i18n/LanguageContext';

export function useLocalizedList<T extends { id: string }>(
    rawList: T[], 
    translationsMap: (t: any) => any,
    translationKeys: string[]
) {
    const { t } = useLanguage();
    const dictionary = translationsMap(t);

    return rawList.map((item, index) => {
        const key = translationKeys[index];
        const translation = dictionary[key];
        
        return {
            ...item,
            ...translation,
            // If the item already has a descriptive ID, keep it, 
            // otherwise use the key as ID
            id: item.id || key
        };
    });
}
