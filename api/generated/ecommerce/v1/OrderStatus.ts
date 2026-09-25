// Original file: api/service.proto

export const OrderStatus = {
  ORDER_STATUS_UNSPECIFIED: 'ORDER_STATUS_UNSPECIFIED',
  ORDER_STATUS_NEW: 'ORDER_STATUS_NEW',
  ORDER_STATUS_PENDING_PAYMENT: 'ORDER_STATUS_PENDING_PAYMENT',
  ORDER_STATUS_PAID: 'ORDER_STATUS_PAID',
  ORDER_STATUS_CANCELLED: 'ORDER_STATUS_CANCELLED',
} as const;

export type OrderStatus =
  | 'ORDER_STATUS_UNSPECIFIED'
  | 0
  | 'ORDER_STATUS_NEW'
  | 1
  | 'ORDER_STATUS_PENDING_PAYMENT'
  | 2
  | 'ORDER_STATUS_PAID'
  | 3
  | 'ORDER_STATUS_CANCELLED'
  | 4

export type OrderStatus__Output = typeof OrderStatus[keyof typeof OrderStatus]
