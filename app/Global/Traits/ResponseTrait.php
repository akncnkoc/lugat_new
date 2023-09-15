<?php

namespace App\Global\Traits;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Response;
use Symfony\Component\HttpFoundation\Response as ResponseCode;

trait ResponseTrait
{
    public function success(string $message, int $statusCode = ResponseCode::HTTP_OK, array|string $data = []): JsonResponse
    {
        return Response::json(array_filter(['data' => $data, 'message' => $message], mode: ARRAY_FILTER_USE_BOTH), $statusCode);
    }

    public function error(string $message, int $statusCode = ResponseCode::HTTP_INTERNAL_SERVER_ERROR, array|string $data = []): JsonResponse
    {
        Log::error($data);
        return Response::json(array_filter(['data' => $data, 'message' => $message], mode: ARRAY_FILTER_USE_BOTH), $statusCode);
    }

    public function conflict(string $message, int $statusCode = ResponseCode::HTTP_CONFLICT, array|string $data = []): JsonResponse
    {
        return Response::json(array_filter(['data' => $data, 'message' => $message], mode: ARRAY_FILTER_USE_BOTH), $statusCode);
    }

    public function created(?string $message, ?int $statusCode = ResponseCode::HTTP_CREATED, array|string $data = []): JsonResponse
    {
        return Response::json(array_filter(['data' => $data, 'message' => $message], mode: ARRAY_FILTER_USE_BOTH), $statusCode);
    }

    public function badRequest(string $message, int $statusCode = ResponseCode::HTTP_BAD_REQUEST, array|string $data = []): JsonResponse
    {
        return Response::json(array_filter(['data' => $data, 'message' => $message], mode: ARRAY_FILTER_USE_BOTH), $statusCode);
    }

    public function forbidden(string $message, int $statusCode = ResponseCode::HTTP_FORBIDDEN, array|string $data = []): JsonResponse
    {
        return Response::json(array_filter(['data' => $data, 'message' => $message], mode: ARRAY_FILTER_USE_BOTH), $statusCode);
    }
}
