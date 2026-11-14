namespace Domain.Events;

public record PaymentProcessedEvent(
    Guid EventId,
    DateTime OccurredAt,
    long OrderId,
    bool IsSuccess);