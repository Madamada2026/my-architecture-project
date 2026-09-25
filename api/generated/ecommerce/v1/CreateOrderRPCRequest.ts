// Original file: api/service.proto

import type { OrderItem as _ecommerce_v1_OrderItem, OrderItem__Output as _ecommerce_v1_OrderItem__Output } from '../../ecommerce/v1/OrderItem';
import type { KhNTUAuditMetadata as _ecommerce_v1_KhNTUAuditMetadata, KhNTUAuditMetadata__Output as _ecommerce_v1_KhNTUAuditMetadata__Output } from '../../ecommerce/v1/KhNTUAuditMetadata';
import type { Long } from '@grpc/proto-loader';

export interface CreateOrderRPCRequest {
  'userId'?: (number | string | Long);
  'items'?: (_ecommerce_v1_OrderItem)[];
  'auditMetadata'?: (_ecommerce_v1_KhNTUAuditMetadata | null);
}

export interface CreateOrderRPCRequest__Output {
  'userId': (string);
  'items': (_ecommerce_v1_OrderItem__Output)[];
  'auditMetadata': (_ecommerce_v1_KhNTUAuditMetadata__Output | null);
}
