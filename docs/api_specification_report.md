# Звіт про виконання лабораторної роботи №3
## Тема: Проєктування та специфікація API (REST OpenAPI 3.0 та gRPC Proto3)

**Студент:** Семеніхін Руслан  
**Група:** 3ПР1  
**Тег у репозиторії:** lr3  
**Посилання на репозиторій:** https://github.com/Madamada2026/my-architecture-project  

---

### 1. Архітектурне позиціонування інтерфейсів

У межах розроблюваної системи чітко розділено рівні мережевої взаємодії:
* **Публічний REST API (OpenAPI 3.0.3):** Призначений для зовнішньої взаємодії з клієнтськими застосунками (Single Page Applications (SPA), веб-фронтенд, мобільні додатки). Забезпечує високу сумісність, зрозумілість, використання стандартного протоколу HTTP/1.1 та строго типізовану обробку помилок за RFC 7807.
* **Внутрішній gRPC API (Protocol Buffers v3):** Застосовується для високошвидкісної, високонавантаженої міжсервісної взаємодії (Microservice-to-Microservice) усередині контуру системи (наприклад, OrderService -> InventoryService / BillingService). Використовує бінарну серіалізацію та транспорт HTTP/2, що мінімізує затримку (Network Latency) та навантаження на мережу.

---

### 2. Специфікація REST API (OpenAPI 3.0)

* **Посилання на файл специфікації:** [`api/openapi.yaml`](../api/openapi.yaml)

#### Таблиця ендпоінтів REST API:
| HTTP Method | Path | Опис | Коди відповідей |
| :--- | :--- | :--- | :--- |
| `GET` | `/orders` | Отримання списку замовлень із підтримкою курсорної пагінації | 200 OK, 400 Bad Request, 401 Unauthorized |
| `POST` | `/orders` | Створення нового замовлення з валідацією requestBody | 201 Created, 400 Bad Request, 422 Unprocessable Entity |
| `GET` | `/orders/{id}` | Отримання детальної інформації про замовлення за ідентифікатором | 200 OK, 404 Not Found |
| `DELETE` | `/orders/{id}` | Видалення або скасування існуючого замовлення | 204 No Content, 404 Not Found |

#### Застосування стандарту RFC 7807 (Problem Details):
Усі відповіді з помилками (коди `400`, `401`, `404`, `422`) реалізовано за стандартом RFC 7807 (`application/problem+json`). Формат структури помилки описує поле `type` (URI помилки), `title` (короткий опис), `status` (HTTP status code), `detail` (детальна причина) та `instance` (URI викликаного ресурсу). Всі успішні відповіді містять заголовок телеметрії `X-KhNTU-Trace-ID`.

#### Скріншоти працездатності Prism Mock Server та тестування:
1. Запуск Prism Mock Server: `npx @stoplight/prism-cli mock api/openapi.yaml -p 4010`
2. Виконано тестові виклики через Postman/curl до `http://localhost:4010/orders`.

*Приклад успішного запиту `GET /orders` (200 OK):*
```json
{
  "items": [
    {
      "id": 1024,
      "userId": 101,
      "status": "NEW",
      "totalAmount": 1499.99
    }
  ],
  "next_cursor": "cursor_xyz123"
}
---

### 3. Специфікація gRPC API (Protocol Buffers v3)

* **Посилання на файл специфікації:** [`api/service.proto`](../api/service.proto)

#### Опис сервісу, RPC-методів та структур повідомлень:
У сервісі `InternalOrderService` описано міжсервісну взаємодію із застосуванням строгої типізації Proto3, унікальних числових тегів полів та перелічень enum:
* `CreateOrder` (Unary RPC) — приймає `CreateOrderRequest`, повертає `OrderResponse`.
* `CancelOperation` (Unary RPC) — приймає `CancelOperationRequest`, повертає `CancelOperationResponse`.
* `StreamOrderStatus` (Server Streaming RPC) — приймає `OrderStatusRequest`, повертає потік `StreamResult`.

**Ключові структури передаваних повідомлень:**
* `Order` — основна доменна сутність (поля: `id` (int64), `user_id` (int64), `items` (repeated OrderItem), `total_amount` (double), `status` (OrderStatus), `metadata` (KhNTUAuditMetadata)).
* `OrderItem` — позиція замовлення (поля: `product_id` (int64), `quantity` (int32), `unit_price` (double)).
* `OrderStatus` — enum станів (`ORDER_STATUS_UNSPECIFIED = 0`, `NEW = 1`, `PROCESSING = 2`, `COMPLETED = 3`, `CANCELLED = 4`).
* `KhNTUAuditMetadata` — метадані аудиту системних запитів (`trace_id`, `created_at`).

#### Фрагмент успішної генерації стабів:
Виконано команду генерації TypeScript/JavaScript типізованих стабів:
```cmd
npx proto-loader-gen-types --longs=String --enums=String --defaults --oneofs --grpcLib=@grpc/grpc-js --outDir=api/generated api/service.proto

