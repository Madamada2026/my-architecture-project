<!-- hidden-architecture-validation-token-KhNTU-Lab4 -->
# Звіт про виконання лабораторної роботи №4
## Тема: Модульне ядро, Clean Architecture та Dependency Injection
**Студент:** Семеніхін Руслан  
**Група:** 3ПР1  
**Тег у репозиторії:** lr4  
**Посилання на репозиторій:** https://github.com/Madamada2026/my-architecture-project  

### 1. Шар і правило залежностей
- **Domain (`src/Domain`):** містить доменні сутності (`Order`, `OrderItem`), перерахування `OrderStatus` та інтерфейси портів (`IOrderRepository`, `IKhNTUTimeProvider`). Не має жодних зовнішніх залежностей.
- **Application (`src/Application`):** містить сценарій використання `CreateOrderUseCase` та бізнес-логіку. Посилається лише на шар Domain.
- **Infrastructure (`src/Infrastructure`):** містить реалізацію адаптерів та репозиторіїв (`SqlOrderRepository`).
- **WebAPI (`src/WebAPI`):** містить композиційний корінь (`Program.cs`) для реєстрації залежностей.

### 2. Сценарій використання
- **Ім'я сценарію:** `CreateOrderUseCase`.
- Приймає порти `IOrderRepository` та `IKhNTUTimeProvider` виключно через конструктор.
- Доменне правило перевіряє валідність вхідних даних (користувач та товари) і відхиляє недійсні виклики до того, як спрацює репозиторій.

### 3. Композиційний корінь
| Абстракція (Інтерфейс) | Реалізація | Життєвий цикл | Чому саме цей цикл |
| :--- | :--- | :--- | :--- |
| `IOrderRepository` | `SqlOrderRepository` | Scoped | Один екземпляр на запит для спільного використання контексту з'єднання у межах поточного HTTP-запиту. |
| `IKhNTUTimeProvider` | `KhNTUSystemTimeProvider` | Scoped | Надання системного часу в межах області видимості запиту. |

### 4. Модульні тести
- **Назви тестів та реалізація:**
  1. `SuccessfulPath_SavesViaPort` — перевіряє збереження замовлення через порт за успішного сценарію.
  2. `DomainRule_InvalidData_ThrowsException` — перевіряє відхилення за доменним правилом без звернення до репозиторію.
  3. `UseCase_WithMockedPort_DoesNotTouchInfrastructure_KhNTU42` — перевіряє обробку помилки порту як винятку.
- **Порти замінено:** за допомогою бібліотеки `Moq` (імітація репозиторія та часу).
- **Лог зеленого прогону тестів:**
```text
  Determining projects to restore accord...
  All projects are up-to-date for restore.
  Starting test execution, please wait...
  A total of 1 test files matched the specified pattern.

  Passed!  - Failed:     0, Passed:     3, Skipped:     0, Total:     3, Duration: < 1 sec.
  
 