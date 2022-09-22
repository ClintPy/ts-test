import { httpGet } from "./mock-http-interface";

// TODO define this type properly
type TResult = { ["Arnie Quote"]?: string; FAILURE?: string };
type HTTPResult = { status: number; body: string };

export const getArnieQuotes = async (urls: string[]): Promise<TResult[]> => {
    // TODO: Implement this function.
    const httpResult: Promise<Array<HTTPResult>> = Promise.all(urls.map((url) => httpGet(url)));
    const TResult: TResult[] = [];
    (await httpResult).forEach((quote) => {
        if (quote.status === 200) {
            TResult.push({ ["Arnie Quote"]: JSON.parse(quote.body).message });
        } else {
            TResult.push({ FAILURE: JSON.parse(quote.body).message });
        }
    });
    return TResult;
};
