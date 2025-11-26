import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Repository } from '../../core/models';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  searchTerm: string = '';
  repositories: Repository[] = [];
  isLoading: boolean = false;

  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef) { }

  onSearch() {
    if (!this.searchTerm.trim()) return;

    this.isLoading = true;
    this.apiService.searchRepos(this.searchTerm).subscribe({
      next: (data) => {
        this.repositories = data;
        this.isLoading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Search failed', err);
        this.isLoading = false;
      }
    });
  }

  /**
   * Toggles the bookmark status of a specific repository.
   * * Depending on the current state of `repo.isBookmarked`:
   * - False: Sends a request to add the bookmark.
   * - True: Sends a request to remove the bookmark.
   * * Upon a successful API response, it updates the local `isBookmarked` flag 
   * and manually triggers change detection (`markForCheck`) to update the UI.
   * * @param repo - The repository object to interact with.
   */
  onBookmark(repo: Repository) {
    if (!repo.isBookmarked) {
      this.apiService.bookmarkRepo(repo).subscribe({
        next: () => {
          repo.isBookmarked = true;
          this.cdr.markForCheck();
        },
        error: (err) => console.error('Bookmark failed', err)
      });
    } else {
      this.apiService.removeBookmarkRepo(repo).subscribe({
        next: () => {
          repo.isBookmarked = false;
          this.cdr.markForCheck();
        },
        error: (err) => console.error('Remove Bookmark failed', err)
      });
    }
  }

  trackByRepoId(index: number, repo: Repository): number {
    return repo.id;
  }
}