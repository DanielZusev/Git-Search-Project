using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class GithubSearchController : ControllerBase
{
    private readonly GithubService _githubService;
    public GithubSearchController(GithubService githubService)
    {
        _githubService = githubService;
    }


    [HttpGet("{searchText}")]
    public async Task<IActionResult> SearchRepository(string searchText)
    {
        try
        {
            var searchResults = await _githubService.SearchRepo(searchText);
            return Ok(searchResults);
        }
        catch (Exception ex)
        {
            return StatusCode(503, $"Error Retrieving Data From Github: {ex}");
        }
    }

}