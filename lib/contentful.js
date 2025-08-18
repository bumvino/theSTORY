// lib/contentful.js
import 'server-only';              // ensures this never ends up in the client bundle
import { createClient } from 'contentful';

const space = process.env.CONTENTFUL_SPACE_ID;
const token = process.env.CONTENTFUL_ACCESS_TOKEN; // CDA (NOT preview)

if (!space || !token) {
    throw new Error(
        'Missing Contentful env vars. Set CONTENTFUL_SPACE_ID and CONTENTFUL_ACCESS_TOKEN.'
    );
}

export const cfClient = createClient({
    space,
    accessToken: token,
});

// (optional) tiny helpers you can import elsewhere
export async function getEntries(params) {
    return cfClient.getEntries(params);
}
export async function getEntry(id) {
    return cfClient.getEntry(id);
}