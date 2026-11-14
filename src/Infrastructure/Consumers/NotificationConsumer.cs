namespace Infrastructure.Consumers;

using Application.Ports;
using Domain.Events;
using Infrastructure.Messaging;
using Microsoft.Extensions.Logging;

public class NotificationConsumer : IEventHandler<OrderCreatedEvent>
{
    private readonly IdempotencyService _idempotency;
    private readonly ILogger<NotificationConsumer> _logger;

    public NotificationConsumer(IdempotencyService idempotency, ILogger<NotificationConsumer> logger)
    {
        _idempotency = idempotency;
        _logger = logger;
    }

    public async Task HandleAsync(OrderCreatedEvent @event)
    {
        // Додано "NotificationConsumer" як перший аргумент
        if (!_idempotency.TryMarkAsProcessed("NotificationConsumer", @event.EventId))
        {
            _logger.LogWarning("[KhNTU-Idempotency-42] duplicate skipped. EventId: {@EventId}", @event.EventId);
            return;
        }

        _logger.LogInformation("NotificationConsumer: Sending email to user {@UserId}", @event.UserId);
        await Task.Delay(200);
        _logger.LogInformation("NotificationConsumer: Email sent successfully for Order {@OrderId}", @event.OrderId);
    }
}