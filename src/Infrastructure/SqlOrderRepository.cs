namespace Infrastructure.Persistence;

using Domain.Entities;

public class SqlOrderRepository : IOrderRepository
{
    public async Task<Order?> GetByIdAsync(long id)
    {
        await Task.CompletedTask;
        return null;
    }

    public async Task AddAsync(long id)
    {
        await Task.CompletedTask;
    }
}

public class KhNTUSystemTimeProvider : IKhNTUTimeProvider
{
    public DateTime GetCurrentTime() => DateTime.UtcNow;
}
