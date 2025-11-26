
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class BookMarksController : ControllerBase
{
    private readonly ISessionManager _session;

    public BookMarksController(ISessionManager session)
    {
        _session = session;
    }

    [HttpPost]
    public IActionResult AddItem([FromBody] BookMarkDto bookMark)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (string.IsNullOrEmpty(userId)) return Unauthorized();

        _session.AddBookMark(userId, bookMark);

        return Ok(new { message = "Added to session" });
    }

    [HttpGet]
    public IActionResult GetAllItems()
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var items = _session.GetAllBookMarks(userId);
        return Ok(items);
    }

    [HttpDelete("{repoId}")]
    public IActionResult RemoveItem(long repoId)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (string.IsNullOrEmpty(userId)) return Unauthorized();

        _session.RemoveItem(userId, repoId);

        return Ok(new { message = "Item removed" });
    }
}

