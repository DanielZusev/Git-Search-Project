import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { Bookmark, Repository } from "../models";

/**
 * Core service for communicating with the .NET Backend API.
 * Handles repository searching and bookmark management.
 */
@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private url: string = "http://localhost:5000"

    constructor(private httpClient: HttpClient) { }

    /**
     * Proxies a search request to the backend to fetch GitHub repositories.
     * @param searchText - The keyword to search for (e.g., "Angular").
     * @returns An Observable array of Repository objects.
     */
    searchRepos(searchText: string): Observable<Repository[]> {
        return this.httpClient.get<Repository[]>(`${this.url}/api/githubsearch/${searchText}`)
    }

    /**
     * Saves a repository to the user's session.
     * Maps the full Repository object to a lightweight Bookmark DTO before sending.
     * @param repo - The repository to bookmark.
     */
    bookmarkRepo(repo: Repository): Observable<any> {
        const bookmark: Bookmark = { id: repo.id, name: repo.name, avatarUrl: repo.owner.avatar_url }
        return this.httpClient.post(`${this.url}/api/bookmarks/`, bookmark)
    }

    /**
     * Removes a repository from the user's bookmarked session.
     * @param repo - The repository object (uses repo.id for deletion).
     */
    removeBookmarkRepo(repo: Repository): Observable<any> {
        return this.httpClient.delete(`${this.url}/api/bookmarks/${repo.id}`)
    }

}