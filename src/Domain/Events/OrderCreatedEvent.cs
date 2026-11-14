namespace Domain.Events;

public record OrderCreatedEvent(
    Guid EventId,
    DateTime OccurredAt,
    long OrderId,
    long UserId,
    decimal TotalAmount);