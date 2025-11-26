using System.Text.Json.Serialization;

public class GithubSearchResponse
{
    public List<GithubRepoItem> Items { get; set; }

}

public class GithubRepoItem
{
    public long Id { get; set; }
    public string Name { get; set; }

    [JsonPropertyName("html_url")]
    public string Url { get; set; }

    public GithubOwner Owner { get; set; }
}

public class GithubOwner
{
    [JsonPropertyName("avatar_url")]
    public string AvatarUrl { get; set; }
}
