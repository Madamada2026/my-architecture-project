namespace Infrastructure.Consumers;

using Application.Ports;
using Domain.Events;
using Infrastructure.Messaging;
using Microsoft.Extensions.Logging;

public class InventoryConsumer : IEventHandler<OrderCreatedEvent>
{
    private readonly IdempotencyService _idempotency;
    private readonly ILogger<InventoryConsumer> _logger;

    public InventoryConsumer(IdempotencyService idempotency, ILogger<InventoryConsumer> logger)
    {
        _idempotency = idempotency;
        _logger = logger;
    }

    public async Task HandleAsync(OrderCreatedEvent @event)
    {
        // Додано "InventoryConsumer" як перший аргумент
        if (!_idempotency.TryMarkAsProcessed("InventoryConsumer", @event.EventId))
        {
            _logger.LogWarning("[KhNTU-Idempotency-42] duplicate skipped. EventId: {@EventId}", @event.EventId);
            return;
        }

        _logger.LogInformation("InventoryConsumer: Reserving stock for Order {@OrderId}", @event.OrderId);
        await Task.Delay(500); 
        _logger.LogInformation("InventoryConsumer: Stock reserved successfully for Order {@OrderId}", @event.OrderId);
    }
}