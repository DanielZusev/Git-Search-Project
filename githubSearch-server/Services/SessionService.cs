using Microsoft.Extensions.Caching.Memory;

public interface ISessionManager
{
    void AddBookMark(string userId, BookMarkDto item);
    IEnumerable<BookMarkDto> GetAllBookMarks(string userId);
    void RemoveItem(string userId, long repoId);
    void ClearSession(string userId);
}

public class MemoryCacheSessionManager : ISessionManager
{
    private readonly IMemoryCache _cache;
    private const string KeyPrefix = "bookMarkSession_";

    public MemoryCacheSessionManager(IMemoryCache cache)
    {
        _cache = cache;
    }

    public void AddBookMark(string userId, BookMarkDto item)
    {
        var key = $"{KeyPrefix}{userId}";

        // Get existing list or create new
        if (!_cache.TryGetValue(key, out List<BookMarkDto> marks))
        {
            marks = new List<BookMarkDto>();
        }

        marks.Add(item);

        var options = new MemoryCacheEntryOptions()
            .SetSlidingExpiration(TimeSpan.FromMinutes(20));

        _cache.Set(key, marks, options);
    }

    public IEnumerable<BookMarkDto> GetAllBookMarks(string userId)
    {
        return _cache.TryGetValue($"{KeyPrefix}{userId}", out List<BookMarkDto> marks)
            ? marks
            : [];
    }

    public void ClearSession(string userId)
    {
        var key = $"{KeyPrefix}{userId}";
        _cache.Remove(key);
    }


    public void RemoveItem(string userId, long repoId)
    {
        var key = $"{KeyPrefix}{userId}";

        if (_cache.TryGetValue(key, out List<BookMarkDto> items))
        {
            var itemToRemove = items.FirstOrDefault(x => x.Id == repoId);
            if (itemToRemove != null)
            {
                items.Remove(itemToRemove);

                var options = new MemoryCacheEntryOptions()
                    .SetSlidingExpiration(TimeSpan.FromMinutes(20));

                _cache.Set(key, items, options);
            }
        }
    }

}