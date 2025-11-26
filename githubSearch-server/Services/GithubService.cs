
using System.Text.Json;

public class GithubService
{
    private readonly IHttpClientFactory _httpClient;

    public GithubService(IHttpClientFactory httpClient)
    {
        _httpClient = httpClient;
    }

    /// <summary>
    /// Asynchronously searches for public GitHub repositories using the GitHub Search API.
    /// </summary>
    /// <remarks>
    /// Uses the named "Github" HttpClient to ensure correct configuration (Base URL, User-Agent).
    /// </remarks>
    /// <param name="searchText">The keyword or query string to search for (e.g., "Angular").</param>
    /// <returns>
    /// A list of <see cref="GithubRepoItem"/> matching the query. Returns an empty list if deserialization fails or no items are found.
    /// </returns>
    /// <exception cref="HttpRequestException">Thrown if the GitHub API returns a non-success status code.</exception>
    public async Task<List<GithubRepoItem>> SearchRepo(string searchText)
    {
        var httpClient = _httpClient.CreateClient("Github");

        var response = await httpClient.GetAsync($"search/repositories?q={searchText}");

        response.EnsureSuccessStatusCode();

        var jsonResponse = await response.Content.ReadAsStringAsync();

        var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
        var searchResult = JsonSerializer.Deserialize<GithubSearchResponse>(jsonResponse, options);

        return searchResult?.Items ?? [];
    }
}