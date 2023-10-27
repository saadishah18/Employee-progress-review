<?php
namespace App\Developer\ResponseService;

use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;

class ApiService
{
    private mixed $validator;

    private function make_validator($rules, $messages = []): void
    {
        $this->validator = Validator::make(request()->all(), $rules, $messages);
    }

    public function response($data = null, $message = '', $status = 200): \Illuminate\Http\JsonResponse
    {
        return Response::json([
            'data' => $data,
            'status' => $status,
            'message' => $message,
//            'payload' => request()->all(),
        ], $status);
    }

    public function not_found($message = 'The response you are looking for not found.'): \Illuminate\Http\JsonResponse
    {
        return $this->response(null, $message, 404);
    }

    public function validate($rules, $messages = []): bool
    {
        $this->make_validator($rules, $messages);
        return !$this->validator->fails();
    }

    public function validation_errors(): \Illuminate\Http\JsonResponse
    {
        $errors = $this->validator->errors()->toArray();
        $errors = array_values($errors);
        $errors = call_user_func_array('array_merge', $errors);

        return $this->response($errors, $this->validator->errors()->first(), 422);
    }

    public function error($message = '', $status = 422): \Illuminate\Http\JsonResponse
    {
        if(env('APP_ENV') == 'production'){
            return $this->response(null, 'Something went wrong', 500);
        }else{
            return $this->response(null, $message, $status);
        }
    }

    public function server_error(\Throwable $throwable): \Illuminate\Http\JsonResponse
    {
        $code = $throwable->getCode() ?? 500;
        $code = $code > 0 ? $code : 500;
        return $this->response(null, $throwable->getMessage(), $code);
    }

    public function forbidden(): \Illuminate\Http\JsonResponse
    {
        return $this->response(null, 'You don\'t permission to perform this action.', 403);
    }

    public function unauthenticated(): \Illuminate\Http\JsonResponse
    {
        return $this->response(null, 'User is not authenticated, Authentication Required.', 401);
    }

}
