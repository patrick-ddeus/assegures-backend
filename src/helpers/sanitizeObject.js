import { stripHtml } from "string-strip-html";

export function sanitizeObjects(obj) {
    for (const [key, value] of Object.entries(obj)) {
        if (typeof value !== "number" && typeof value !== "boolean" && typeof value !== "object") {
            obj[key] = stripHtml(value).result;
        }
    }
    return obj;
}