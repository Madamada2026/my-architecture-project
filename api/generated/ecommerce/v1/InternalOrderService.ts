// Original file: api/service.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { CancelOperationRequest as _ecommerce_v1_CancelOperationRequest, CancelOperationRequest__Output as _ecommerce_v1_CancelOperationRequest__Output } from '../../ecommerce/v1/CancelOperationRequest';
import type { CancelOperationResponse as _ecommerce_v1_CancelOperationResponse, CancelOperationResponse__Output as _ecommerce_v1_CancelOperationResponse__Output } from '../../ecommerce/v1/CancelOperationResponse';
import type { CreateOrderRPCRequest as _ecommerce_v1_CreateOrderRPCRequest, CreateOrderRPCRequest__Output as _ecommerce_v1_CreateOrderRPCRequest__Output } from '../../ecommerce/v1/CreateOrderRPCRequest';
import type { OrderRPCResponse as _ecommerce_v1_OrderRPCResponse, OrderRPCResponse__Output as _ecommerce_v1_OrderRPCResponse__Output } from '../../ecommerce/v1/OrderRPCResponse';
import type { OrderStatusUpdate as _ecommerce_v1_OrderStatusUpdate, OrderStatusUpdate__Output as _ecommerce_v1_OrderStatusUpdate__Output } from '../../ecommerce/v1/OrderStatusUpdate';
import type { StreamOrderStatusRequest as _ecommerce_v1_StreamOrderStatusRequest, StreamOrderStatusRequest__Output as _ecommerce_v1_StreamOrderStatusRequest__Output } from '../../ecommerce/v1/StreamOrderStatusRequest';

export interface InternalOrderServiceClient extends grpc.Client {
  CancelOperation(argument: _ecommerce_v1_CancelOperationRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_ecommerce_v1_CancelOperationResponse__Output>): grpc.ClientUnaryCall;
  CancelOperation(argument: _ecommerce_v1_CancelOperationRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_ecommerce_v1_CancelOperationResponse__Output>): grpc.ClientUnaryCall;
  CancelOperation(argument: _ecommerce_v1_CancelOperationRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_ecommerce_v1_CancelOperationResponse__Output>): grpc.ClientUnaryCall;
  CancelOperation(argument: _ecommerce_v1_CancelOperationRequest, callback: grpc.requestCallback<_ecommerce_v1_CancelOperationResponse__Output>): grpc.ClientUnaryCall;
  cancelOperation(argument: _ecommerce_v1_CancelOperationRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_ecommerce_v1_CancelOperationResponse__Output>): grpc.ClientUnaryCall;
  cancelOperation(argument: _ecommerce_v1_CancelOperationRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_ecommerce_v1_CancelOperationResponse__Output>): grpc.ClientUnaryCall;
  cancelOperation(argument: _ecommerce_v1_CancelOperationRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_ecommerce_v1_CancelOperationResponse__Output>): grpc.ClientUnaryCall;
  cancelOperation(argument: _ecommerce_v1_CancelOperationRequest, callback: grpc.requestCallback<_ecommerce_v1_CancelOperationResponse__Output>): grpc.ClientUnaryCall;
  
  CreateOrder(argument: _ecommerce_v1_CreateOrderRPCRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_ecommerce_v1_OrderRPCResponse__Output>): grpc.ClientUnaryCall;
  CreateOrder(argument: _ecommerce_v1_CreateOrderRPCRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_ecommerce_v1_OrderRPCResponse__Output>): grpc.ClientUnaryCall;
  CreateOrder(argument: _ecommerce_v1_CreateOrderRPCRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_ecommerce_v1_OrderRPCResponse__Output>): grpc.ClientUnaryCall;
  CreateOrder(argument: _ecommerce_v1_CreateOrderRPCRequest, callback: grpc.requestCallback<_ecommerce_v1_OrderRPCResponse__Output>): grpc.ClientUnaryCall;
  createOrder(argument: _ecommerce_v1_CreateOrderRPCRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_ecommerce_v1_OrderRPCResponse__Output>): grpc.ClientUnaryCall;
  createOrder(argument: _ecommerce_v1_CreateOrderRPCRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_ecommerce_v1_OrderRPCResponse__Output>): grpc.ClientUnaryCall;
  createOrder(argument: _ecommerce_v1_CreateOrderRPCRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_ecommerce_v1_OrderRPCResponse__Output>): grpc.ClientUnaryCall;
  createOrder(argument: _ecommerce_v1_CreateOrderRPCRequest, callback: grpc.requestCallback<_ecommerce_v1_OrderRPCResponse__Output>): grpc.ClientUnaryCall;
  
  StreamOrderStatus(argument: _ecommerce_v1_StreamOrderStatusRequest, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_ecommerce_v1_OrderStatusUpdate__Output>;
  StreamOrderStatus(argument: _ecommerce_v1_StreamOrderStatusRequest, options?: grpc.CallOptions): grpc.ClientReadableStream<_ecommerce_v1_OrderStatusUpdate__Output>;
  streamOrderStatus(argument: _ecommerce_v1_StreamOrderStatusRequest, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_ecommerce_v1_OrderStatusUpdate__Output>;
  streamOrderStatus(argument: _ecommerce_v1_StreamOrderStatusRequest, options?: grpc.CallOptions): grpc.ClientReadableStream<_ecommerce_v1_OrderStatusUpdate__Output>;
  
}

export interface InternalOrderServiceHandlers extends grpc.UntypedServiceImplementation {
  CancelOperation: grpc.handleUnaryCall<_ecommerce_v1_CancelOperationRequest__Output, _ecommerce_v1_CancelOperationResponse>;
  
  CreateOrder: grpc.handleUnaryCall<_ecommerce_v1_CreateOrderRPCRequest__Output, _ecommerce_v1_OrderRPCResponse>;
  
  StreamOrderStatus: grpc.handleServerStreamingCall<_ecommerce_v1_StreamOrderStatusRequest__Output, _ecommerce_v1_OrderStatusUpdate>;
  
}

export interface InternalOrderServiceDefinition extends grpc.ServiceDefinition {
  CancelOperation: MethodDefinition<_ecommerce_v1_CancelOperationRequest, _ecommerce_v1_CancelOperationResponse, _ecommerce_v1_CancelOperationRequest__Output, _ecommerce_v1_CancelOperationResponse__Output>
  CreateOrder: MethodDefinition<_ecommerce_v1_CreateOrderRPCRequest, _ecommerce_v1_OrderRPCResponse, _ecommerce_v1_CreateOrderRPCRequest__Output, _ecommerce_v1_OrderRPCResponse__Output>
  StreamOrderStatus: MethodDefinition<_ecommerce_v1_StreamOrderStatusRequest, _ecommerce_v1_OrderStatusUpdate, _ecommerce_v1_StreamOrderStatusRequest__Output, _ecommerce_v1_OrderStatusUpdate__Output>
}
