import type * as grpc from '@grpc/grpc-js';
import type { EnumTypeDefinition, MessageTypeDefinition } from '@grpc/proto-loader';

import type { CancelOperationRequest as _ecommerce_v1_CancelOperationRequest, CancelOperationRequest__Output as _ecommerce_v1_CancelOperationRequest__Output } from './ecommerce/v1/CancelOperationRequest';
import type { CancelOperationResponse as _ecommerce_v1_CancelOperationResponse, CancelOperationResponse__Output as _ecommerce_v1_CancelOperationResponse__Output } from './ecommerce/v1/CancelOperationResponse';
import type { CreateOrderRPCRequest as _ecommerce_v1_CreateOrderRPCRequest, CreateOrderRPCRequest__Output as _ecommerce_v1_CreateOrderRPCRequest__Output } from './ecommerce/v1/CreateOrderRPCRequest';
import type { InternalOrderServiceClient as _ecommerce_v1_InternalOrderServiceClient, InternalOrderServiceDefinition as _ecommerce_v1_InternalOrderServiceDefinition } from './ecommerce/v1/InternalOrderService';
import type { KhNTUAuditMetadata as _ecommerce_v1_KhNTUAuditMetadata, KhNTUAuditMetadata__Output as _ecommerce_v1_KhNTUAuditMetadata__Output } from './ecommerce/v1/KhNTUAuditMetadata';
import type { OrderItem as _ecommerce_v1_OrderItem, OrderItem__Output as _ecommerce_v1_OrderItem__Output } from './ecommerce/v1/OrderItem';
import type { OrderRPCResponse as _ecommerce_v1_OrderRPCResponse, OrderRPCResponse__Output as _ecommerce_v1_OrderRPCResponse__Output } from './ecommerce/v1/OrderRPCResponse';
import type { OrderStatusUpdate as _ecommerce_v1_OrderStatusUpdate, OrderStatusUpdate__Output as _ecommerce_v1_OrderStatusUpdate__Output } from './ecommerce/v1/OrderStatusUpdate';
import type { StreamOrderStatusRequest as _ecommerce_v1_StreamOrderStatusRequest, StreamOrderStatusRequest__Output as _ecommerce_v1_StreamOrderStatusRequest__Output } from './ecommerce/v1/StreamOrderStatusRequest';
import type { Timestamp as _google_protobuf_Timestamp, Timestamp__Output as _google_protobuf_Timestamp__Output } from './google/protobuf/Timestamp';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  ecommerce: {
    v1: {
      CancelOperationRequest: MessageTypeDefinition<_ecommerce_v1_CancelOperationRequest, _ecommerce_v1_CancelOperationRequest__Output>
      CancelOperationResponse: MessageTypeDefinition<_ecommerce_v1_CancelOperationResponse, _ecommerce_v1_CancelOperationResponse__Output>
      CreateOrderRPCRequest: MessageTypeDefinition<_ecommerce_v1_CreateOrderRPCRequest, _ecommerce_v1_CreateOrderRPCRequest__Output>
      InternalOrderService: SubtypeConstructor<typeof grpc.Client, _ecommerce_v1_InternalOrderServiceClient> & { service: _ecommerce_v1_InternalOrderServiceDefinition }
      KhNTUAuditMetadata: MessageTypeDefinition<_ecommerce_v1_KhNTUAuditMetadata, _ecommerce_v1_KhNTUAuditMetadata__Output>
      OrderItem: MessageTypeDefinition<_ecommerce_v1_OrderItem, _ecommerce_v1_OrderItem__Output>
      OrderRPCResponse: MessageTypeDefinition<_ecommerce_v1_OrderRPCResponse, _ecommerce_v1_OrderRPCResponse__Output>
      OrderStatus: EnumTypeDefinition
      OrderStatusUpdate: MessageTypeDefinition<_ecommerce_v1_OrderStatusUpdate, _ecommerce_v1_OrderStatusUpdate__Output>
      StreamOrderStatusRequest: MessageTypeDefinition<_ecommerce_v1_StreamOrderStatusRequest, _ecommerce_v1_StreamOrderStatusRequest__Output>
    }
  }
  google: {
    protobuf: {
      Timestamp: MessageTypeDefinition<_google_protobuf_Timestamp, _google_protobuf_Timestamp__Output>
    }
  }
}

