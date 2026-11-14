namespace Infrastructure.Messaging;

using System.Collections.Concurrent;

public class IdempotencyService
{
    // Зберігаємо унікальний ключ: НазваСпоживача + EventId
    private readonly ConcurrentDictionary<string, bool> _processedEvents = new();

    public bool TryMarkAsProcessed(string consumerName, Guid eventId)
    {
        var key = $"{consumerName}_{eventId}";
        return _processedEvents.TryAdd(key, true);
    }
}