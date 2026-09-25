// Original file: api/service.proto

import type { Long } from '@grpc/proto-loader';

export interface StreamOrderStatusRequest {
  'orderId'?: (number | string | Long);
}

export interface StreamOrderStatusRequest__Output {
  'orderId': (string);
}
