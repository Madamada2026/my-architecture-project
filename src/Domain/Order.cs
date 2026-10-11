namespace Domain.Entities;

public enum OrderStatus
{
    Unspecified = 0,
    New = 1,
    PendingPayment = 2,
    Paid = 3,
    Cancelled = 4
}

public class OrderItem
{
    public long ProductId { get; set; }
    public int Quantity { get; set; }
    public decimal Price { get; set; }
    public decimal GetCost() => Quantity * Price;
}

public class Order
{
    public long Id { get; set; }
    public long UserId { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public OrderStatus Status { get; set; } = OrderStatus.New;
    public List<OrderItem> Items { get; set; } = new();
    public decimal TotalAmount => Items.Sum(i => i.GetCost());
}

public interface IOrderRepository
{
    Task<Order?> GetByIdAsync(long id);
    Task AddAsync(long id);
}

public interface IKhNTUTimeProvider
{
    DateTime GetCurrentTime();
}
