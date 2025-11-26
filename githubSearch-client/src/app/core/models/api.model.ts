/**
 * Represents a GitHub repository returned from the search API.
 * This structure maps to the JSON response provided by GitHub's `search` endpoint.
 */
export interface Repository {
    id: number
    name: string
    html_url: string
    owner: {
        avatar_url: string;
    }
    isBookmarked?: boolean;
}

/**
 * Lightweight DTO representing a saved repository in the user's session.
 * Used when sending data to the backend `bookmarks` endpoint.
 */
export interface Bookmark {
    id: number
    name: string
    avatarUrl: string;
}

