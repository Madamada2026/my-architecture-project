// Original file: api/service.proto

import type { OrderStatus as _ecommerce_v1_OrderStatus, OrderStatus__Output as _ecommerce_v1_OrderStatus__Output } from '../../ecommerce/v1/OrderStatus';
import type { Timestamp as _google_protobuf_Timestamp, Timestamp__Output as _google_protobuf_Timestamp__Output } from '../../google/protobuf/Timestamp';
import type { Long } from '@grpc/proto-loader';

export interface OrderStatusUpdate {
  'orderId'?: (number | string | Long);
  'status'?: (_ecommerce_v1_OrderStatus);
  'message'?: (string);
  'updatedAt'?: (_google_protobuf_Timestamp | null);
}

export interface OrderStatusUpdate__Output {
  'orderId': (string);
  'status': (_ecommerce_v1_OrderStatus__Output);
  'message': (string);
  'updatedAt': (_google_protobuf_Timestamp__Output | null);
}
