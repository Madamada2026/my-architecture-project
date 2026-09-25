// Original file: api/service.proto

import type { Long } from '@grpc/proto-loader';

export interface CancelOperationRequest {
  'orderId'?: (number | string | Long);
  'reason'?: (string);
}

export interface CancelOperationRequest__Output {
  'orderId': (string);
  'reason': (string);
}
