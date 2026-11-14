namespace Domain.Events;

public record PaymentProcessedEvent(
    Guid EventId,
    DateTime OccurredAt,
    long OrderId,
    bool IsSuccess)
{
    public string SchemaTag { get; init; } = "KhNTU-EDA-5.42";
}