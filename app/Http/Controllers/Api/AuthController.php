<?php

namespace App\Http\Controllers\Api;

use App\Developer\ResponseService\Facades\Api;
use App\Developer\Services\LoginService;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use function Symfony\Component\HttpKernel\DataCollector\getMessage;

class AuthController extends Controller
{
    protected $login_service;

    public function __construct(LoginService $loginService)
    {
        $this->login_service = $loginService;
    }

    public function login(Request $request)
    {
        try {
            $result = $this->login_service->login($request);
//            return Api::response($login_response,'Login Successfully');
            if($result['error'] == false){
                return response()->json(
                    ['data' =>
                        [
                        'user' => $result['user'],
                        'token' => $result['token']
                        ],
                    'message' => $result['message'],
                        'status' => $result['status']
                    ]
                );
            }else{
                return Api::error( $result['message'],$result['status']);
            }

        }catch (\Exception $exception){
            return Api::error($exception->getMessage());
        }
    }

    public function forgotPassword(Request $request)
    {
        try {
            $result =  $this->login_service->forgetPasswordSendEmail($request);
            if($result['error'] == false){
                return Api::response(true, $result['message'],$result['status']);
            }else{
                return Api::error( $result['message'],$result['status']);
            }
        }catch (\Exception $exception){
            return Api::error($exception->getMessage());
        }
    }

    public function resetPassword(Request $request)
    {
        try {
            $result =  $this->login_service->resetPassword($request);
            if($result['error'] == false){
                return Api::response(true, $result['message'],$result['status']);
            }else{
                return Api::error($result['message'],$result['status']);
            }

        }catch (\Exception $exception){
            return Api::error($exception->getMessage());
        }
    }

    public function updatePassword(Request $request)
    {
        try {
            $result =  $this->login_service->updatePassword($request);
            if($result['error'] == false){
                return Api::response(true, $result['message'],$result['status']);
            }else{
                return Api::error( $result['message'],$result['status']);
            }
        }catch (\Exception $exception){
            return Api::error($exception->getMessage());
        }
    }

    public function logout(Request $request){
        try {
            $result =  $this->login_service->logout($request);
            if($result['error'] == false){
                return Api::response(true, $result['message'],$result['status']);
            }else{
                return Api::error( $result['message'],$result['status']);
            }
        }catch (\Exception $exception){
            return Api::error($exception->getMessage());
        }
    }

    public function profileImage(Request $request){
        try {
            $result = $this->login_service->profileImage($request);
            if($result['error'] == false){
                return Api::response([
                    'user' => new UserResource($result['data'])
                ],'User Profile Updated',$result['status']);

            }else{
                return Api::error( $result['message'],$result['status']);
            }

        }catch (\Exception $exception){
            return Api::error($exception->getMessage());
        }
    }

    public function saveMobileToken(Request $request){
        try {
            $result = $this->login_service->saveMobileToken($request);
            if($result['error'] == false){
                return Api::response(['user' => auth()->user()],$result['message'],$result['status']);

            }else{
                return Api::error( $result['message'],$result['status']);
            }

        }catch (\Exception $exception){
            return Api::error('Something went wrong! Server Error');
        }
    }
}
