namespace Infrastructure.Messaging;

using Application.Ports;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

public class InMemoryEventBus : IEventPublisher
{
    private readonly IServiceScopeFactory _scopeFactory;
    private readonly ILogger<InMemoryEventBus> _logger;

    public InMemoryEventBus(IServiceScopeFactory scopeFactory, ILogger<InMemoryEventBus> logger)
    {
        _scopeFactory = scopeFactory;
        _logger = logger;
    }

    public async Task PublishAsync<TEvent>(TEvent @event) where TEvent : class
    {
        var eventName = typeof(TEvent).Name;
        var eventId = GetEventId(@event);
        _logger.LogInformation($"[Events.{eventName}] Published event with ID: {eventId}");

        // Запускаємо асинхронну обробку, щоб не блокувати основний потік видавця
        _ = Task.Run(async () =>
        {
            try
            {
                // Створюємо новий скоуп спеціально для обробників
                using var innerScope = _scopeFactory.CreateScope();
                
                // Отримуємо всіх зареєстрованих обробників для цієї події
                var scopedHandlers = innerScope.ServiceProvider.GetServices<IEventHandler<TEvent>>();

                // Викликаємо кожного обробника по черзі
                foreach (var scopedHandler in scopedHandlers)
                {
                    await scopedHandler.HandleAsync(@event);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error handling event {eventName}");
            }
        });
    }

    private static string GetEventId<T>(T @event)
    {
        var prop = typeof(T).GetProperty("EventId");
        return prop != null ? prop.GetValue(@event)?.ToString() ?? "unknown" : "unknown";
    }
}