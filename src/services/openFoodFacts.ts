export interface OpenFoodFactsProduct {
    code: string;
    product_name: string;
    image_url?: string;
    serving_size?: string;
    nutriments: {
        'energy-kcal_100g'?: number;
        proteins_100g?: number;
        carbohydrates_100g?: number;
        fat_100g?: number;
    };
}

export async function searchFood(query: string): Promise<OpenFoodFactsProduct[]> {
    try {
        const response = await fetch(
            `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(
                query
            )}&search_simple=1&action=process&json=1&page_size=20`
        );

        if (!response.ok) {
            throw new Error('Failed to fetch food data');
        }

        const data = await response.json();
        return data.products || [];
    } catch (error) {
        console.error('Error searching food:', error);
        return [];
    }
}
