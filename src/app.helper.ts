export function getUniqueViolationKey(detail: string): string {
    const matched = detail.match(/\(([^)]+)\)/g);
    return matched[1];
}