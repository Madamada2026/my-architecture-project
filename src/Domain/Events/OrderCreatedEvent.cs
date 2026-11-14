namespace Domain.Events;

public record OrderCreatedEvent(
    Guid EventId,
    DateTime OccurredAt,
    long OrderId,
    long UserId,
    decimal TotalAmount)
{
    public string SchemaTag { get; init; } = "KhNTU-EDA-5.42";
}