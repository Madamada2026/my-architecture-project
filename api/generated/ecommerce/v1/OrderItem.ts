// Original file: api/service.proto

import type { Long } from '@grpc/proto-loader';

export interface OrderItem {
  'productId'?: (number | string | Long);
  'quantity'?: (number);
  'price'?: (number | string);
}

export interface OrderItem__Output {
  'productId': (string);
  'quantity': (number);
  'price': (number);
}
